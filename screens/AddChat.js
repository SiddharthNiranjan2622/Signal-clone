import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../firebase';

function AddChat({ navigation }) {
    const [input, setInput] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
            headerTitleStyle: { color: 'white' },

        })

    }, [navigation])

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() =>{
            navigation.goBack();
        }).catch((error) =>alert(error))
    }

    return (
        <View style={styles.container}>
        <StatusBar style='light'/>

            <Input placeholder="Enter a chat name" value={input} onChangeText={(text) => setInput(text)} leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black" />
            } />
            <Button title="Create a new Chat" onPress={createChat} />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        padding:30,
        height:"100%",

    }
})

export default AddChat;