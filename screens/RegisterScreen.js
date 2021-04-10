import React, { useLayoutEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements';
import * as firebase from 'firebase';
import { auth } from '../firebase';


function RegisterScreen({ navigation }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "ABC",
        });
    }, [navigation]);

    const register = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoUrl: imageUrl ||
                     "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                })
            })
            .catch((error => alert(error.message)))
    }

    return (
        <KeyboardAvoidingView behavior="padding" styel={styles.container} style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }} > Create a Singal Account</Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={text => setName(text)} />
                <Input placeholder="Email" type="email" value={email} onChangeText={text => setEmail(text)} />
                <Input placeholder="Password" type="password" value={password} secureTextEntry onChangeText={text => setpassword(text)} />
                <Input placeholder="Profile Picture Url (optional)" type="text" value={imageUrl} onChangeText={text => setImageUrl(text)} onSubmitEditing={register} />
            </View>
            <Button containerStyle={styles.button} title="Register" onPress={register} raised />
            <View style={{ height: 50 }} />

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10

    }
})

export default RegisterScreen;