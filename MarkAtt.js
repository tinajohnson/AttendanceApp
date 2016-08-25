import React, { Component } from 'react';
import Button from 'react-native-button';
import StudentRow from './StudentRow';
import DatePicker from 'react-native-datepicker';
import firebase from 'firebase';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  Picker,
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native';

class MarkAtt extends Component{

    constructor(props) {
          super(props);
          this.state={
             dataSource: ds.cloneWithRows([]),
             date: ''
          }
    }

    componentDidMount() {
        fetch('https://reportbee-cf27a.firebaseio.com/students.json')
              .then(
                  function(response){
                  response.json().then(function(data) {
                    this.setState({
                         dataSource: ds.cloneWithRows(data)
                    })
                  }.bind(this));
              }.bind(this))

              .catch((error) => {
                console.error(error);
              });

    }

    _renderRow(rowData) {
        return (<StudentRow student={rowData} date={this.state.date}/> )
    }

    markAttendance() {
    }

    render() {
      return (
      <View style={{ marginTop:60 }}>

            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-06-01"
              maxDate="2017-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                },
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)} enableEmptySections={true}
             />
            <Button
                containerStyle={{padding:10, marginTop:20, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}}
                style={{fontSize: 20, color: 'white'}}
                onPress= {() => this._save()}>
                Submit
            </Button>
      </View>
    );
    }

    _save() {
        ToastAndroid.show('Saved!', ToastAndroid.SHORT);
        this._navigate("Home");
    }

    _navigate(name) {
        this.props.navigator.push({
            name:name
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

module.exports = MarkAtt;
