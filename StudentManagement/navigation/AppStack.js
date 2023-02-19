import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Annonce from "../screens/Annonce";
import Reducer from "../redux/reducers";

const store = createStore(Reducer, applyMiddleware(thunk));

const Tab = createMaterialBottomTabNavigator();

const AppStack = () => {
  return (
    <Provider store={store}>
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        activeColor="#386BF6"
        inactiveColor="#9DB2CE"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size = 24 }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                return <AntDesign name={iconName} size={size} color={color} />;
                break;
              case 'Annonce':
                iconName = 'notification';
                return <AntDesign name={iconName} size={size} color={color} />;
                break;
              case 'Profile':
                iconName = 'user-circle';
                return <FontAwesome5 name={iconName} size={size} color={color} />;
                break;
            }
          }
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Annonce" component={Annonce} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </Provider>
  );
};

export default AppStack;
