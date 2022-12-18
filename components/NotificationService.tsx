import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useRef } from 'react';
import { Platform } from 'react-native';
import MensajesDB from '../api/MensajesDB';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        MensajesDB.post("/tokens/", {
            token,
            estadoToken: 1,
            esMovil: 1
        }).then(() => {
            //console.log("ok")
        })
        //console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}
export const schedulePushNotification = async (body: string) => {
    //console.log("entro a enviar notification")
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Sistema de alerta temprana 📬",
            body,
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}
export const NotificacionesComp = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();




    /*useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)

            MensajesDB.post("/tokens/", {
                token,
                estadoToken: 1
            }).then(() => {
                //console.log("ok")
            }
            )
        })
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            //console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);*/

}

/*return
...schedulePushNotification,
...registerForPushNotificationsAsync
;*/




