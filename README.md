# React Native app with location permission

## Install:
```bash
$ yarn
# --- or ---
$ npm install
```
## iOS
```bash
$ npx pod-install
```

## Run
```bash
# For iOS
$ yarn ios
# For Android
$ yarn android
```
## Limitations:
### iOS
* From iOS 13, if you are requesting PERMISSIONS.IOS.LOCATION_ALWAYS, there won't be a Always Allow button in the system dialog. Only Allow Once, Allow While Using App and Don't Allow.
When requesting PERMISSIONS.IOS.LOCATION_ALWAYS, if the user choose Allow While Using App, a provisional "always" status will be granted. The user will see While Using in the settings and later will be informed that your app is using the location in background. That looks like this:
![alt text](https://camo.githubusercontent.com/e8357168f4c8e754adfd940fc065520de838a21a80001839d5e740c18893ec67/68747470733a2f2f636d732e717a2e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031392f30392f696f732d31332d6c6f636174696f6e732d7465736c612d31393230783938322e6a70673f7175616c6974793d37352673747269703d616c6c26773d3132303026683d3930302663726f703d31 'Screenshot')
* You have to suggest user to go to app setting when location permission is *blocked*.
> for more details, check the [react-native-permission](https://www.npmjs.com/package/react-native-permissions).

### Android
* From Android SDK version 29, you have to suggest user to go to app setting for request background location.
* On Android 10, if an app has not been granted access to regular location permission, then background location permission dialog doesn’t even show up. In this situation, shouldShowRequestPermissionRationale() returns true. So to get access to background location you need to first get access to foreground location permission. After a user has granted access to foreground location, you can request background location permission, and then, the app will show "Allow all the time".