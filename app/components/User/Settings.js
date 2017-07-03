import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, Navigator, TouchableOpacity } from 'react-native';

import firebase from '../Firebase/Firebase.js'

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingMessage: 'Loading...',
      firstName: '',
      lastName: '',
      email: '',
    }

    // Bind funcitons
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.logout = this.logout.bind(this);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.getUserId();

    
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      this.getUserId();
    }
  }

  async getUserId() {
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('is user');
        this.userPromise = user;
        console.log(user);

        this.setState({
          userId: user.uid,
          userEmail: user.email,
        });

        // Call function to get the user info from the users node
        this.getUserInfo();
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
    }.bind(this));
  }

  async getUserInfo() {
    console.log('getUserInfo' + this.state.userId);
    var userRef = firebase.database().ref('users/' + this.state.userId);
    await userRef.on('value', (snapshot) => {
        if(snapshot.val().firstName !== null && snapshot.val().lastName !== null) {
          this.setState({
            firstName: snapshot.val().firstName,
            lastName: snapshot.val().lastName,
            loadingMessage: ''
          });
        }
      console.log(snapshot.val.firstName);
    });
  }

  logout() {
    this.props.navigator.push({
      screen: 'Signout', // unique ID registered with Navigation.registerScreen
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      backButtonHidden: true, // hide the back button altogether (optional)
    });
  }

  handleChangePassword() {
    this.props.navigator.push({
      screen: 'ChangePassword', // unique ID registered with Navigation.registerScreen
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      backButtonHidden: false, // hide the back button altogether (optional)
    });
  }

  render() {
    return(
      <View style={styles.settingsMain}>
        <View style={styles.dataContainer}>
          <TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text>{this.state.firstName} {this.state.lastName}</Text>
            </View>
          </TouchableOpacity>     

          <TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text>{this.state.userEmail}</Text>
            </View>               
          </TouchableOpacity>     
          
          <TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text>{this.state.firstName} {this.state.lastName}</Text>
            </View>               
          </TouchableOpacity>     
          
          <TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text>{this.state.firstName} {this.state.lastName}</Text>
            </View>               
          </TouchableOpacity>    
          
          <TouchableOpacity onPress={this.handleChangePassword}>
            <View style={styles.inputContainer}>
              <Text>Change Password</Text>
            </View>               
          </TouchableOpacity>                 

          <TouchableOpacity onPress={this.logout}>
            <View style={styles.inputContainer}>
              <Text>Logout</Text>
            </View>               
          </TouchableOpacity>                    
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    settingsMain: {
      backgroundColor: '#FDFDFD',
      height: '100%',
      padding: 10,
    },
    dataContainer: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
    },
    inputContainer: {
      backgroundColor: 'white',
      padding: 7
    }
});