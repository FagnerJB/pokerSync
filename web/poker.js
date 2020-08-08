function parseMD( text ){

    const main = document.createElement( 'span' )

    if( text.name ){
        const name = document.createElement( 'strong' )
        const rank_t = ( text.name === 'Maior carta' ) ? " é " : " de "
        name.appendChild( document.createTextNode( text.name ) )
        main.appendChild(name)
        if(( text.name !== 'Royal Straight Flush' ))
            main.appendChild( document.createTextNode( rank_t ) )
    }

    if( text.cards && text.cards.length > 0 ){
        text.cards.forEach( (card, idx, array) => {
            if( card.rank ){
                const rank = document.createElement( 'span' )
                rank.appendChild( document.createTextNode( card.rank ) )
                rank.classList.add('text-card')
                main.appendChild(rank)
                if( idx === 0 && array.length > 1 )
                    main.appendChild( document.createTextNode( " e " ) )
            }
            if( card.suit ){
                const suit = document.createElement('span')
                main.appendChild( document.createTextNode( " de " ) )
                suit.appendChild( document.createTextNode( card.suit ) )
                if( card.suit === "Copas" )
                    suit.classList.add('c-red')

                if( card.suit === "Espadas" )
                    suit.classList.add('c-purple')

                if( card.suit === "Paus" )
                    suit.classList.add('c-green')

                if( card.suit === "Ouros" )
                    suit.classList.add('c-blue')

                main.appendChild(suit)
            }
        })
    }
    
    return main
    
}

function showCards( hand, text ){
    
    const table = document.querySelector('.cards')
    const name  = document.querySelector('.name')

    name.appendChild(parseMD(text))

    hand.forEach((card, idx) => {

        const div = document.createElement('div')
        const img = document.createElement('img')
        div.classList.add('card')

        if(current !== "mini" && ["Od","Oh"].indexOf(card) >= 0){
            card = "Or"
        }
        if(current !== "mini" && ["Os","Oc"].indexOf(card) >= 0){
            card = "Ob"
        }
        if(current === "mini" && ["Od","Oh","Os","Oc"].indexOf(card) >= 0){
            card = "Or"
        }

        if(current === "anim"){
            
            } else {
                img.src = folders.full + card + ".png"
            }
        } else {
            img.src = folders[current] + card + ".png"
        }
        div.appendChild(img)
        table.appendChild(div)

    })

}

document.addEventListener('DOMContentLoaded', function(){

    fetch("http://192.168.211.136:3333/deal", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            number: 5,
            jokers: 0,
            ranks: "3,4,5,6,7,8,9,T,Q,K"
        })
    }).then(

        res => res.json()

    ).then((data) => {

        const { hand, text } = data
        console.log(text)
        showCards( hand, text )

    }).catch((error) => {

        console.log(error)

    })    
    
})
