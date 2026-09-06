using System.Security.Cryptography;
using BioLink.Agent;

Console.WriteLine("BioLink PC Unlock agent scaffold");
Console.WriteLine("Transport: local-only; pairing and mDNS/BLE adapters are pending.");
Console.WriteLine("Authentication adapter: deprecated Companion Device Framework boundary; disabled by default.");

using var key = ECDsa.Create(ECCurve.NamedCurves.nistP256);
var adapter = new CompanionDeviceFrameworkAdapter();
var challenge = new UnlockChallenge(
    "biolink/1", Guid.NewGuid().ToString(), "pc-id-placeholder", "account-hash-placeholder",
    "nonce-placeholder", DateTimeOffset.UtcNow, DateTimeOffset.UtcNow.AddSeconds(30), "unlock", "phone-key-placeholder");

Console.WriteLine($"Ready for challenge {challenge.ChallengeId}; adapter available: {adapter.IsAvailable}");
Console.WriteLine("No unlock is attempted by this scaffold.");
