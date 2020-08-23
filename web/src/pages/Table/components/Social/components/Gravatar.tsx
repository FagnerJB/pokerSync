import React from 'react'
import md5 from 'md5'

interface IGravatarProps {
    email: string
    name: string
    size: number
}

const Gravatar: React.FC<IGravatarProps> = (props) => {

    const { email, name, size } = props
    const title = `Imagem de ${name}`
    const hash = md5(email.trim().toLowerCase())

    return (
        <img alt={title} title={title} src={`//www.gravatar.com/avatar/${hash}?d=retro&amp;s=${size}`} height={size} width={size} className="gravatar" />
    )

}

export default Gravatar
