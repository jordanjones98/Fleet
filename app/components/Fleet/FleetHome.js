import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, Navigator } from 'react-native';
import firebase from '../Firebase/Firebase.js'

export default class FleetHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingMessage: 'Loading...',
      data: ''
    }

    // Bind funcitons
    this.getUser = this.getUser.bind(this);
    this.getUserFleetInfo = this.getUserFleetInfo.bind(this);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.getUser();
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      this.getUser();
    }
  }

  async getUser() {
    console.log('Get User Function');
    isUser = false;
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('isUser');
        this.getUserFleetInfo(user);
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
  }

  async getUserFleetInfo(user) {
    console.log(user);
    var fleetId = '16970';
    var vehicleRef = firebase.database().ref('fleet/' + fleetId + '/vehicle');
    var data = null;
    var snapshotResponse;

    await vehicleRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val());
        var childKey = childSnapshot.key;
        console.log(childKey);
        var vehicleHours = childSnapshot.val().vehicleHours;
        var vehicleId = childSnapshot.val().createdBy;
        var vehicleMileage = childSnapshot.val().vehicleMileage;
        var vehicleNumber = childSnapshot.val().vehicleNumber;

        snapshotResponse = childSnapshot.val();

        this.setState({
          data: vehicleHours,
          loadingMessage: ''
        });
        
      });
    });

    console.log('before');
    console.log(snapshotResponse);

    console.log('after');
    console.log(this.state.data);
  }

  render() {
    return(
      <View style={styles.newFleetMain}>
        <Text>{this.state.data}</Text>
        <Text>{this.state.loadingMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    newFleetMain: {
        backgroundColor: '#FDFDFD',
        height: '100%',
        padding: 15,
    },
    input: {
        height: 40
    },
    loginButtonView: {
      backgroundColor: '#49bcbc',
    }
});