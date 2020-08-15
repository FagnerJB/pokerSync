export function cardClasses(deck: string, selected = false) {

    let classes = ["card", deck]

    if (selected)
        classes.push("selected")

    return classes.join(" ")

}

export function cardImage(deck: string, face: string) {

    const base_url = 'https://fagnerjb.com/jbwp/wp-content/uploads/poker/'

    if (deck === "anim")
        if (!["A", "K", "Q", "J", "O"].includes(face.slice(0, 1)))
            deck = "full"

    if (deck !== "mini" && ["Od", "Oh"].includes(face))
        face = "Or"

    if (deck !== "mini" && ["Os", "Oc"].includes(face))
        face = "Ob"

    if (deck === "mini" && ["Od", "Oh", "Os", "Oc"].includes(face))
        face = "Or"

    if ("1" === face.slice(0, 1))
        face = "A" + face.slice(1)

    return `${base_url}${deck}/${face}.png`

}
