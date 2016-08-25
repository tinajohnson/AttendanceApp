/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import Button from 'react-native-button';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Navigator
} from 'react-native';

import Home from './Home';
import MarkAtt from './MarkAtt';
import ViewAtt from './ViewAtt';

class reportbee extends Component {
  render() {
    return (

              <Navigator
                    initialRoute = {{name: "Home", index:0}}
                    renderScene = { this.renderScene }
                    navigationBar={
                         <Navigator.NavigationBar
                           routeMapper={{
                                        LeftButton: (route, navigator, index, navState) =>
                                         {
                                          if (route.index === 0) {
                                                return null;
                                          } else {
                                                return (
                                                  <TouchableOpacity onPress={() => navigator.pop()}>
                                                    <Text style={ styles.leftNavButtonText}>Back</Text>
                                                  </TouchableOpacity>
                                                );
                                          }
                                         },
                                         RightButton: (route, navigator, index, navState) =>
                                                    { return (<Text></Text>); },
                                        Title: (route, navigator, index, navState) =>
                                          { return (<Text style={ styles.title }></Text>); },
                                        }}
                           style={{backgroundColor: '#efefef'}}
                         />
                    }

              />
    );
  }


  renderScene(route, navigator){
    if (route.name == "Home") {
      return <Home navigator={navigator} />
    }

    if (route.name == "MarkAtt") {
      return <MarkAtt navigator={navigator} />
    }

    if (route.name == "ViewAtt") {
      return <ViewAtt navigator={navigator} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    marginTop:4,
    fontSize:16,
    textAlign: 'center',
  },
  leftNavButtonText: {
    fontSize: 18,
    marginLeft:13,
    marginTop:2
  }
});

AppRegistry.registerComponent('reportbee', () => reportbee);
