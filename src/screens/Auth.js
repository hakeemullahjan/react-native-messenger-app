import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, ActivityIndicator } from 'react-native';
import * as Facebook from 'expo-facebook';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firebase, auth, registerUser } from '../config/firebase';
import Gallery from './Gallery'



export default class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLoading: false
    }
    this._logInWithFacebook = this._logInWithFacebook.bind(this);
  }




  async _logInWithFacebook() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('2906158789455159', { permissions: ['public_profile'], });

      if (type === 'success') {
        this.setState({ isLoading: true })
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        auth.signInWithCredential(credential)
          .then(credential => {
            let user = credential.user
            console.log('current user in auth------>', user);
            // console.log('user uid------->', user.uid);
            // console.log('user name------->', user.displayName);
            // this.setState({ user: user })
            let uid = user.uid;
            let displayName = user.displayName;
            let photoURL = user.photoURL;
            this._registerUser(uid, displayName, photoURL);


            this.props.navigation.navigate('Bottom')
          })
          .catch(err => {
            console.log(err)
          })



        // Get the user's name using Facebook's Graph API
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        //let userData = await response.json();
        //console.log('response------>',userData);
        // Alert.alert('Logged in!', `Hi ${userData.name}!`);
        // let  user=auth.currentUser
        // console.log('current user------>',user)
        // auth.onAuthStateChanged(user => {
        //   if (user != null) {
        //     console.log('user--------->', user);
        //     this.props.navigation.navigate('Bottom')
        //   }
        // })

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async _registerUser(uid, displayName, photoURL) {
    let a = await registerUser(uid, displayName, photoURL);
    console.log(a.message)
  }

  render() {
    // console.log(this.state.user)
    const { isLoading } = this.state;

    if (isLoading) {
      return <View style={styles.container}>
        <ActivityIndicator size='large' color="#000" />

      </View>
    }
    else {
      return (
        <View style={styles.container}>

          <Icon.Button name="facebook"
            size={35} backgroundColor="#3b5998"
            onPress={this._logInWithFacebook}>
            Login with Facebook
          </Icon.Button>

          <View style={{ margin: 3 }}></View>
          {/* <Icon.Button name="google"
            size={35} backgroundColor="#db3236"
          >
            Continue with Google
          </Icon.Button> */}




        </View>
      );
    }

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
