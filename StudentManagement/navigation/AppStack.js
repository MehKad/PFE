import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchUser, clearData, fetchUserFollowing, fetchUserAnnonces } from "../redux/actions";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Annonce from "../screens/Annonce";
import AddAnnonce from "../screens/AddAnnonce";

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
          <ActivityIndicator
            color='#386BF6'
            size='large'
          />
        </View>
      );
    }
    console.log(currentUser);
    return (
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
        <Tab.Screen name="Annonce" component={currentUser.student ? Annonce : AddAnnonce} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, clearData, fetchUserFollowing, fetchUserAnnonces }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AppStack);
