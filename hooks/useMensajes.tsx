import React from 'react'
import { Mensajes } from '../intefaces/MensajesInterface';
import { useState, useEffect } from 'react';
import MensajesDB from '../api/MensajesDB';

interface MensajesState {
    mensajes: Mensajes[]
}

export const useMensajes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [mensajesState, setMensajesState] = useState<MensajesState>({
        mensajes: []
    });

    const getMensajes = async () => {
        const mensajesPromise = MensajesDB.get<Mensajes[]>('/Show');
        const resp = await Promise.all([
            mensajesPromise
        ]);

        setMensajesState({
            mensajes: resp[0].data
        })
        setIsLoading(false);
    }

    useEffect(() => {
        getMensajes()
    }, [])



    return {
        ...mensajesState,
        isLoading
    }
}
