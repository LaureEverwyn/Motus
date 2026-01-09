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

const bouton = document.getElementById("valider")

bouton.addEventListener("click", () => {
    let motEcrit = "";
    let lettresRestantes = motChoisi.split("");

    for (let i = 1; i <= 5; i++) {
        const caseLettre = document.querySelector(
            '#ligne_' + positionLigne + ' .case_' + i
        );
        motEcrit += caseLettre.textContent.toLowerCase();
    }

    if (motEcrit.includes(".")){
        alert("Le mot est incomplet !")
        return;
    }

    for (let i = 0; i < 5; i++) {
        const caseLettre = document.querySelector(
            '#ligne_' + positionLigne + ' .case_' + (i + 1)
        );

        if (motEcrit[i] === motChoisi[i]) {
            caseLettre.classList.add("bien");
            lettresRestantes[i] = null;
        }
    }

    for (let i = 0; i < 5; i++) {
        const caseLettre = document.querySelector(
            '#ligne_' + positionLigne + ' .case_' + (i + 1)
        );

        if (caseLettre.classList.contains("bien")) continue;

        const index = lettresRestantes.indexOf(motEcrit[i]);

        if (index !== -1) {
            caseLettre.classList.add("mal");
            lettresRestantes[index] = null;
        } else {
            caseLettre.classList.add("faux");
        }
    }

    if (motEcrit === motChoisi) {
        alert("Bravo vous avez gagné !");
    } else {
        alert("Vous n'avez pas trouver, recommencer !");
        positionLigne =+ 1
    }

    positionLigne++;
    positionCase = 1;

    if (positionLigne > 6){
        alert("Vous avez perdu... Le mot était :" + motChoisi)
    }
});

