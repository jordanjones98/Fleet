import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, AlertIOS } from 'react-native';
// import firebase from '../Firebase/Firebase.js'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', passwordRepeat: '', errorMessage: '', name: ''};

    this.firebase = this.props.firebase;

    this.signup = this.signup.bind(this);
  }

  async tryToCreateUser() {
      try {
        var auth = await this.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        var user = this.firebase.auth().currentUser;

        if(errorCode === 'auth/email-already-in-use') {
          AlertIOS.alert(
            'Error',
            'User with this email already exists',
          );
        } else if(errorCode === 'auth/weak-password') {
          AlertIOS.alert(
            'Error',
            'Please enter a stronger password',
            [
              {text: 'Ok', onPress: () => (password) => this.setState('')},
            ],
          );
        } else if(errorCode === 'auth/invalid-email') {
          AlertIOS.alert(
            'Error',
            'Please enter a valid email',
            [
              {text: 'Ok', onPress: () => (password) => this.setState('')},
            ],
          );
        } 
        if(user) {
          // Get current user info

          // Send user verification email
          // user.sendEmailVerification().then(function() {
          //   console.log('Email Sent');
          // }, function(error) {
          //   console.log('Error sending email');
          // });

          console.log('Here');

          user.updateProfile({
            displayName: this.state.name
          }).then(function() {
            // Update successful.
            console.log('Name Added');
          }, function(error) {
            // An error happened.
            console.log('Error Adding Name');
          });

        }
      });

    } catch (e) {
      console.log(e);
    }
  }

  signup() {

    if(this.state.password === this.state.passwordRepeat) {
      this.tryToCreateUser();
    } else {
      AlertIOS.alert(
        'Error',
        'Passwords must match',
        [
          {text: 'Ok', onPress: () => (password) => this.setState('')},
        ],
      );
    }

  }

  render() {
    return(
      <View style={styles.signUpMain}>

        <View>
          <Text>{this.state.errorMessage}</Text>
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(name) => this.setState({name})}
            autoCapitalize="none"
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
            autoCapitalize="none"
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            password={true}
            autoCapitalize="none"
            onChangeText={(password) => this.setState({password})}
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Repeat Password"
            password={true}
            autoCapitalize="none"
            onChangeText={(passwordRepeat) => this.setState({passwordRepeat})}
          />
        </View>  

        <View style={styles.signUpButtonView}>
          <Button onPress={this.signup} textStyle={{fontSize: 18}} style={styles.signUpButton} title="Signup">
            Sign up
          </Button>
        </View>  
      </View>
    );
  }
}


const styles = StyleSheet.create({
    signUpMain: {
      backgroundColor: '#FDFDFD',
      height: '100%',
      padding: 15,
    },
    input: {
      height: 40
    },
    signUpButton: {
      
    },
    signUpButtonView: {
      backgroundColor: '#49bcbc',
    }
});


AppRegistry.registerComponent('SignUp', () => SignUp);