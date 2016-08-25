import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

class Home extends Component{
    render(){
        return(
                  <View style={styles.container}>
                    <Button
                        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'grey'}}
                        style={{fontSize: 20, color: 'yellow'}}
                        onPress= {() => this._navigate('MarkAtt')}
                    >
                      Mark Attendance
                    </Button>
                    <Button
                        containerStyle={{padding:10, marginTop: 20, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'grey'}}
                        style={{fontSize: 20, color: 'orange'}}
                        onPress= {() => this._navigate('ViewAtt')}
                    >
                      View Summary
                    </Button>
                  </View>
        );
    }

    _navigate(name){
        this.props.navigator.push({
            name: name,
        })
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

module.exports = Home;