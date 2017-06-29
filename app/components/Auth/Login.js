
import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, Button, Navigator, AlertIOS } from 'react-native';
import SignUp from './SignUp.js';
import firebase from '../Firebase/Firebase.js'

export default class Login extends Component {
  constructor(props) {
    super(props);    
    this.state = {email: '', password: '', errorMessage: '', userId: ''};

    // this.firebase = this.props.navigator.firebase;
    this.getSignedInUser();
    //this.hideTabBar();

    // Bind functions
    this.login = this.login.bind(this);
    this.handleSignUpButton = this.handleSignUpButton.bind(this);
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.hideTabBar = this.hideTabBar.bind(this);
  }

  getSignedInUser(props) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('Signed In!');
      } else {
        console.log('No user');
      }
    });
  }

  handleSignUpButton() {
    this.props.navigator.push({
      screen: 'Signup', // unique ID registered with Navigation.registerScreen
      title: 'Signup', // navigation bar title of the pushed screen (optional)
      passProps: {}, // Object that will be passed as props to the pushed screen (optional)
      animated: true, // does the push have transition animation or does it happen immediately (optional)
      animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
      backButtonTitle: 'Login', // override the back button title (optional)
    });
  }

  handleSuccessfulLogin() {
    this.props.navigator.switchToTab({
      tabIndex: 0 // (optional) if missing, this screen's tab will become selected
    });
    console.log('Success!!');
  }

  hideTabBar() {
    this.props.navigator.toggleTabs({
      to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
      animated: true // does the toggle have transition animation or does it happen immediately (optional)
    });
  }

  async tryToLoginUser(props) {
      try {
        var auth = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        if(errorCode === 'auth/wrong-password') {
          AlertIOS.alert(
            'Error',
            'Invalid password',
          );
        } else if(errorCode === 'auth/invalid-email') {
          AlertIOS.alert(
            'Error',
            'Invalid email',
            [
              {text: 'Ok', onPress: () => (password) => this.setState('')},
            ],
          );
        }
        console.log(auth.email);
      });
      } catch (e) {
        console.log(e)
      }
      
      if(auth !== undefined) {
        this.handleSuccessfulLogin();
      }

  }

  login() {
    this.tryToLoginUser();
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

        <View style={styles.loginButtonView}>
          <Button onPress={this.login} textStyle={{fontSize: 18}} title="Login">
            Login
          </Button>
        </View> 

        <View style={styles.signUpButton}>
          <Button onPress={this.handleSignUpButton} textStyle={{fontSize: 18}} title="Register">
            Register
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
    loginButtonView: {
      backgroundColor: '#49bcbc',
    }
});