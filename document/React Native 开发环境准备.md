一、环境准备

我的环境：

![](https://i-blog.csdnimg.cn/direct/ec9e03bfcca14403b5857561d0b80420.png)

![](https://i-blog.csdnimg.cn/direct/2c08856f8cc54eb7aae6bc6018c82102.png)

![](https://i-blog.csdnimg.cn/direct/a209acea841b4013bfc190a681a1eb1e.png)

![](https://i-blog.csdnimg.cn/direct/0f31cad8b8444d3e85ffd9dc57b4ca43.png)

![](https://i-blog.csdnimg.cn/direct/df0ef33ddb0f4710b0836b38667de9f0.png)

![](https://i-blog.csdnimg.cn/direct/e577675e36034112ad9e8264d6a0650e.png)

![](https://i-blog.csdnimg.cn/direct/a6774a53f7d849c29a6ba24202b1c640.png)

二、建立独立RN工程

1、初始化创建工程

![](https://i-blog.csdnimg.cn/direct/a25ba972dda84e5b8c7c6e26fd38420e.png)

npx react-native init RNApp \--version 0.73.4 --skip-install 这个命令提示：

��️ The \`init\` command is deprecated.

E:\\android\\projects\\RNDemo4>cd RNApp

\- Switch to npx @react-native-community/cli init for the identical behavior.

\- Refer to the documentation for information about alternative tools: https://reactnative.dev/docs/getting-started

Exiting...

提示命令过时了，执行调用 ：

npx @react-native-community/cli init RNApp \--version 0.73.4 --skip-install

执行完显示：

![](https://i-blog.csdnimg.cn/direct/4bac9460c6464bd5b3ae4755e4f815d2.png)

现在目录结构如下：

![](https://i-blog.csdnimg.cn/direct/74b086fc6fcb454f91b9c57c6a7a51d8.png)

2、进入RN工程目录，安装依赖

\# 进入CLI自动生成的RN工程目录（内层RNApp） 

cd E:/android/projects/RNDemo4/RNApp/RNApp 

\# 安装依赖（淘宝镜像加速） 

npm install --registry=https://registry.npm.taobao.org

上面这个命令卡住了，清空缓存重试：

\# 1\. 进入内层RNApp目录（必选，确保路径正确） 

cd E:/android/projects/RNDemo4/RNApp/RNApp

\# 2\. 清空npm缓存（--force强制清空） 

npm cache clean \--force 

\# 3\. 重新安装（改用更稳定的镜像，同时限制网络超时） 

npm install \--registry=https://registry.npmmirror.com \--timeout=600000

执行完验证是否安装成功：

![](https://i-blog.csdnimg.cn/direct/08757638c4854616b15a51e8f95c098b.png)

或者看下面：

![](https://i-blog.csdnimg.cn/direct/f63b8944f6b74cc6843db73c0e09217b.png)

Ok. RN工程依赖安装成功。

三、新建安卓原生工程 （上面这个Metro服务启动成功的窗口先保持，不关闭）

最小sdk 我选29\. jdk版本17\. 

libs.versions.toml 文件修改如下：

```bash
[versions]
agp = "8.2.0"
kotlin = "1.9.20"
coreKtx = "1.10.1"
junit = "4.13.2"
junitVersion = "1.1.5"
espressoCore = "3.5.1"
lifecycleRuntimeKtx = "2.6.1"

[libraries]
androidx-core-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "coreKtx" }
junit = { group = "junit", name = "junit", version.ref = "junit" }
androidx-junit = { group = "androidx.test.ext", name = "junit", version.ref = "junitVersion" }
androidx-espresso-core = { group = "androidx.test.espresso", name = "espresso-core", version.ref = "espressoCore" }
androidx-lifecycle-runtime-ktx = { group = "androidx.lifecycle", name = "lifecycle-runtime-ktx", version.ref = "lifecycleRuntimeKtx" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
```

模块级build.gradle修改为：

```bash
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace 'com.example.androidapp'
    compileSdk 34

    // 引入本地libs（兜底，若Gradle依赖仍有问题）
    repositories {
        flatDir {
            dirs 'libs'
        }
    }

    defaultConfig {
        applicationId "com.example.androidapp"
        minSdk 29
        targetSdk 34
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        ndk {
            abiFilters 'armeabi-v7a', 'x86', 'x86_64', 'arm64-v8a'
        }
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = '17'
    }
    packaging {
        resources {
            excludes += ["META-INF/LICENSE.md", "META-INF/LICENSE-notice.md"]
        }
    }
}

dependencies {
    // 原生基础依赖
    implementation libs.androidx.core.ktx
    implementation libs.androidx.lifecycle.runtime.ktx
    testImplementation libs.junit
    androidTestImplementation libs.androidx.junit
    androidTestImplementation libs.androidx.espresso.core

    // 🔴 核心修复：用react-android替代react-native（适配0.70+拆分版）
    implementation "com.facebook.react:react-android:0.73.4"
    implementation "com.facebook.react:hermes-android:0.73.4" // 可选，Hermes引擎
    implementation "com.facebook.soloader:soloader:0.10.5" // RN必需
}
```

项目根目录build.gradle文件内容：

```bash
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 29
        compileSdkVersion = 34
        targetSdkVersion = 34
        reactNativeVersion = "0.73.4"
    }
    repositories {
        google()
        mavenCentral()
        maven { url "https://maven.aliyun.com/repository/central" }
    }
}

plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "https://maven.aliyun.com/repository/public/" }
        // RN官方Maven仓库（兜底）
        maven { url "https://repo1.maven.org/maven2/" }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

settings.gradle内容如下：

```bash
pluginManagement {
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
        // 1. 新增：添加阿里云镜像（解决插件下载慢/失败）
        maven { url "https://maven.aliyun.com/repository/public/" }
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        // 2. 新增：添加RN依赖的本地仓库路径（和根build.gradle的allprojects一致）
        maven { url "E:/android/projects/RNDemo4/RNApp/RNApp/node_modules/react-native/android" }
        maven { url "E:/android/projects/RNDemo4/RNApp/RNApp/node_modules/jsc-android/dist" }
        // 新增：阿里云镜像（加速RN依赖下载）
        maven { url "https://maven.aliyun.com/repository/public/" }
    }
}

rootProject.name = "AndroidApp"
include ':app'

```

gradle-wrapper.properties文件内容如下：

```bash
#Tue Feb 17 21:48:50 CST 2026
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
#distributionSha256Sum=a17ddd85a26b6a7f5ddb71ff8b05fc5104c0202c6e64782429790c933686c806
#distributionUrl=https\://services.gradle.org/distributions/gradle-9.1.0-bin.zip
#distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-bin.zip
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.5-bin.zip
# ?????????SHA256???
distributionSha256Sum=9d926787066a081739e8200858338b4a69e837c3a821a33aca9db09dd4a41026
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists

```

MainApplication代码如下：

```Kotlin
package com.example.androidapp 

import android.app.Application
import com.facebook.react.ReactApplication // 保留接口
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader
import java.util.ArrayList

// 实现ReactApplication接口（匹配抽象属性定义）
class MainApplication : Application(), ReactApplication {
    // 🔴 核心修改：把方法改为接口要求的抽象属性（val）
    override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
            val packages = ArrayList<ReactPackage>()
            packages.add(MainReactPackage()) // RN核心包
            return packages
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }

        // 调试模式开启（直接返回true，避免BuildConfig问题）
        override fun getUseDeveloperSupport(): Boolean {
            return true
        }

        // 关闭新架构，避免额外依赖
        override val isNewArchEnabled: Boolean
            get() = false
        override val isHermesEnabled: Boolean
            get() = true
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
    }
}
```

MainActiivty代码如下：

```Kotlin
package com.example.androidapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
    // 必须和RN工程package.json的name一致（RNApp）
    override fun getMainComponentName(): String {
        return "RNApp"
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return DefaultReactActivityDelegate(this, mainComponentName, false)
    }
}
```

AndroidManifest文件内容如下：

```XML
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:name=".MainApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
    android:theme="@style/AppTheme">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTask"
        android:theme="@style/AppTheme">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity
            android:name="com.facebook.react.devsupport.DevSettingsActivity"
            android:exported="false" />
    </application>
</manifest>
```

styles.xml文件内容如下：

```XML
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- 🔴 核心修改：自定义样式名改为AppTheme（唯一，不冲突） -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- 可选：自定义主题属性（比如背景色） -->
        <item name="android:windowBackground">@android:color/white</item>
        <item name="android:statusBarColor">@android:color/white</item>
    </style>
</resources>
```

然后同步成功。

四、安卓RN工程依赖

![](https://i-blog.csdnimg.cn/direct/f180ea65be5341c79349bdfe80f759cf.png)

提示有一些漏洞，修复漏洞：

![](https://i-blog.csdnimg.cn/direct/ee8a837b182d486bb917930e6476cfc5.png)

启动Metro服务：

adb reverse tcp:8081 tcp:8081

npx react-native start --port 8081

运行起来加载RN页面失败。尝试了各种方式失败，比如在RN页面摇一摇，设置调试的ip和端口号都没用，关闭防火墙都没用。

五、尝试离线bundle方案：

1. 打包RN离线文件，在RN工程目录执行

cd /d E:\\android\\projects\\RNDemo4\\RNApp\\RNApp 

\# 生成bundle和资源（仅依赖本地RN环境，无需下载Gradle） 

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

发现创建了以下目录和文件：

![](https://i-blog.csdnimg.cn/direct/15902af0eeca4205bf19cd0a5dc2a967.png)

但是assets文件夹没有生成。手动新建该目录。再重新执行命令生成bundle 文件：

cd /d E:\\android\\projects\\RNDemo4\\RNApp\\RNApp 

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

执行完后可以看到生成了bundle文件。

![](https://i-blog.csdnimg.cn/direct/968dd8ada3d74496949ac09afa3a50f8.png)

2、将该bundle文件复制到安卓原生工程的对应目录：

![](https://i-blog.csdnimg.cn/direct/6e0321b9592541b3a9638872c84c6b43.png)

3、修改下MainApplication：

```Kotlin
package com.example.androidapp // 替换为你的实际包名

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader
import java.util.ArrayList

class MainApplication : Application(), ReactApplication {
    // 恢复默认的ReactNativeHost写法，仅修正Bundle路径
    override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
            val packages = ArrayList<ReactPackage>()
            packages.add(MainReactPackage())
            return packages
        }

        override fun getJSMainModuleName(): String {
            return "index"
        }

        override fun getUseDeveloperSupport(): Boolean {
            return true
        }

        override val isNewArchEnabled: Boolean
            get() = false
        override val isHermesEnabled: Boolean
            get() = true

        // 🔴 改用RN 0.73兼容的assets路径写法（核心修复）
        override fun getBundleAssetName(): String {
            return "index.android.bundle"
        }

        // 注释掉getJSBundleFile，改用getBundleAssetName
        // override fun getJSBundleFile(): String {
        //     return "android_asset/index.android.bundle"
        // }
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
    }
}
```

4、运行安卓原生工程，显示页面：

![](https://i-blog.csdnimg.cn/direct/1b2d5a26a7864a97b07aaed572a9e057.png)

ok. 显示的这个页面就是RN工程中的App.tsx这个页面。

---

> 《[React Native 开发环境准备](https://www.xyzblog.publicvm.com/e73191d6c617428441e174e2c4c0d5375b6117dbab8475292272f945d793e8dd)》 是转载文章，[点击查看原文](https://blog.csdn.net/u012116089/article/details/158181730)。