import React from "react"
import {View, StyleSheet} from "react-native"
import { WebView } from 'react-native-webview'

const Profile = ({navigation}) =>{
    const github_username = navigation.getParam("github_username")
    return <WebView style={style.webview} source={{uri: `https://github.com/${github_username}`}}/>
}

const style = StyleSheet.create({
    webview:{
        flex: 1
    }
})

export default Profile