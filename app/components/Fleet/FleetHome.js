import React, { Component } from 'react';
import { AppRegistry, ScrollView, TouchableOpacity, Text, View, StyleSheet, TextInput, Button, Navigator } from 'react-native';
import firebase from '../Firebase/Firebase.js'

export default class FleetHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingMessage: 'Loading...',
      vehicleArr: [],
    }

    // Bind funcitons
    this.getUser = this.getUser.bind(this);
    this.getUserFleetInfo = this.getUserFleetInfo.bind(this);
    this.handleVehicleClick = this.handleVehicleClick.bind(this);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.getUser();
  }


  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      this.getUser();
      this.state.vehicleArr = [];
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
        var childKey = childSnapshot.key;
        var vehicleHours = childSnapshot.val().vehicleHours;
        var createdBy = childSnapshot.val().createdBy;
        var vehicleMileage = childSnapshot.val().vehicleMileage;
        var vehicleNumber = childSnapshot.val().vehicleNumber;

        this.state.vehicleArr.push({
          key: childKey,
          hours: vehicleHours,
          createdBy: createdBy,
          mileage: vehicleMileage,
          number: vehicleNumber,
        });

        this.setState({
          loadingMessage: ''
        });
        
      });
    });
  }

  handleVehicleClick(vehicleKey) {
    console.log('Vehicle Clicked');

    // this.props.navigator.showModal({
    //   screen: "ShowVehicle", // unique ID registered with Navigation.registerScreen
    //   title: "Vehicle", // title of the screen as appears in the nav bar (optional)
    //   passProps: {vehicleKey}, // simple serializable object that will pass as props to the modal (optional)
    //   navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    //   navigatorButtons: {}, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    //   animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
    // }); 
  }

  render() {
    return(
      <View style={styles.newFleetMain}>
        <ScrollView>
          {
            this.state.vehicleArr.map((vehicle) => {
              return(
                <View style={styles.vehicleContainer} key={vehicle.key} onpress={() => this.handleVehicleClick(vehicle.key)}>
                  <TouchableOpacity>
                    <Text>
                      Hours: {vehicle.hours}
                    </Text>
                    <Text>
                      Created By: {vehicle.createdBy}
                    </Text>
                    <Text>
                      Mileage: {vehicle.mileage}
                    </Text>
                    <Text>
                      Number: {vehicle.number}
                    </Text>                    
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    newFleetMain: {
      backgroundColor: '#FDFDFD',
      height: '100%',
      // padding: 15,
    },
    input: {
      height: 40
    },
    loginButtonView: {
      backgroundColor: '#49bcbc',
    },
    vehicleContainer: {
      backgroundColor: 'red',
      marginTop: 10,
      padding: 2,
      paddingLeft: 12,
      paddingRight: 12,
    }
});