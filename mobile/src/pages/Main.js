import React, {useEffect, useState} from "react"
import {StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard,} from "react-native"
import MapView, {Marker, Callout} from "react-native-maps"
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import { MaterialIcons } from "@expo/vector-icons"

const Main = ({ navigation}) =>{
    const [currentRegion, SetCurrentRegion] = useState(null)
    const [bottomStyle, SetbottomStyle] = useState(styles.searchForm.bottom)

  
    useEffect( () =>{

        Keyboard.addListener("keyboardDidShow", (e) =>{ 
            const hegihtKeybordOpen = styles.searchForm.bottom + e.endCoordinates.height
            SetbottomStyle(hegihtKeybordOpen)
                    alert(e.endCoordinates.height)
         })
         
        Keyboard.addListener("keyboardDidHide", (e) =>{
            SetbottomStyle( styles.searchForm.bottom )
           
            alert(e.endCoordinates.height)
        })

    }, [])


//    function  showTeclado(e){
//     setSerachForm({
//         position: "absolute",
//         bottom: 300,
//         left: 20,
//         right: 20,
//         zIndex: 5,
//         display: "flex",
//         flexDirection: "row"
//     })
    
        // alert("Show")
        // var {height, width} = Dimensions.get('Keyboard');
        // alert(height)
        // navigation.setParams({
        //     keyboardHeight: e.endCoordinates.height,
        //     normalHeight: Dimensions.get('window').height, 
        //     shortHeight: Dimensions.get('window').height - e.endCoordinates.height, 
        // }); 
    // }

//    function  removeTeclado(){
//     setSerachForm({
//         position: "absolute",
//         bottom: 60,
//         left: 20,
//         right: 20,
//         zIndex: 5,
//         display: "flex",
//         flexDirection: "row"
//     })

//     }
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
        <MapView initialRegion={currentRegion} style={styles.map}>
                <Marker coordinate={{latitude: -23.586900999999997, longitude: -46.7188515}}>
                    <Image style={styles.avatar} source={{
                        uri: "https://avatars1.githubusercontent.com/u/17861439?s=460&v=4"
                        }} 
                    />
                    <Callout onPress={() =>{
                        // navegacao
                        navigation.navigate("Profile", { github_username: "carloswilliamds"
                    })
                    }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>
                            Number One
                        </Text>
                        <Text style={styles.devBio}>
                                Front-end Web Developer. Fascinado pelo cosmos, psicologia, filosofia e day trade frustrado.
                        </Text>
                        <Text style={styles.devTechs}>
                                HTML5, CSS3, Javascript, React.
                        </Text>
                    </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={{...styles.searchForm, bottom: bottomStyle}} behavior="padding">
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Buscar devs por techs"
                        placholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                    <TouchableOpacity onPress={ () =>{}} style={styles.loadButton}>
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