import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import WithTheme from '../src/withTheme'
import configureStore from './config/Store/index';
import 'antd/dist/antd.css';


const { persistor, store } = configureStore();
store.dispatch({ type: 'SET_BLACK/WHITE_THEME' });

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* App with MUI Theme Provider and Navigations */}
        <WithTheme />
      </PersistGate>
    </Provider>
  );
}

export default App;
