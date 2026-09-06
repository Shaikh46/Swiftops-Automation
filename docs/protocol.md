# BioLink PC Unlock Protocol

**Status:** Initial design for Android-first implementation

**Scope:** Offline, local-only phone-to-PC authentication. The phone never exports biometric templates or raw biometric results.

## 1. Platform decision

The first implementation targets Android and Windows. Android uses the system `BiometricPrompt` flow together with an authentication-per-use key in Android Keystore. The private signing key is non-exportable and is authorized for use only after successful biometric authentication.[1] [2]

Windows integration is isolated behind an adapter because the Windows Hello Companion Device Framework is deprecated in current Windows documentation. It remains useful as a reference protocol and may be available on specific Windows 10 configurations, but the product must not claim universal Windows 11 support until the adapter is tested on the target build.[3] The scaffold therefore implements pairing, local transport, nonce verification, and a clear integration boundary for either the legacy companion-device API or a future supported credential-provider/Windows Hello integration. It does not simulate keystrokes, inject credentials, disable the lock screen, or create a hidden administrator backdoor.

## 2. Trust model

The PC trusts exactly one or more explicitly paired phone public keys. The phone trusts the PC identity and transport key learned during a user-confirmed QR pairing ceremony. The PC's account identity is selected during pairing and is never inferred from proximity alone.

A successful biometric prompt is not transmitted as a Boolean. Instead, the Android application asks the operating system to authorize one signature operation. The PC accepts only a signature over its fresh nonce, the bound PC identity, the paired phone identity, and a short expiration time. This prevents replay and prevents a captured transport message from being reused against a different PC.

## 3. Key material

| Item | Owner | Purpose | Storage |
| --- | --- | --- | --- |
| `phone_signing_key` | Android app | Signs a PC challenge after biometric approval | Android Keystore; EC P-256; non-exportable private key |
| `phone_public_key` | PC and phone | Verifies phone signatures and identifies the paired phone | PC protected local store; phone encrypted app storage |
| `pc_transport_key` | PC | Authenticates the PC-side local endpoint during pairing and transport setup | Windows DPAPI-protected store |
| `pairing_code` | PC during pairing | Short-lived QR payload binding the ceremony to one PC account | Memory only; expires after one use or five minutes |
| `session_nonce` | PC per unlock | Prevents replay | Memory only; single use; expires after thirty seconds |

A v1 implementation uses QR to establish identities and then uses a local authenticated channel. BLE may be added as a discovery and proximity signal, but proximity is never treated as authentication by itself.

## 4. Pairing protocol

1. The user launches the PC agent and selects **Pair a phone** for a specific Windows account. The agent generates a fresh pairing identifier, a fresh PC transport public key, and a short-lived QR payload.
2. The QR payload contains a version, protocol name, pairing identifier, PC display name, PC public key, transport preferences, and an expiration timestamp. It contains no password, private key, or reusable unlock token.
3. The user scans the QR code in the Android app. The app displays the PC name and a human-readable verification phrase derived from both public keys. The user confirms the same phrase on the PC.
4. The Android app creates `phone_signing_key` in Android Keystore, requiring an authentication-per-use biometric authorization. The phone sends its public key and a signed pairing confirmation over the authenticated local channel.
5. The PC verifies the pairing identifier, expiration, confirmation signature, and expected public-key fingerprint. It stores the phone public key under the selected Windows account using a machine-protected store and invalidates the pairing identifier.
6. Both sides record a pairing record containing protocol version, key fingerprints, account binding, and creation time. Either side can revoke the pairing; revocation is local and does not require cloud connectivity.

## 5. Unlock protocol

1. The Windows integration adapter notices that the lock-screen sign-in surface is ready, or the user selects **Unlock with Phone** where the supported Windows integration exposes that tile.
2. The PC generates a cryptographically random 32-byte nonce and sends an `unlock_challenge` containing the protocol version, challenge identifier, PC identity, account identifier hash, nonce, issued-at time, expiration time, and required user-intent flag.
3. The phone checks that the PC identity is paired and that the challenge is fresh. It presents the system biometric prompt with a message naming the PC. The phone does not accept background or silent approval.
4. On successful biometric authentication, the phone uses the Keystore private key to sign the canonical UTF-8 encoding of the challenge. The signed response includes the phone key identifier, signature algorithm, signature, challenge identifier, and timestamp.
5. The PC verifies the signature with the stored phone public key, checks the exact nonce and challenge identifier, checks expiration and clock skew, checks account binding, and consumes the challenge atomically.
6. Only after all checks pass does the Windows adapter hand the result to an officially supported Windows authentication integration. If the adapter is unavailable, the PC must fail closed and retain normal Windows PIN/password/Hello sign-in.

## 6. Canonical signed message

The signed bytes are the UTF-8 bytes of the following canonical JSON object, serialized with lexicographically sorted keys and no insignificant whitespace:

```json
{
  "account": "sha256:...",
  "challenge_id": "uuid",
  "expires_at": "2026-09-06T12:00:30Z",
  "intent": "unlock",
  "nonce_b64url": "...",
  "pc_id": "sha256:...",
  "protocol": "biolink/1",
  "issued_at": "2026-09-06T12:00:00Z",
  "phone_key_id": "sha256:..."
}
```

The exact canonicalization function will be shared by the Android and .NET implementations and covered by cross-language test vectors. The first version uses ECDSA P-256 with SHA-256 and strict DER signature validation. A future version may use Ed25519 where platform support is consistent.

## 7. Transport

The initial development transport is local Wi-Fi with mDNS discovery and a mutually authenticated TLS socket. BLE is an optional discovery/proximity transport and must not be assumed to provide application-layer confidentiality or identity. The application protocol remains the same over either transport. The PC should advertise only a non-sensitive service name and a random endpoint identifier.

The transport must enforce message size limits, timeouts, one outstanding challenge per phone/PC pair, and rate limiting after failed biometric or signature attempts. Pairing and unlock traffic must never be routed through a cloud relay.

## 8. Proximity lock

Auto-lock is explicitly optional and disabled by default. Loss of BLE advertisements is an unreliable signal because of radio interference, battery optimization, and OS background restrictions. If enabled, the feature should require a configurable grace period and must only call the normal Windows lock operation; it must never terminate applications or alter credentials.

## 9. Security properties and non-goals

This design does not receive, store, or transmit a fingerprint image, biometric template, or fingerprint classification result. The operating system owns biometric matching; the app receives only the success/failure outcome needed to authorize a protected key operation.[1] [2]

The phone private key is not exportable from Android Keystore. A copied QR image alone is insufficient to unlock a PC because pairing requires confirmation and creation of a new device key. A captured unlock response is insufficient because each response is bound to a fresh one-time nonce, PC identity, account binding, and short expiration.

The system is not a replacement for Windows Hello, a password manager, or full-disk encryption. It cannot safely bypass Windows authentication APIs. If the operating system does not expose a supported companion-device or credential-provider path on a target build, the correct behavior is to show an unavailable status and preserve standard sign-in methods.

## References

[1]: https://developer.android.com/identity/sign-in/biometric-auth "Android Developers: Show a biometric authentication dialog"

[2]: https://developer.android.com/privacy-and-security/keystore "Android Developers: Android Keystore system"

[3]: https://learn.microsoft.com/en-us/windows/uwp/security/companion-device-unlock "Microsoft Learn: Windows Unlock with Windows Hello companion devices"

[4]: https://learn.microsoft.com/en-us/windows/whats-new/deprecated-features "Microsoft Learn: Deprecated features for Windows client"
