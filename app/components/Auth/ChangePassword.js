import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, Navigator, TouchableOpacity } from 'react-native';

import firebase from '../Firebase/Firebase.js'

export default class ChangePassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      curPassword: '',
      newPassword: '',
    }

    // Bind funcitons
    this.handleSubmit = this.handleSubmit.bind(this);

    // On nav bar click call onNavigatorEvent function
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));    
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      this.getUserId();
    }
  }

  handleSubmit() {
    curPass = checkCurrentPassword();

    if(curPass) {
      var user = firebase.auth().currentUser;
      var newPassword = this.state.newPassword;

      user.updatePassword(newPassword).then(function() {
        console.log('Password updated!');
      }, function(error) {
          AlertIOS.alert(
            'Error',
            error,
          );      
      });
    }
  }

  // check if the user's current password is correct by trying to sign the user in, if the password is wrong, return false, else return true.
  async checkCurrentPassword() {
    await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Reset Password Error\'s Start');
      console.log(errorCode);
      console.log(errorMessage);
      console.log('Reset Password Error\'s End');
      return false;
    });
  }

  render() {
    return(
      <View style={styles.changePasswordMain}>
        <Text>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          password={true}
          autoCapitalize="none"
          onChangeText={(curPassword) => this.setState({curPassword})}
        />        
        <TextInput
          style={styles.input}
          placeholder="New Password"
          password={true}
          autoCapitalize="none"
          onChangeText={(newPassword) => this.setState({newPassword})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    changePasswordMain: {
      backgroundColor: '#FDFDFD',
      height: '100%',
      padding: 10,
    },
    input: {
      height: 40
    },
});