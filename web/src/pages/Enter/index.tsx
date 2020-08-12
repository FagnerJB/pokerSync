import React, { useState, useEffect, FormEvent } from 'react';
import { useHistory } from "react-router-dom";

import './style.css'

function Enter() {

    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [room, setRoom] = useState('')

    useEffect(() => {

        const local = localStorage.getItem('pokerSync')
        if (local) {
            const localParsed = JSON.parse(local)

            if (localParsed.name) {
                setName(localParsed.name)
            }
            if (localParsed.email) {
                setEmail(localParsed.email)
            }

        }

    }, [])

    function handleSubmit(e: FormEvent): void {

        e.preventDefault()

        localStorage.setItem('pokerSync', JSON.stringify({
            name, email, room
        }))

        history.push('/table')

    }

    return (
        <div className="enter">
            <header>
                <h1>PokerSync</h1>
                <p className="subtitle">Sistema de "rolamento de dados" para <strong><a href="https://fagnerjb.com/logs/europair" target="_blank" rel="noopener noreferrer">Europair RPG</a></strong></p>
            </header>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome para identificação</label>
                    <input id="name" type="text" name="name" placeholder="Nome" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="email">E-mail com Gravatar <span>(opcional)</span></label>
                    <input id="email" type="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="enter-last-line">
                    <div>
                        <label htmlFor="room">Número da Sala <span>(deixe vazio para criar sala)</span></label>
                        <input id="room" type="number" min="10" max="99" step="1" name="room" placeholder="Número" value={room} onChange={(e) => setRoom(e.target.value)} />
                    </div>
                    <div className="enter-submit">
                        <button type="submit">Entrar</button>
                    </div>
                </div>


            </form>
        </div>
    );
}

export default Enter;
