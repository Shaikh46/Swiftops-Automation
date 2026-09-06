package com.biolink.unlock

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import com.biolink.unlock.databinding.ActivityMainBinding
import java.util.concurrent.Executor

class MainActivity : ComponentActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var executor: Executor
    private lateinit var keyManager: DeviceKeyManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        executor = ContextCompat.getMainExecutor(this)
        keyManager = DeviceKeyManager()

        binding.pairButton.setOnClickListener {
            // QR scanner and local transport are intentionally isolated behind the pairing adapter.
            binding.statusText.text = "Pairing adapter pending: scan the PC QR payload."
        }
        binding.unlockButton.setOnClickListener { requestBiometricForChallenge() }
    }

    private fun requestBiometricForChallenge() {
        val allowed = BiometricManager.Authenticators.BIOMETRIC_STRONG
        if (BiometricManager.from(this).canAuthenticate(allowed) != BiometricManager.BIOMETRIC_SUCCESS) {
            toast("A strong enrolled biometric is required")
            return
        }

        val challenge = "replace-with-fresh-pc-challenge".toByteArray(Charsets.UTF_8)
        keyManager.ensureKey()
        val promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Unlock paired PC")
            .setSubtitle("Approve the challenge for this computer")
            .setNegativeButtonText("Cancel")
            .setAllowedAuthenticators(allowed)
            .build()

        val prompt = BiometricPrompt(this, executor, object : BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                val signature = keyManager.signAfterBiometricApproval(challenge)
                binding.statusText.text = "Challenge signed; send response over the paired local channel."
                toast("Signed response: ${signature.take(12)}…")
            }
            override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                toast("Authentication error: $errString")
            }
            override fun onAuthenticationFailed() { toast("Biometric not recognized") }
        })
        prompt.authenticate(promptInfo)
    }

    private fun toast(message: String) = Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}
