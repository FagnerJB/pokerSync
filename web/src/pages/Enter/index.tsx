import React, { useState, useEffect, FormEvent } from 'react'
import { useHistory } from "react-router-dom"

import Text from '../../components/Text'

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

        localStorage.removeItem('pokerSync')
        localStorage.setItem('pokerSync', JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            room: room.trim()
        }))

        history.push(`${process.env.PUBLIC_URL}/play`)

    }

    return (
        <div className="enter">
            <header>
                <h1>PokerSync</h1>
                <p className="subtitle"><Text s="Dice rolling system for" /> <strong><a href="https://fagnerjb.com/logs/europair" target="_blank" rel="noopener noreferrer">Europair RPG</a></strong></p>
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
                        <label htmlFor="room">Código da sala <span>(deixe vazio para criar sala)</span></label>
                        <input id="room" type="type" name="room" pattern="[a-f0-9]{7}" placeholder="Código" value={room} onChange={(e) => setRoom(e.target.value)} />
                    </div>
                    <div className="enter-submit">
                        <button type="submit"><i className="fas fa-sign-in-alt"></i> Entrar</button>
                    </div>
                </div>


            </form>
        </div>
    );
}

export default Enter;
