import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, AlertIOS, Navigator } from 'react-native';
import firebase from '../Firebase/Firebase.js'

export default class SignOut extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);

    this.signOut();

  }


  signOut(props) {
    firebase.auth().signOut().then(function() {
      console.log('User Signed Out');
      // this.props.navigator.push({
      //   screen: 'FleetHome', // unique ID registered with Navigation.registerScreen
      //   animated: true, // does the push have transition animation or does it happen immediately (optional)
      //   animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      //   backButtonTitle: undefined, // override the back button title (optional)
      //   backButtonHidden: true, // hide the back button altogether (optional)
      // });
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  render() {
    return(
      <View style={styles.signOutMain}>
        <Text>Signed Out</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    signOutMain: {
      backgroundColor: '#FDFDFD',
      height: '100%',
      padding: 15,
    },
    input: {
      height: 40
    },
    signOutButtonView: {
      backgroundColor: '#49bcbc',
    }
});


AppRegistry.registerComponent('SignUp', () => SignUp);