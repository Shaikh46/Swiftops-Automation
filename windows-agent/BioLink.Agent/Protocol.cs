using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace BioLink.Agent;

public sealed record UnlockChallenge(
    string Protocol,
    string ChallengeId,
    string PcId,
    string Account,
    string NonceB64Url,
    DateTimeOffset IssuedAt,
    DateTimeOffset ExpiresAt,
    string Intent,
    string PhoneKeyId);

public sealed record UnlockResponse(
    string ChallengeId,
    string PhoneKeyId,
    string SignatureB64Url,
    DateTimeOffset SignedAt);

public static class ProtocolVerifier
{
    public static byte[] CanonicalBytes(UnlockChallenge c) =>
        Encoding.UTF8.GetBytes(JsonSerializer.Serialize(c, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase }));

    public static bool Verify(UnlockChallenge challenge, UnlockResponse response, ECDsa phonePublicKey, DateTimeOffset now)
    {
        if (challenge.Protocol != "biolink/1" || challenge.Intent != "unlock") return false;
        if (challenge.ChallengeId != response.ChallengeId || challenge.PhoneKeyId != response.PhoneKeyId) return false;
        if (now < challenge.IssuedAt.AddSeconds(-30) || now > challenge.ExpiresAt || challenge.ExpiresAt - challenge.IssuedAt > TimeSpan.FromMinutes(1)) return false;
        if (response.SignedAt < challenge.IssuedAt.AddSeconds(-30) || response.SignedAt > challenge.ExpiresAt.AddSeconds(30)) return false;
        try
        {
            var signature = Base64UrlDecode(response.SignatureB64Url);
            return phonePublicKey.VerifyData(CanonicalBytes(challenge), signature, HashAlgorithmName.SHA256, DSASignatureFormat.Rfc3279DerSequence);
        }
        catch (FormatException) { return false; }
        catch (CryptographicException) { return false; }
    }

    private static byte[] Base64UrlDecode(string value) =>
        Convert.FromBase64String(value.Replace('-', '+').Replace('_', '/') + new string('=', (4 - value.Length % 4) % 4));
}
