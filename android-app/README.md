# BioLink Android App

This Kotlin scaffold demonstrates the security-critical part of the phone client: Android owns biometric matching, while an Android Keystore EC private key signs a PC challenge only after a successful `BiometricPrompt` operation.

The QR scanner, mDNS/TLS transport, BLE discovery, and challenge ingestion are intentionally adapter boundaries for the next implementation pass. The placeholder challenge in `MainActivity` must not be used in a release build.

## Build

Open this directory in Android Studio with Android SDK 35 installed, then run the `app` configuration on an Android 10+ device with a strong enrolled biometric. The app does not need root access and does not access fingerprint templates.
