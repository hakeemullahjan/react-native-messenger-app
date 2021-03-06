import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { auth, getAllUsers, createChatRoom, db } from '../config/firebase'
import Story from './Story'

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';





export default class ChatList extends React.Component {

    // static navigationOptions={
    //     headerTitle:
    //         <View>
    //             <Text>My Chat</Text>
    //             <Text>My Pic</Text>
    //         </View>
    // }

    constructor(props) {
        super(props);
        this.state = {
            user: auth.currentUser,
            users: [],
            stories: [],
            isStoryRendering: false,

        }
        this._createChatRoom = this._createChatRoom.bind(this);
    }

    async componentDidMount() {
        // let user=this.props.navigation.getParam('user')
        // console.log('user in chatlist',user)

        // let user = await auth.currentUser
        // console.log('current user in chatlist------>', user)
        // this.setState({ user: user })

        let a = await getAllUsers();
        console.log('resolved of getAllUsers--------->', a)
        this._getAllStories();
        this.setState({ users: a })

    }

    async _getAllStories() {

        db.collection('stories').onSnapshot(snapshot => {
            const stories = [];
            snapshot.forEach(doc => {
                // console.log(doc.data())
                stories.push({ data: doc.data(), id: doc.id })
            })
            this.setState({ stories: stories })
        })

        // db.collection('stories').get().then(snapshot => {
        //     const stories = [];
        //     snapshot.forEach(doc => {
        //         console.log(doc.data())
        //     })
        // })

        // db.collection('stories').doc(chatroomID).collection('messages')
        //     .orderBy('timestamp')
        //     .onSnapshot(snapshot => {
        //         const messages = [];

        //         snapshot.forEach(elem => {
        //             // let key = { data: elem.data(), id: elem.id }
        //             messages.push({ data: elem.data(), id: elem.id })  // originial
        //             // messages.push({ key: { data: elem.data(), id: elem.id } })
        //             // messages.push(key);
        //         })
        //         console.log('messages------>', messages)

        //         this.setState({ messages })

        // })
    }


    async _createChatRoom(item) {
        try {
            let a = await createChatRoom(item);
            console.log('return promise resolved data--------->', a.data);
            console.log(a.chatroomID);
            // this.props.history.push(`/chat/${a.chatroomID}`);
            let chatroomID = a.chatroomID;
            item.chatroomID = chatroomID;
            this.props.navigation.navigate('Chat', { user: item })
        }
        catch (err) {
            console.log('error in creating chatroom', err.message)
            alert(err.message);
        }
    }


    render() {
        const { user, users, stories, isStoryRendering } = this.state;
        console.log('users in state------>', users)

        return (
            <View style={styles.container}>


                <View style={styles.mainview}>

                    <View style={styles.chats}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: user.photoURL }} style={{ width: 55, height: 55, borderRadius: 30 }} />
                            <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 9 }} > Chats</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 8 }}>
                            <TouchableOpacity style={{ margin: 7 }} onPress={() => this.props.navigation.navigate('Cam')} >
                                <FontAwesome name='camera' size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ margin: 7 }}>
                                <Entypo name='new-message' size={30} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <ScrollView style={styles.scroolview}>

                        <View >
                            <TextInput placeholder='Search' style={{ borderWidth: 1, fontSize: 15, borderRadius: 15, padding: 7 }} />
                        </View>

                        <Text>{'\n'}</Text>
                        <ScrollView horizontal>
                            <TouchableOpacity style={{ margin: 7, alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Cam', { user: user })}>
                                <EvilIcons name='plus' size={70} />
                                <Text  >Your story</Text>
                            </TouchableOpacity>



                            {!!stories &&
                                stories.map((item, key) => {
                                    var str = item.data.displayName;
                                    var res = str.substring(0, 6);
                                    var displayName = res;
                                    return (
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Story',{item:item})} key={key} style={{ margin: 7, textAlign: 'center' }}>
                                            <Image source={{ uri: item.data.uri }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                                            <Text >{displayName}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }



                        </ScrollView>


                        <Text>{'\n'}</Text>

                        <View >
                            {/* <TouchableOpacity style={{ margin: 7, flexDirection: 'row' }} onPress={() => this.props.navigation.navigate('Chat', { displayName: user.displayName })}>
                                <Image source={{ uri: user.photoURL }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                                <Text style={{ fontWeight: 'bold', marginTop: 9 }} > {user.displayName}</Text>
                            </TouchableOpacity> */}

                            {!!users &&
                                users.map((item, key) => {
                                    return (
                                        <TouchableOpacity key={key} style={{ margin: 7, flexDirection: 'row' }} onPress={() => this._createChatRoom(item, key)}>
                                            <Image source={{ uri: item.photoURL }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                                            <Text style={{ fontWeight: 'bold', marginTop: 9 }} > {item.displayName}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }

                        </View>



                    </ScrollView>




                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //   alignItems: 'center',
        //   justifyContent: 'center',
    },
    mainview: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '7%',
        margin: '2.5%',
        // borderWidth: 1,

    },
    chats: {
        // borderWidth: 1,
        flex: 0.15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    scroolview: {
        // borderWidth: 1, 
        flex: 0.85,
        width: '100%',

    },

});
