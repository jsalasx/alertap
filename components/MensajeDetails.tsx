import React from 'react'
import { Mensajes } from '../intefaces/MensajesInterface';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BoxShadow } from 'react-native-shadow';

interface Props {
    mensaje: Mensajes,
    height?: number,
    width?: number
}

export const MensajeDetails = ({ mensaje, height = 200, width = 300 }: Props) => {

    const uri = `http://alertaewbs.site:81/ewbs/logo3.png`;

    const shadowOpt = {
        width,
        height,
        color: "#000",
        border: 1,
        radius: 10,
        opacity: 0.1,
        x: 5,
        y: 7,
        style: { marginVertical: 0 }
    }

    return (
        <BoxShadow setting={shadowOpt}>
            <View style={{
                ...styles.msgContainer,
                width,
                height,

                //backgroundColor: 'red'
            }}>

                <Image source={{ uri }} style={{ width: 75, height: 75, marginTop: -10 }} ></Image>
                <Text style={styles.title}> Sistema de Alerta Temprana</Text>
                <Text style={styles.body}> {mensaje.mensaje} </Text>
                <Text style={styles.fecha}> {mensaje.fecha} </Text>
            </View>
        </BoxShadow>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 7
    },
    body: {
        marginTop: 30,
        fontSize: 10,
        fontStyle: 'italic',
        alignSelf: 'center'
    },
    fecha: {
        position: 'absolute',
        alignSelf: 'center',
        fontSize: 8,
        opacity: 0.4,
        bottom: 10,

    },
    msgContainer: {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'

    },

});