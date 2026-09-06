package com.biolink.unlock

import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import java.security.KeyPairGenerator
import java.security.KeyStore
import java.security.Signature
import java.util.Base64

class DeviceKeyManager {
    companion object {
        private const val PROVIDER = "AndroidKeyStore"
        private const val ALIAS = "biolink-phone-signing-key"
    }

    fun ensureKey(): java.security.PublicKey {
        val store = KeyStore.getInstance(PROVIDER).apply { load(null) }
        if (!store.containsAlias(ALIAS)) {
            val generator = KeyPairGenerator.getInstance(KeyProperties.KEY_ALGORITHM_EC, PROVIDER)
            generator.initialize(
                KeyGenParameterSpec.Builder(
                    ALIAS,
                    KeyProperties.PURPOSE_SIGN or KeyProperties.PURPOSE_VERIFY
                ).setDigests(KeyProperties.DIGEST_SHA256).build()
            )
            generator.generateKeyPair()
        }
        return store.getCertificate(ALIAS).publicKey
    }

    fun signAfterBiometricApproval(canonicalChallenge: ByteArray): String {
        val store = KeyStore.getInstance(PROVIDER).apply { load(null) }
        val privateKey = (store.getEntry(ALIAS, null) as KeyStore.PrivateKeyEntry).privateKey
        val signature = Signature.getInstance("SHA256withECDSA").apply {
            initSign(privateKey)
            update(canonicalChallenge)
        }.sign()
        return Base64.getUrlEncoder().withoutPadding().encodeToString(signature)
    }
}
