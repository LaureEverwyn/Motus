/* Tableau */

const mots = ["arbre","plage","livre","table","verre","chien","fleur","route","neige","pomme","lampe","monde",
    "sable","pluie","porte","carte","train","fruit", "herbe", "ville"];

/* Variables */

let positionLigne = 1
let positionCase = 1

/* Fonction */

const chiffreAleatoire = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

/* Logique */

const motChoisi = mots[chiffreAleatoire(0, mots.length - 1)]

window.addEventListener("keydown", (event) => {
    if (/^[a-z]$/i.test(event.key)) {
        if (positionCase <= 5) {
            console.log(positionCase)
            const classe = document.querySelector('#ligne_' + positionLigne + ' ' + '.case_' + positionCase)
            classe.textContent = event.key
            positionCase = positionCase + 1
        }
    }

    if (event.key === "Backspace") {
        if (positionCase > 1) {
            positionCase = positionCase - 1
            const classe = document.querySelector('#ligne_' + positionLigne + ' ' + '.case_' + positionCase)
            classe.textContent = '.'
        }
    }
})