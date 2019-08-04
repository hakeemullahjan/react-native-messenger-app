import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native';
import { sendMessagesToDB, db, auth } from '../config/firebase'
import moment from 'moment'

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
      user: this.props.navigation.getParam('user'),
      text: '',
      messages: [],

    }
    this._sendMessage = this._sendMessage.bind(this);
  }

  _sendMessage() {
    const { text, user } = this.state;
    console.log('text----->', text)
    const chatroomID = user.chatroomID;
    // console.log(chatroomID);
    sendMessagesToDB(chatroomID, text)
    this.setState({ text: '' })
  }

  componentDidMount() {
    this._getAllMessages();
  }

  async _getAllMessages() {
    const { user } = this.state;
    const chatroomID = user.chatroomID;
    console.log('componentDidMount--chatroomID', chatroomID);

    db.collection('chatrooms').doc(chatroomID).collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const messages = [];

        snapshot.forEach(elem => {
          // let key = { data: elem.data(), id: elem.id }
          messages.push({ data: elem.data(), id: elem.id })  // originial
          // messages.push({ key: { data: elem.data(), id: elem.id } })
          // messages.push(key);
        })
        console.log('messages------>', messages)

        this.setState({ messages })

      })
  }



  render() {
    const { user, text, messages } = this.state;
    // console.log('user in chatScreen------->', user)
    // console.log('text---->', text)
    return (
      <View style={styles.container}>

        <View style={{ flex: 0.9, marginHorizontal: '5%', }}>
          {/* {
            messages.map((message, key) => {
              const messageStyle = message.data.userID === auth.currentUser.uid ?
                { marginLeft: 'auto', backgroundColor: '#3b5998', margin: '3%', padding: '3%', borderRadius: 15 } :
                { marginRight: 'auto', backgroundColor: '#696969', margin: '3%', padding: '3%', borderRadius: 15 }

              return (
                <View style={messageStyle} key={key}>
                  <Text style={{ fontSize: 20, color: '#fff' }}>{message.data.message}</Text>
                  <Text style={{ color: '#fff' }}>{moment(message.data.timestamp).fromNow()}</Text>
                </View>
              );
            })
          } */}

          {!!messages.length &&
            <FlatList
              data={messages}
              renderItem={({ item, index }) =>
                // //  console.log('flatlist data----->', item.data.message, moment(item.data.timestamp).fromNow());
                //   let msg = item.data.message;
                //   let time = moment(item.data.timestamp).fromNow();
                //   console.log('message----->', msg, time);
                //   const messageStyle = item.data.userID === auth.currentUser.uid ?
                //     { marginLeft: 'auto', backgroundColor: '#3b5998', margin: '3%', padding: '3%', borderRadius: 15 } :
                //     { marginRight: 'auto', backgroundColor: '#696969', margin: '3%', padding: '3%', borderRadius: 15 };

                <ScrollView>
                  {
                    item.data.userID === auth.currentUser.uid ?
                      < View style={{ marginLeft: 'auto', backgroundColor: '#3b5998', margin: '3%', padding: '3%', borderRadius: 15 }}>
                        <Text style={{  color: '#fff',fontWeight:'bold' }}>{item.data.message}</Text>
                        <Text style={{ color: '#fff' }}>{moment(item.data.timestamp).fromNow()}</Text>
                        
                      </View>
                      :
                      <View style={{ marginRight: 'auto', backgroundColor: '#696969', margin: '3%', padding: '3%', borderRadius: 15 }}>
                        <Text style={{  color: '#fff' ,fontWeight:'bold'}}>{item.data.message}</Text>
                        <Text style={{ color: '#fff' }}>{moment(item.data.timestamp).fromNow()}</Text>
                      </View>
                  }

                </ScrollView>


              }
              keyExtractor={(item, index) => index.toString()}
            />
          }

        </View>




        <View style={{ flex: 0.1, flexDirection: 'row', padding: 5 }} >

          <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>::</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cam')} style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
            <FontAwesome name='camera' size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
            <Ionicons name='md-images' size={37} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
            <FontAwesome name='file-audio-o' size={30} />
          </TouchableOpacity>
          <TextInput onChangeText={(text) => this.setState({ text })} value={this.state.text} placeholder='Aa' style={{ fontSize: 15, padding: 4, borderWidth: 1, borderRadius: 30, width: '50%', height: 40, marginTop: 'auto', marginBottom: 'auto', }} />
          <TouchableOpacity onPress={this._sendMessage} style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }} >
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
