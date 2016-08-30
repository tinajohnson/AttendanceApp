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
  TouchableOpacity,
  ToastAndroid
} from 'react-native';

class ViewAtt extends Component{

    constructor(props) {
        super(props);
        this.state={
            data: [],
            query: '',
            students: [],
            summary:[],
            attendance: []
        }

        fetch('https://reportbee-cf27a.firebaseio.com/students.json')
              .then(
                  function(response){
                  response.json().then(function(data) {
                    this.setState({
                         students: data,
                         attendance: data
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
            const filtered = this.state.students.filter(data => (data.name.search(regex) >= 0) || (data.id.search(regex) >= 0));
            this.setState({
                data:filtered
            });
        }
    }

    calculateAtt(data) {
        let present=0, halfday=0, unAbsent=0, inAbsent = 0, total =0;
        let studAtt = {}
        for (let i of this.state.attendance) {
            if(i["id"] == data.id) {
                    studAtt = i["attendance"];
                    for (let j in studAtt) {
                        if( studAtt.hasOwnProperty(j) ) {
                            console.log(studAtt[j]["att"]);
                            switch(studAtt[j]["att"]) {
                                case 'un-absent':
                                    unAbsent++;
                                    break;
                                case 'in-absent':
                                    inAbsent++;
                                    break;
                                case 'present':
                                    present++;
                                    break;

                                case 'halfday':
                                    halfday++;
                                    break;
                            }
                        }
                        total+=1;

                    }
            }

        }

        this.renderSummary(total, inAbsent, unAbsent, present, halfday, data );

    }

    renderSummary(total, inAb, unAb, present, half, item) {

        this.summary =

            <View>
                <Text>Student name: {item.name}</Text>
                <Text style={{textAlign: 'left'}}>Total number of working days: {total} </Text>
                <Text>Number of Present working days:{present} </Text>
                <Text>Number of Half-present working days:{half} </Text>
                <Text>Number of Absent working days(Informed):{inAb} </Text>
                <Text>Number of Absent working days(Un-informed):{unAb} </Text>
            </View>
    }

    render(){
        return(
                    <View style={styles.container}>
                        {this.summary}
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
        this.calculateAtt(data);
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

