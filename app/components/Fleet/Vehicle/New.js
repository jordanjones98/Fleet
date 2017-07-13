import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, Navigator } from 'react-native';
import firebase from '../../Firebase/Firebase.js';
import fleetId from '../../Firebase/UserFleetId.js';
var uuid = require('react-native-uuid');

export default class New extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vehicleNumber: '',
      vehicleName: '',
      mileage: '',
      vehiclePlate: '',
    }

    this.tryToWriteVehicle = this.tryToWriteVehicle.bind(this);
  }

  async tryToWriteVehicle() {
    error = false;
    console.log(this.state.fleetName);
    var user = firebase.auth().currentUser;
    try {
      var insert = await firebase.database().ref('fleet/' + fleetId + '/vehicle/' + uuid.v1()).set({
        vehicleNumber: this.state.vehicleNumber,
        vehicleName: this.state.vehicleName,
        vehicleMileage: this.state.mileage,
        createdBy: user.email,
        vehiclePlate: this.state.vehiclePlate,
        // createdTimestamp: new Date()
      }).catch((error) => {
        eCode = error.code;
        eMesasge = error.message;

        console.log(eMessage);
        console.log(eCode);
        error = true;
      });

    } catch (e) {
      console.log(e);
      error = true;
    }

    if(!error) {
      console.log('No Error');
      this.setState({
        vehicleNumber: '',
        vehicleName: '',
        vehicleMileage: '',
        createdBy: '',
        vehiclePlate: '',
      })
    }
    
  }
  render() {
    return(
      <View style={styles.newFleetMain}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Name"
            onChangeText={(vehicleName) => this.setState({vehicleName})}
            autoCapitalize="none"
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Number"
            onChangeText={(vehicleNumber) => this.setState({vehicleNumber})}
            autoCapitalize="none"
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Mileage"
            onChangeText={(mileage) => this.setState({mileage})}
            autoCapitalize="none"
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="License Plate Number"
            onChangeText={(vehiclePlate) => this.setState({vehiclePlate})}
            autoCapitalize="none"
          />
        </View>      

        <View style={styles.loginButtonView}>
          <Button onPress={this.tryToWriteVehicle} textStyle={{fontSize: 18}} style={styles.signUpButton} title="Create Vehicle" />
        </View>
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