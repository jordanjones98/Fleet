import React, { Component } from 'react';
import { AppRegistry, ScrollView, TouchableOpacity, Text, View, StyleSheet, TextInput, Button, Navigator, RefreshControl } from 'react-native';
import firebase from '../Firebase/Firebase.js';
import getFleetId from '../Firebase/UserFleetId.js'; 

export default class FleetHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loadingMessage: 'Loading...',
      vehicleArr: [],
      refreshing: false,
    }

   
    // getFleetId().then((id) => console.log(`fleetid: ${id}`)).catch((err) => console.log('user is not logged in'));
    console.log('LOOK HERE' + getFleetId());

    // Bind funcitons
    this.getUser = this.getUser.bind(this);
    this.getUserFleetInfo = this.getUserFleetInfo.bind(this);
    this.handleVehicleClick = this.handleVehicleClick.bind(this);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.getUser();

    this.props.navigator.setButtons({
      leftButtons: [
        {
          title: 'Edit',
          id: 'showSide',
        }
      ]
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getUser().then(() => {
      this.setState({refreshing: false});
    });
  }

  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      this.getUser();
      this.state.vehicleArr = [];
    }
    if (event.id === 'showSide') {
      this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true,
        to: 'open',
      })
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
    var vehicleRef = firebase.database().ref('fleet/' + fleetId + '/vehicle');
    var data = null;
    var snapshotResponse;
    this.state.vehicleArr = [];
    await vehicleRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var vehicleHours = childSnapshot.val().vehicleHours;
        var createdBy = childSnapshot.val().createdBy;
        var vehicleMileage = childSnapshot.val().vehicleMileage;
        var vehicleNumber = childSnapshot.val().vehicleNumber;
        var vehicleName = childSnapshot.val().vehicleName;
        var vehiclePlate = childSnapshot.val().vehiclePlate;

        this.state.vehicleArr.push({
          key: childKey,
          hours: vehicleHours,
          createdBy: createdBy,
          mileage: vehicleMileage,
          number: vehicleNumber,
          name: vehicleName,
          plate: vehiclePlate,
        });

        this.setState({
          loadingMessage: ''
        });
        
      });
    });
  }

  handleVehicleClick(vehicleKey, vehicleName) {

    this.props.navigator.showModal({
      screen: "ShowVehicle", // unique ID registered with Navigation.registerScreen
      title: vehicleName, // title of the screen as appears in the nav bar (optional)
      passProps: {vehicleKey: vehicleKey, fleetId: this.state.fleetId}, // simple serializable object that will pass as props to the modal (optional)
    });
  }

  render() {
    return(
      <View style={styles.newFleetMain}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {
            this.state.vehicleArr.map((vehicle) => {
              return(
                <View style={styles.vehicleContainer} key={vehicle.key}>
                  <TouchableOpacity onPress={() => this.handleVehicleClick(vehicle.key, vehicle.name)}>
                    <Text style={styles.vehicleName}>
                      {vehicle.name}
                    </Text>
                    <Text>
                      License Plate: {vehicle.plate}
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
      backgroundColor: '#F6F5F8',
      padding: 12,
      borderBottomColor: 'black',
      borderBottomWidth: 1.5
    },
    vehicleName: {
      fontSize: 15,
      fontWeight: 'bold'
    }
});