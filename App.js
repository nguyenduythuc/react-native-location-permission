/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Button,
  Platform,
  Alert,
  Linking,
  Text,
  View,
  StyleSheet,
  NativeModules,
} from 'react-native';
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const isIOS = Platform.OS === 'ios';
const App = () => {
  const [showInstructionAndroid, setShowInstructionAndroid] = useState(false);

  useEffect(() => {
    (async () => {
      const {LocationModule} = NativeModules;
      console.log(await LocationModule.shouldShowRequestPermissionRationale());
    })();
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      if (result === 'granted') {
        checkAndroidBackgroundLocation();
      }
    });
  }, []);

  const onRequestPermission = () => {
    if (isIOS) {
      checkIOSPermission();
    } else {
      checkAndroidPermission();
    }
  };

  function checkIOSPermission() {
    const permission =
      parseInt(Platform.Version, 10) < 13
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    check(permission)
      .then(result => {
        if (result !== RESULTS.UNAVAILABLE || result !== RESULTS.GRANTED) {
          request(permission).then(res => {
            if (res === 'blocked') {
              Alert.alert(
                'Location permission',
                'Location permission is blocked, open device setting to change permission',
                [
                  {
                    text: 'Go to setting',
                    onPress: () =>
                      Linking.openURL('App-Prefs:LOCATION_SERVICES'),
                  },
                  {
                    text: 'Ok',
                  },
                ],
              );
            }
          });
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  function checkAndroidPermission() {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        if (result !== RESULTS.UNAVAILABLE || result !== RESULTS.GRANTED) {
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(res => {
            if (res === 'granted') {
              if (parseInt(Platform.Version, 10) >= 29) {
                checkAndroidBackgroundLocation();
              }
            }
          });
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  function checkAndroidBackgroundLocation() {
    check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION).then(
      backgroundRes => {
        if (backgroundRes === 'denied') {
          setShowInstructionAndroid(true);
        } else {
          setShowInstructionAndroid(false);
        }
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Request permission" onPress={onRequestPermission} />
      {showInstructionAndroid && (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            For better experience, you can go to app setting to set location
            permission to "Allow all the time"
          </Text>
          <Button
            color={'grey'}
            onPress={() => openSettings()}
            title="Go to app setting"
          />
        </View>
      )}
      <Button
        color={'grey'}
        onPress={() => checkAndroidBackgroundLocation()}
        title="Refresh"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  instructionContainer: {marginVertical: 20},
  instructionText: {textAlign: 'center', marginBottom: 10},
});

export default App;
