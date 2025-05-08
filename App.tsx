import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {persistedStore, Store} from './src/Redux/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './src/navigators/Routes/Routes';
import Toast from 'react-native-toast-message';
import { Settings } from 'react-native-fbsdk-next';

function App(): React.JSX.Element {
  // Initialize the SDK
Settings.initializeSDK();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'white' : 'white',
  };
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Routes />
          <Toast />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;
