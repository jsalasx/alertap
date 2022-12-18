import React from 'react'
import { Mensajes } from '../intefaces/MensajesInterface';
import { useState, useEffect } from 'react';
import MensajesDB from '../api/MensajesDB';
import { registerForPushNotificationsAsync, schedulePushNotification } from '../components/NotificationService';


interface MensajesState {
    mensajes: Mensajes[]
}

export const useMensajes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [mensajesState, setMensajesState] = useState<MensajesState>({
        mensajes: []
    });

    const getMensajes = async (token: string) => {
        //setIsLoading(true);
        const mensajesPromise = MensajesDB.post<Mensajes[]>('/ShowWithTokenMovil/', {
            token
        });
        const resp = await Promise.all([
            mensajesPromise
        ]);

        if (resp[0].data.length == 0) {
            const mensajesUltimoPromise = MensajesDB.get<Mensajes[]>('/ShowMensajesUltimos/');
            const respUltimos = await Promise.all([
                mensajesUltimoPromise
            ]);

            setMensajesState({
                mensajes: respUltimos[0].data
            })
        } else {
            resp[0].data.forEach(element => {
                //console.log(element.mensaje);
                schedulePushNotification(element.mensaje)
            });

            setMensajesState({
                mensajes: resp[0].data
            })
        }


        setIsLoading(false);
    }

    const getMensajesInit = async () => {
        //setIsLoading(true);
        const mensajesUltimoPromise = MensajesDB.get<Mensajes[]>('/ShowMensajesUltimos/');
        const respUltimos = await Promise.all([
            mensajesUltimoPromise
        ]);
        setMensajesState({
            mensajes: respUltimos[0].data
        })

        setIsLoading(false);
    }


    useEffect(() => {
        getMensajesInit();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            //const token: string | undefined = await registerForPushNotificationsAsync()
            //console.log(token)
            //getMensajes(token)
            getMensajesInit();
            console.log("interval");
        }, 10000);
        return () => clearInterval(interval);
    }, []);


    return {
        ...mensajesState,
        isLoading
    }
}
