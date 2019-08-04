import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView,ScrollView } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class Chat extends React.Component {

  // navigationOptions = {
  //   headerTitle: 'hjj'
  // }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user')
    }

  }
  


  render() {
    const { user } = this.state;
    console.log('user in chatScreen------->', user)
    return (
      <View style={styles.container}>

          <ScrollView style={{flex:0.9,borderWidth:1}}>
            
          </ScrollView>

          <View style={{ flex:0.1,flexDirection: 'row', padding: 5, }} >

            <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
              <Text style={{ fontSize: 40, fontWeight: 'bold' }}>::</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
              <FontAwesome name='camera' size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
              <Ionicons name='md-images' size={37} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
              <FontAwesome name='file-audio-o' size={30} />
            </TouchableOpacity>
            <TextInput placeholder='Aa' style={{ fontSize: 15, padding: 4, borderWidth: 1, borderRadius: 30, width: '50%', height: 40,marginTop: 'auto', marginBottom: 'auto', }} />
            <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto',margin: 4 }} >
              <Ionicons name='md-send' size={42} />
            </TouchableOpacity>
          </View>


        </View>
     
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
