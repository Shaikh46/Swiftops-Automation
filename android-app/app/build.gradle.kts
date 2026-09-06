plugins {
    id("com.android.application")
    kotlin("android")
}

android {
    namespace = "com.biolink.unlock"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.biolink.unlock"
        minSdk = 29
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }

    buildFeatures { viewBinding = true }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.activity:activity-ktx:1.10.0")
    implementation("androidx.biometric:biometric:1.2.0-alpha05")
    implementation("com.google.android.material:material:1.12.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.9.0")
}
