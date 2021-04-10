import React, { useLayoutEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import * as firebase from 'firebase'

function ChatScreen({ navigation, route }) {
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerTitleAlign: "left",
            headerTitleStyle: { color: 'white' },
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center", }} >
                    <Avatar rounded source={{ uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: "bold", }}>{route.params.chatName} </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20 }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )

        })
    }, [navigation])

    const sendMessage = () => {
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoUrl: auth.currentUser.photoURL

        })
        setInput("")

        Keyboard.dismiss();
    }
    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ))
        return unsubscribe;
    }, [route,messages])

    return (
        <View  >
            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <React.Fragment >
                        <ScrollView>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>

                                        <Text style={styles.recieverText}>{data.message}</Text>
                                        <Text style={styles.recieverTextName}>By You</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>

                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderTextName}>By {data.displayName}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput value={input} onChangeText={setInput} placeholder="Signal Message" style={styles.textInput} onSubmitEditing={sendMessage} />
                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage} >
                                <Ionicons name="send" size={24} color="#2B68E6" onPress={sendMessage} />
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
            <StatusBar style='light' />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',


    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center'

    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30

    },
    recieverText: {},
    senderText: {},
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    recieverTextName: {
        fontStyle:'italic',
        fontSize:12,
        color:'green'
        

    },
    senderTextName:{
        fontStyle:'italic',
        fontSize:12,
        color:'yellow'

    }
})

export default ChatScreen;