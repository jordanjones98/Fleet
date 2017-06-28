import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { Tabs } from '../Router/Router.js'


// Import componenets
import Header from '../Header/Header.js';
import SignUp from '../SignUp/SignUp.js';
import Login from '../Login/Login.js';
import User from '../Firebase/User.js';
import NewFleet from '../Fleet/New.js';
import NewVehicle from '../Fleet/Vehicle/New.js';
import firebase from '../Firebase/Firebase.js';

export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      signedIn: false, 
      user: null
    };
  
  }

  returnUser(userObj) {
    this.setState({
      user: userObj
    });
    console.log({user})
  }

  // Old render without tabs
  render() {
    return(
      <View>
        <Header />
        <NewVehicle
          firebase = {firebase} 
          returnUser = {this.returnUser.bind(this)}
        />
          
      </View>
    );
  }
}

AppRegistry.registerComponent('Main', () => Main);