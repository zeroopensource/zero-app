# Zero

Open Source Data App

## Environment Variables

PORT="4000" # src-tauri/tauri.conf.json build.devUrl
NODE_ENV="development"
NEXT_PUBLIC_ZERO_SERVICE_AUTH="https://example.com/api"
CERTIFICATE_PASSWORD=""
WINDOWS_CERTIFICATE_PASSWORD=""
KEYSTORE_PATH="C:\\Users\\JohnDoe\\upload-keystore.jks"
KEYSTORE_PASSWORD=""
KEYSTORE_ALIAS=""

## Development

Open Android Studio, connect Physical Device, Debug via `chrome://inspect`

## Installation issues

```bash
pnpm approve-builds
```
```bash
pnpm --filter zero-app-v2 install:electron
```
```bash
pnpm --filter zero-app-v2 install:electron-winstaller
```

## Update Icons

place icons in `src-capacitor/assets`

```bash
pnpm --filter zero-app-v2 generate:cap:icon
```

## Trust Zero Cerficate

zero-code-signing-E656BCE2.cer
https://github.com/zeroopensource/zero-official/raw/refs/heads/main/packages/zero-official/src/certificates/zero-code-signing-E656BCE2.cer

## outputs

zero-app\apps\zero-app-v2\android\app\build\outputs\apk\release
zero-app\apps\zero-app-v2\android\app\build\outputs\apk\debug
zero-app\apps\zero-app-v2\android\app\build\outputs\bundle\release

## Official Links

- [GitHub Repository](https://github.com/zeroopensource/zero-app)
- [Web](https://zero-app.zeroopensource.org)
- [Linux/Windows (WIP)](https://github.com/zeroopensource/zero-app)
- [Android (WIP)](https://github.com/zeroopensource/zero-app)
- [IOS (WIP)](https://github.com/zeroopensource/zero-app)
- [Official Links Repository](https://github.com/zeroopensource/zero-official)


