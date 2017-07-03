import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, Navigator, TouchableOpacity } from 'react-native';

import firebase from '../Firebase/Firebase.js'

export default class ChangePassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      msg: '',
    }

    this.handleForgotPasswordButton = this.handleForgotPasswordButton.bind(this);
  }

  handleForgotPasswordButton() {
    var auth = firebase.auth();

    auth.sendPasswordResetEmail(this.state.email).then(() => {
      console.log('Email Sent');
      this.setState({
        msg: 'Password Reset Email Sent.'
      })
    }, (error) => {
      console.log(error);
      this.setState({
        msg: error
      })
    });
  }

  render() {
    return(
      <View>
        <View style={styles.changePasswordMain}>
          <Text>Forgot Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            password={false}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
          />   

                    <Button onPress={this.handleForgotPasswordButton} textStyle={{fontSize: 18}} title="Register">
            Register
          </Button>        
        </View>
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
    button: {
      backgroundColor: '#49bcbc',
    }
});