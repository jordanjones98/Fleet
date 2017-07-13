import React, { Component } from 'react';
import { AppRegistry, ScrollView, TouchableOpacity, Text, View, StyleSheet, TextInput, Button, Navigator } from 'react-native';
import firebase from '../../Firebase/Firebase.js';
// Creates random strings for ID's
var uuid = require('react-native-uuid');

export default class Show extends Component {

  constructor(props) {
    super(props);

    //Set State
    this.state = {
      vehicleHours: '',
      vehicleMileage: '',
      vehicleNumber: '',
      createdBy: '',
      comment: '',
      fleetId: 16970
    }

    // Listen to events
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this.props.navigator.setButtons({
      leftButtons: [
        {
          title: 'Close',
          id: 'dismissModal',
        }
      ]
    });

    // Bind this to functions
    this.dismissModal = this.dismissModal.bind(this);
    this.getVehicle = this.getVehicle.bind(this);
    this.tryToWriteComment = this.tryToWriteComment.bind(this);

    this.getVehicle();
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
        AlertIOS.alert('NavBar', 'Edit button pressed');
      }
      if (event.id == 'add') {
        AlertIOS.alert('NavBar', 'Add button pressed');
      }
    }
    if (event.id === 'dismissModal') {
      this.dismissModal();
    }
  }

dismissModal() {
  this.props.navigator.dismissModal();
}

async tryToWriteComment() {
  console.log('writing comment ' + this.state.comment);
    var user = firebase.auth().currentUser;
    var email = user.email;
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    var timestamp = month + '/' + day + '/' + year + ':' + hour + ':' + minute + ':' + second;
    try {
      var insert = await firebase.database().ref('fleet/' + this.state.fleetId + '/vehicle/' + this.state.vehicleKey + '/comments/' + uuid.v1()).set({
        createdBy: email,
        comment: this.state.comment,
        creationDate: timestamp,
      }).catch((error) => {
        eCode = error.code;
        eMesasge = error.message;

        console.log(eMessage);
        console.log(eCode);
      });
    } catch (e) {
      console.log(e)
    }
}

async getVehicle() {
  await firebase.database().ref('fleet/' + this.props.fleetId + '/vehicle/' + this.props.vehicleKey).once('value').then((snapshot) => {
    this.setState({
      vehicleKey: snapshot.key,
      vehicleHours: snapshot.val().vehicleHours,
      vehicleMileage: snapshot.val().vehicleMileage,
      vehicleNumber: snapshot.val().vehicleNumber,
      createdBy: snapshot.val().createdBy,
    })
  });
}



  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Add Comment</Text>
        <View style={styles.commentBox}>
          <TextInput
            multiline = {true}
            numberOfLines = {4}
            onChangeText={(comment) => this.setState({comment})}
            value={this.state.comment}
          />
        </View>
        <View style={styles.commentButtonView}>
          <Button onPress={this.tryToWriteComment} textStyle={{fontSize: 18}} style={styles.commentButton} title="Add Comment" />
        </View>
      </View>
     );
  }
}

const styles = StyleSheet.create({
  commentBox: {
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 3,
  }
});