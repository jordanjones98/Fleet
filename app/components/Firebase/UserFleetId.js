import firebase from './Firebase.js'

export default () => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('User Signed In.');
      return firebase.database().ref('/users/' + user.uid).once('value').then((snapshot) => {
        return snapshot.val().fleetId;
      });
    } else {
      throw new Error('User not signed in.');
    }
  });
}

// export default this.userFleetId