import React, {useEffect, useState} from "react"
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard} from "react-native"
import MapView, {Marker, Callout} from "react-native-maps"
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from "@expo/vector-icons"
import api from "../services/api";
import {connect, disconnect, subscribeToNewDevs} from "../services/socket";


const Main = ({ navigation}) =>{
    const [currentRegion, SetCurrentRegion] = useState(null)
    const [bottomStyle, SetbottomStyle] = useState(styles.searchForm.bottom)
    const [devs, setDevs] = useState([])
    const [techs, setTechs] = useState("")
    

    useEffect(() =>{
        subscribeToNewDevs( dev => setDevs([...devs, dev]))
    },[devs])

    const setupWebsocket = () =>{
        disconnect();
        const {latitude, longitude} = currentRegion;
        connect(latitude, longitude, techs);
    }

    async function loadDevs(){
        const {latitude, longitude} = currentRegion;
        const response = await api.get("/search", {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        setDevs(response.data.devs)
        // console.log(response.data.devs)
        setupWebsocket()
    }

    function handleRegionChanged(region){
        SetCurrentRegion(region);
        console.log(region)
    }

    useEffect( () =>{

        Keyboard.addListener("keyboardDidShow", (e) =>{ 
            const hegihtKeybordOpen = styles.searchForm.bottom + e.endCoordinates.height
            SetbottomStyle(hegihtKeybordOpen)
         })
         
        Keyboard.addListener("keyboardDidHide", (e) =>{
            SetbottomStyle( styles.searchForm.bottom)
        })

    }, [])


    useEffect( () =>{
        async function loadInitialPosition(){
           const { granted }  = await requestPermissionsAsync();
            if(granted){
                const location = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const {latitude, longitude} = location.coords;
                SetCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition();
    }, [])

    if(!currentRegion){
        return null;
    }
    return (
    <>
        <MapView onRegionChangeComplete={handleRegionChanged}
                 initialRegion={currentRegion}
                 style={styles.map}>
                {devs.map(dev =>{
                    return (

                        <Marker key={dev._id} coordinate={{latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
                        <Image style={styles.avatar} source={{
                            uri: dev.avatar_url
                            }} 
                        />
                        <Callout onPress={() =>{
                            // navegacao
                            navigation.navigate("Profile", { github_username: dev.github_username
                        })
                        }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>
                                {dev.name}
                            </Text>
                            <Text style={styles.devBio}>
                                    {dev.bio}
                            </Text>
                            <Text style={styles.devTechs}>
                                   {dev.techs.join(", ")}
                            </Text>
                        </View>
                        </Callout>
                    </Marker>

                    )
                })}
            </MapView>
            <View style={{...styles.searchForm, bottom: bottomStyle}} behavior="padding">
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Buscar devs por techs"
                        placholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={techs}
                        onChangeText={ text => setTechs(text)}
                    />
                    <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                        <MaterialIcons name="my-location" />
                    </TouchableOpacity>
            </View>
    </>
    );  
}


const styles =  StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "#FFF"
    },
    callout:{
        width: 260
    },
    devName:{
        fontWeight: "bold",
        fontSize: 16
    },
    devBio: {
        color: "#666",
        marginTop: 5
    },
    devTechs:{
        marginTop: 5
    },
    searchForm:{
        position: "absolute",
        bottom: 60,
        left: 20,
        right: 20,
        zIndex: 5,
        display: "flex",
        flexDirection: "row"
    },
    searchInput:{
        flex: 1,
        height:50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {width: 2, height: 2},
        elevation: 2,

    },
    loadButton:{
        width: 50,
        height: 50,
        backgroundColor: "#8E4DFF",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15
    }
})

export default Main