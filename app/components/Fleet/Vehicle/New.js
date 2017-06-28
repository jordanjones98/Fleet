import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, Navigator } from 'react-native';
//import firebase from '../Firebase/Firebase.js'

export default class New extends Component {

  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
    this.state = {
      fleetId: '16970',
      vehicleId: '2',
      vehicleNumber: '',
      hours: '',
      mileage: '',
    }

    this.tryToWriteVehicle = this.tryToWriteVehicle.bind(this);
  }

  async tryToWriteVehicle() {
    console.log(this.state.fleetName);
    var user = this.firebase.auth().currentUser;
    try {
      var insert = await this.firebase.database().ref('fleet/' + this.state.fleetId + '/vehicle/' + this.state.vehicleId).set({
        vehicleId: this.state.vehicleId,
        vehicleNumber: this.state.vehicleNumber,
        vehicleHours: this.state.hours,
        vehicleMileage: this.state.mileage,
        createdBy: user.email,
        // createdTimestamp: new Date()
      }).catch(function(error) {
        eCode = error.code;
        eMesasge = error.message;

        console.log(eMessage);
        console.log(eCode);
      });

      console.log(insert);
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    return(
      <View style={styles.newFleetMain}>
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
            placeholder="Vehicle Hours"
            onChangeText={(hours) => this.setState({hours})}
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