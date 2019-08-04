import * as firebase from 'firebase';
import 'firebase/firestore'
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native'




// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAs6sTleag2FU6OcTwHGQqPekC9EKOKWoA",
    authDomain: "messenger-app-210.firebaseapp.com",
    databaseURL: "https://messenger-app-210.firebaseio.com",
    projectId: "messenger-app-210",
    storageBucket: "",
    messagingSenderId: "556224972265",
    appId: "1:556224972265:web:25c5b8e82d2ca2bb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const db = firebase.firestore()
const storage = firebase.storage();

function registerUser(uid, displayName, photoURL) {
    return new Promise((resolve, promises) => {
        db.collection('users').doc(uid).set({ uid: uid, displayName: displayName, photoURL: photoURL, createdAt: Date.now() })
            .then(res => {
                resolve({ message: 'User registered successfully!' })
                // console.log('User successfully registered!')
            })
            .catch(err => {
                reject(new Error(err.message))
                console.log(err)
            })
    })
}


function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.collection('users').get().then(snap => {
            const users = [];
            snap.forEach(elem => {
                if (auth.currentUser.uid !== elem.data().uid) {
                    users.push({ uid: elem.data().uid, displayName: elem.data().displayName, photoURL: elem.data().photoURL })
                }
                resolve(users)
            })
        })
    })
}

function createChatRoom(item) {
    const userID = auth.currentUser.uid;
    const friendID = item.uid;
    let chatExists = false;
    // console.log('friendID----->',friendID)
    // console.log('userID------->',userID)

    return new Promise((resolve, reject) => {

        db.collection('chatrooms')
            .where('users.' + userID, '==', true)
            .where('users.' + friendID, '==', true)
            .get().then(snapshot => {
                snapshot.forEach(elem => {
                    chatExists = { data: elem.data(), chatroomID: elem.id }
                })

                if (!chatExists) {
                    const obj = {
                        createdAt: Date.now(),
                        users: {
                            [userID]: true,
                            [friendID]: true,
                        }
                    }
                    db.collection('chatrooms').add(obj).then(snapshot => {
                        resolve({ data: obj, chatroomID: snapshot.id })
                    })
                } else {
                    resolve(chatExists)
                }

            })


    })

}


export {
    firebase,
    auth,
    db,
    storage,
    registerUser,
    getAllUsers,
    createChatRoom,
}