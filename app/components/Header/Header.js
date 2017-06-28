import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';

export default class Header extends Component {

  render() {
    return(
      <View style={styles.headMain}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    headMain: {
        backgroundColor: '#bc4949',
        height: 20,
    }
});

AppRegistry.registerComponent('Header', () => Header);