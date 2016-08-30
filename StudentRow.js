import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Picker
} from 'react-native';

class StudentRow extends Component{

    constructor(props) {
              super(props);
              this.state={
                 attendance: '',
                 student: this.props.student,
                 date: this.props.date
              }
    }

    onPickerChange(att, name, id) {
        this.setState({attendance:att})
        if (date != '' && att != 'null') {
            var obj = {};
            var newEntry;
            var date=this.props.date;
            var url = 'https://reportbee-cf27a.firebaseio.com/students/'+this.state.student.id+'/attendance.json';
            obj = {}
            obj[date]={
                "att": att
            }

            fetch(url)
                .then(
                    function(response) {
                        response.json().then(
                            function(data) {
                                if(data == null) {
                                    newEntry = true;
                                }
                            }
                        )
                    }
                )
            //check if this is the first attendance entry
            if (newEntry) {
                obj = {
                    "attendance": {}
                }
                obj["attendance"][date] = {
                    "att": att
                }
                url = 'https://reportbee-cf27a.firebaseio.com/students/'+this.state.student.id+'/';
            }


            fetch(url, {
                        method: 'PATCH',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(obj)
            })
        }

    }

    render(){
        return(
                  <View style={{height:70, borderBottomColor: '#ededed', borderBottomWidth:1, paddingLeft:10, paddingTop:10}}>
                      <Text style={{fontSize:22}}>{this.state.student.name}</Text>
                          <Picker
                              selectedValue= {this.state.attendance}
                              onValueChange= {(e) => this.onPickerChange(e, this.state.student.name, this.state.student.id)} prompt="Select">
                              <Picker.Item label="Select" value="null" />
                              <Picker.Item label="Present" value="present" />
                              <Picker.Item label="Half Day" value="halfday" />
                              <Picker.Item label="Informed Absent" value="in-absent" />
                              <Picker.Item label="Uninformed Absent" value="un-absent" />
                          </Picker>
                  </View>
        );
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

module.exports = StudentRow;

