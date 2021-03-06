import { Navigation } from 'react-native-navigation';
import firebase from './components/Firebase/Firebase.js';

// Import Auth Components
import Login from './components/Auth/Login.js';
import Signup from './components/Auth/SignUp.js';
import Signout from './components/Auth/SignOut.js';
import NewFleet from './components/Fleet/New.js';
import FleetHome from './components/Fleet/FleetHome.js';
import NewVehicle from './components/Fleet/Vehicle/New.js';
import ShowVehicle from './components/Fleet/Vehicle/Show.js';
import Settings from './components/User/Settings.js';
import ChangePassword from './components/Auth/ChangePassword.js';
import ForgotPassword from './components/Auth/ForgotPassword.js';

export default () => {

  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Signup', () => Signup);
  Navigation.registerComponent('NewFleet', () => NewFleet);
  Navigation.registerComponent('NewVehicle', () => NewVehicle);
  Navigation.registerComponent('ShowVehicle', () => ShowVehicle);
  Navigation.registerComponent('FleetHome', () => FleetHome);
  Navigation.registerComponent('Settings', () => Settings);
  Navigation.registerComponent('Signout', () => Signout);
  Navigation.registerComponent('ChangePassword', () => ChangePassword);
  Navigation.registerComponent('ForgotPassword', () => ForgotPassword);

  Navigation.startTabBasedApp({
    tabs: [
    {
      label: 'Fleet Home',
      screen: 'FleetHome',
      title: 'Fleet Home',
    },
    {
      label: 'New Fleet',
      screen: 'NewFleet',
      title: 'New Fleet',
    },
    {
      label: 'New Vehicle',
      screen: 'NewVehicle',
      title: 'New Vehicle',
    },
    {
      label: 'Settings',
      screen: 'Settings',
      title: 'Settings',
    },
    ],
    // passProps: { setFleetId }
    drawer: { // optional, add this if you want a side menu drawer in your app
      left: { // optional, define if you want a drawer from the left
        screen: 'Settings', // unique ID registered with Navigation.registerScreen
        passProps: {fleetId: this.userFleetId} // simple serializable object that will pass as props to all top screens (optional)
      }
    },
  });
}

