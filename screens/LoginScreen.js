import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input } from 'react-native-elements'
import { auth } from '../firebase';

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home')
            }
        })
        return unsubscribe
    }, [])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
            }} style={{ width: 200, height: 200 }} />
            <View style={styles.inputContainer} >
                <Input  placeholder="Email" autoFocus type="email" value={email} onChangeText={setEmail} />
                <Input  placeholder="Password" type="password" secureTextEntry value={password} onChangeText={setPassword} onSubmitEditing={signIn} />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="login" />
            <Button containerStyle={styles.button} type="outline" title="Register" onPress={() => navigation.navigate('Register')} />
            <View style={{ height: 50 }} />

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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

export default LoginScreen;