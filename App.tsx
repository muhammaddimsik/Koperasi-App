/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React from 'react';
import {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Robboto',
  },
});
