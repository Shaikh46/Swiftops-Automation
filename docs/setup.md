# BioLink PC Unlock Setup Guide

## Current implementation status

The repository now contains an Android Kotlin scaffold, a Windows .NET agent scaffold, the shared protocol specification, and a rendered data-flow diagram. The current code is a development scaffold rather than a production lock-screen product. In particular, QR scanning, mDNS/TLS transport, BLE discovery, durable pairing storage, and the final supported Windows authentication adapter remain explicit implementation tasks.

| Component | Current state | Production requirement |
| --- | --- | --- |
| Android biometric prompt | Scaffolded | Test across Android 10+ devices and require `BIOMETRIC_STRONG` |
| Android signing key | Scaffolded with Android Keystore EC key | Add key attestation policy where available and verify device enrollment behavior |
| QR pairing | Protocol specified; scanner pending | Use one-time, expiring payload and user-visible phrase confirmation |
| Local transport | Protocol specified; adapter pending | Use mutually authenticated TLS over local Wi-Fi; BLE may assist discovery |
| Windows verifier | .NET verifier scaffolded | Add DPAPI-protected pairing store, rate limits, and cross-language test vectors |
| Windows unlock integration | Disabled fail-closed adapter | Validate an officially supported API on each target Windows build; do not simulate input |

## Android development setup

Open `android-app` in Android Studio with Android SDK 35 and a physical Android 10 or newer device. The device should have a strong enrolled biometric and a secure screen lock. Run the `app` configuration. The app creates its signing key inside Android Keystore and invokes a system biometric prompt before signing.

The placeholder challenge in `MainActivity.kt` is intentionally not connected to a PC. Before any release build, replace it with a message received through the authenticated local transport and add a QR scanner that validates the protocol version, expiration, PC identity, and pairing identifier.

## Windows development setup

On a Windows development machine, install the .NET 8 SDK and build the agent with `dotnet build windows-agent/BioLink.Agent/BioLink.Agent.csproj`. The agent currently prints readiness information and does not unlock the system. This is intentional: Microsoft’s current documentation marks the Windows Hello Companion Device Framework as deprecated, so the project must not ship a background-service bypass until a supported integration is confirmed for the target Windows release.[1] [2]

The Windows implementation should first be tested as a desktop-session verifier. Only after signature verification, replay protection, account binding, and revocation are complete should the project connect the verifier to a Windows authentication surface.

## Pairing procedure for the planned implementation

Start pairing on the Windows agent for the specific Windows account. The PC displays a short-lived QR code. Scan it on the Android app, review the PC name and verification phrase, and confirm the same phrase on both devices. The Android app generates its device-bound signing key only after the user has enrolled a secure device credential. The PC stores only the public key and the account binding.

During an unlock attempt, the PC sends a fresh nonce. The Android app displays the PC name in the system biometric prompt. A successful biometric operation authorizes one signature over the exact nonce, account binding, PC identity, and expiry. The PC verifies the signature and consumes the nonce once. Any failure leaves normal Windows sign-in available.

## Security notes

The design never handles raw fingerprint data. Android’s system biometric subsystem performs matching, while the app receives only a success/failure callback and uses that success to authorize a protected Keystore operation.[3] The private key is non-exportable and remains on the phone; the PC receives only the public key during pairing and signatures during unlock.[4]

A QR image is not an unlock credential. It expires, is single-use, and must be confirmed by a human-visible phrase. A recorded network response cannot be replayed because every unlock uses a fresh one-time nonce with a short lifetime. BLE proximity is treated only as a convenience signal and is never sufficient by itself.

The implementation must fail closed. It must not use simulated keyboard input, undocumented Winlogon manipulation, credential extraction, registry hacks, or a hidden administrator account. The user must retain a normal Windows Hello PIN, password, or other supported sign-in method for recovery.

## References

[1]: https://learn.microsoft.com/en-us/windows/uwp/security/companion-device-unlock "Microsoft Learn: Windows Unlock with Windows Hello companion devices"

[2]: https://learn.microsoft.com/en-us/windows/whats-new/deprecated-features "Microsoft Learn: Deprecated features for Windows client"

[3]: https://developer.android.com/identity/sign-in/biometric-auth "Android Developers: Show a biometric authentication dialog"

[4]: https://developer.android.com/privacy-and-security/keystore "Android Developers: Android Keystore system"
