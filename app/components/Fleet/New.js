import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, Navigator } from 'react-native';
//import firebase from '../Firebase/Firebase.js'

export default class New extends Component {

  constructor(props) {
    super(props);
    this.firebase = this.props.firebase;
    this.state = {
      fleetName: '',
      fleetId: '16970'
    }

    // Bind this to functions
    this.showTabBar = this.showTabBar.bind(this);
    this.tryToWriteFleet = this.tryToWriteFleet.bind(this);

    this.showTabBar();
  }

  generateFleetId() {
    this.setState({
      fleetId: ''
    })
  }

  showTabBar() {
    this.props.navigator.toggleTabs({
      to: 'shown', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
      animated: true // does the toggle have transition animation or does it happen immediately (optional)
    });
  }

  async tryToWriteFleet() {
    this.generateFleetId();
    console.log(this.state.fleetName);
    var user = this.firebase.auth().currentUser;
    try {
      var insert = await this.firebase.database().ref('fleet/' + this.state.fleetId).set({
        name: this.state.fleetName,
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
            placeholder="Fleet Name"
            onChangeText={(fleetName) => this.setState({fleetName})}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.loginButtonView}>
          <Button onPress={this.tryToWriteFleet} textStyle={{fontSize: 18}} style={styles.signUpButton} title="Create Fleet" />
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