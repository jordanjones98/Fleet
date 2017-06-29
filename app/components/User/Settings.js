import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, Navigator } from 'react-native';
import firebase from '../Firebase/Firebase.js'

export default class FleetHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingMessage: 'Loading...',
      firstName: '',
      lastName: ''
    }

    // Bind funcitons
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.setUserState = this.setUserState.bind(this);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      this.getUserId();
    }
  }

  async getUserId() {
    userPromise = null;
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('is user');
        this.userPromise = user;
        console.log(user);
      } else {
        console.log('No user');
        console.log('SHOW LOGIN');

        this.props.navigator.push({
          screen: 'Login', // unique ID registered with Navigation.registerScreen
          animated: true, // does the push have transition animation or does it happen immediately (optional)
          animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
          backButtonHidden: true, // hide the back button altogether (optional)
        });
      }
    });
    this.setState({
      userId: userPromise.uid,
    });
    this.getUserInfo();
  }

  async getUserInfo() {
    userFuncId = this.state.userId
    console.log(userFuncId);
    var userFirstName = null;
    var userLastName = null;
    var userPhoneNumber;
    setStateFunc = this.setUserState;
    var userRef = firebase.database().ref('users/' + userFuncId);
    await userRef.on('value', function(snapshot) {
      setStateFunc(snapshot.val().firstName, snapshot.val().lastName);
    });
  }

  setUserState(firstName, lastName) {
    this.setState({
      firstName: firstName,
      lastName: lastName,
      loadingMessage: ''
    })
  }

  render() {
    return(
      <View style={styles.settingsMain}>
        <Text>{this.state.loadingMessage}</Text>
        <Text>{this.state.firstName} {this.state.lastName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    settingsMain: {
        backgroundColor: '#FDFDFD',
        height: '100%',
        padding: 15,
    },
});