# BioLink Windows Agent

This .NET 8 scaffold contains the transport-independent challenge verifier and the adapter boundary where a supported Windows authentication integration must be connected.

Microsoft’s Windows Hello Companion Device Framework documentation marks the API as deprecated. Consequently, this project does not inject keystrokes, call undocumented lock-screen bypasses, or unlock Windows directly from a background service. `CompanionDeviceFrameworkAdapter` is disabled and returns `false` until a target Windows build and an approved authentication integration are validated.

## Build

Build on Windows with the .NET 8 SDK:

```powershell
dotnet build .\BioLink.Agent\BioLink.Agent.csproj
```

The remaining implementation work is pairing persistence with Windows DPAPI, mDNS/TLS or BLE transport, QR generation, atomic nonce consumption, and a tested supported Windows authentication adapter.
