import React, { Component } from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

import { fetchUser, getTeachersData, clearData, fetchUserFollowing, fetchUserAnnonces } from "../redux/actions";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Annonce from "../screens/Annonce";

const Tab = createMaterialBottomTabNavigator();

class AppStack extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearData();
    this.props.fetchUser();
  }

  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button loading={true} mode="text" textColor="#386BF6">Loading</Button>
        </View>
      );
    } else {
      return (
        <Tab.Navigator
          initialRouteName="Home"
          shifting={true}
          activeColor="#386BF6"
          inactiveColor="#9DB2CE"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;
              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Annonce':
                  iconName = focused ? 'megaphone' : 'megaphone-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'person-circle' : 'person-circle-outline';
                  break;
              }
              return <Ionicons name={iconName} size={24} color={color} />;
            }
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Annonce" component={Annonce} options={{ tabBarBadge: true }} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      );
    }
  }
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, getTeachersData, clearData, fetchUserFollowing, fetchUserAnnonces }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AppStack);
