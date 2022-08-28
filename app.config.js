import 'dotenv/config';

export default {
  "expo": {
    "name": "ordenar",
    "slug": "ordenar",
    "owner": "walgys",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 31,
            "targetSdkVersion": 31,
            "buildToolsVersion": "31.0.0"
          },
          "ios": {
            "deploymentTarget": "13.0"
          }
        }
      ]
    ],
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.walgys.ordenar"
    },
   
    "android": {
      "package": "com.walgys.ordenar",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "googleServicesFile": "./google-services.json",
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      webClientId: process.env.WEB_CLIENT_ID,
      androidClientId: process.env.ANDROID_CLIENT_ID,
      "eas": {
        "projectId": "49d5efec-18ac-45c2-b082-6369403686f2"
      }
    }
  }
}
