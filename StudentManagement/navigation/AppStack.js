import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Anonce from "../screens/Anonce";
import Reducer from "../redux/reducers";

const store = createStore(Reducer, applyMiddleware(thunk));

const Tab = createMaterialBottomTabNavigator();

const AppStack = () => {
  return (
    <Provider store={store}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Anonce"
          component={Anonce}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="email-newsletter"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </Provider>
  );
};

export default AppStack;
