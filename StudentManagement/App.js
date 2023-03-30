import React from 'react';
import { LogBox } from 'react-native';

import Index from './navigation/index';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Index />
  );
}

export default App;
