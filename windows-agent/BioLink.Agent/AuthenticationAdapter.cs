namespace BioLink.Agent;

public interface IWindowsAuthenticationAdapter
{
    string Name { get; }
    bool IsAvailable { get; }
    Task<bool> SubmitVerifiedUnlockAsync(string account, CancellationToken cancellationToken);
}

public sealed class CompanionDeviceFrameworkAdapter : IWindowsAuthenticationAdapter
{
    public string Name => "Windows Hello Companion Device Framework";
    public bool IsAvailable => false;

    public Task<bool> SubmitVerifiedUnlockAsync(string account, CancellationToken cancellationToken)
    {
        // The legacy API is deprecated. A production adapter must be implemented and tested
        // against the target Windows build before being enabled. Never simulate keystrokes.
        return Task.FromResult(false);
    }
}
