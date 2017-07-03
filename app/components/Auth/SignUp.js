import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, AlertIOS } from 'react-native';
import firebase from '../Firebase/Firebase.js'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', passwordRepeat: '', errorMessage: '', firstName: '', lastName: '', phoneNumber: '', userId: ''};

    this.signup = this.signup.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  async tryToCreateUser() {
    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

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
        var user = firebase.auth().currentUser;
        if(user) {
          // Get current user info

          // Send user verification email
          // user.sendEmailVerification().then(function() {
          //   console.log('Email Sent');
          // }, function(error) {
          //   console.log('Error sending email');
          // });

        }
      });

    } catch (e) {
      console.log(e);
    }
    
    var user = firebase.auth().currentUser;

    console.log('LOOK HERE' + user.uid);

    this.setState({
      userId: user.uid,
    });    

    this.updateUserInfo();
  }

  async updateUserInfo() {
    console.log('Updating user info');
    console.log(this.state.userId);

    try {
      var insert = await firebase.database().ref('users/' + this.state.userId).set({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        fleetId: 16970,
        phoneNumber: this.state.phoneNumber,
        // createdTimestamp: new Date()
      }).catch(function(error) {
        eCode = error.code;
        eMesasge = error.message;

        console.log(eMessage);
        console.log(eCode);
      });

      console.log('INSERT' + insert);
    } catch (e) {
      console.log('INSERT ERROR' + e)
    }

    console.log('Finished Updating User Info');
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
            placeholder="First Name"
            onChangeText={(firstName) => this.setState({firstName})}
            autoCapitalize="none"
          />
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(lastName) => this.setState({lastName})}
            autoCapitalize="none"
          />
        </View>     
        
        <View>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
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