import React, { Component } from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import Button from 'react-native-button';
import students from './students.json';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Touchable,
  TouchableOpacity
} from 'react-native';

class ViewAtt extends Component{

    constructor(props) {
        super(props);
        this.state={
            data: [],
            query: '',
            students: []
        }

        fetch('https://reportbee-cf27a.firebaseio.com/students.json')
              .then(
                  function(response){
                  response.json().then(function(data) {
                    this.setState({
                         students: data
                    })
                  }.bind(this));
              }.bind(this))

              .catch((error) => {
                console.error(error);
              });
    }

    filterData(query) {
        if(query == '') {
            this.setState({
                   data:[]
            })
        } else {
            const regex = new RegExp(`${query.trim()}`, 'i');
            const filtered = this.state.students.filter(data => (data.name.search(regex) >= 0));
            this.setState({
                data:filtered
            });
        }
    }

    renderSummary(item) {
        return(
            <View>
                <Text>Student name: {item.name}</Text>
                <Text style={{textAlign: 'left'}}>Total number of working days: </Text>
                <Text>Number of Present working days: </Text>
                <Text>Number of Half-present working days: </Text>
                <Text>Number of Absent working days(Informed): </Text>
                <Text>Number of Absent working days(Un-informed): </Text>
            </View>
        )
    }
    render(){
        return(
                    <View style={styles.container}>
                        {this.renderSummary(this.state.query)}
                        <Autocomplete
                          placeholder = "Enter student name or roll number"
                          data={this.state.data}
                          onChangeText={text => this.filterData(text)}
                          renderItem={data => (
                            <TouchableOpacity onPress={() =>
                                this.onSelection(data)
                              }
                            >
                              <Text style={styles.itemText}>{data.name}</Text>
                            </TouchableOpacity>
                          )}
                          containerStyle={styles.autocompleteContainer}
                        />
                    </View>
        );
    }

    onSelection(data) {

        this.setState({
            query: data,
            data:[]
        })
    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

   autocompleteContainer: {
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 50
    },
    itemText: {
      fontSize: 15,
      margin: 2,
      textAlign: 'center'
    },
})

module.exports = ViewAtt;

