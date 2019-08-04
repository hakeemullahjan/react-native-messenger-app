import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';


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

    return (
      // <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled >

        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          // alignItems: 'center',
        }}>

          <View>
            {/* <Text>{this.props.navigation.getParam('user')}</Text> */}
            {/* <Text>{this.state.user.uid}</Text> */}
          </View>

          <View>

          </View>

          <View style={{ flexDirection: 'row', padding: 5, }} >
            <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
              <Text style={{ fontSize: 40, fontWeight: 'bold' }}>::</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
              <Image source={require('../assets/584abf432912007028bd9337.png')} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
              <Image source={require('../assets/kisspng-coloring-book-drawing-microsoft-clip-art-photo-gallery-icon-5b17d9c6202c02.0781785115282897341318.jpg')} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', margin: 4 }}>
              <Image source={require('../assets/Artboard_103-512.png')} style={{ width: 35, height: 35 }} />
            </TouchableOpacity>

            <TextInput placeholder='Aa' style={{ fontSize: 15, padding: 4, borderWidth: 1, borderRadius: 30, marginLeft: 'auto', width: '55%', height: 40 }} />
          </View>


        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
