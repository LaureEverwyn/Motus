/* Variables */

let mots = []; 
let motChoisi ="";
let longueurMot = 0; 

let positionLigne = 1;
let positionCase = 1;
let tentativesRestantes = 6;


/* Choix Aleatoire */

const chiffreAleatoire = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* Tableau */

async function getMots() {
    const response = await fetch("./mots.json");
    mots = await response.json();
};

/* récupération de la table */

const grille = document.getElementById("grille");

/* création de la grille */

const creerGrille = (lignes, colonnes) => {
    grille.innerHTML = "";

    for (let l = 1; l <= lignes; l++) {
        const tr = document.createElement("tr");
        tr.id = "ligne_" + l;

        for (let c = 1; c <= colonnes; c++) {
            const td = document.createElement("td");
            td.className = "case_" + c;
            td.textContent = ".";
            tr.appendChild(td);
        }

        grille.appendChild(tr);
    }
};

/* Choisi le mot */
async function Jeu() {
    await getMots();
    motChoisi = mots[chiffreAleatoire(0, mots.length - 1)].toUpperCase();
    longueurMot = motChoisi.length;

    console.log("Mot secret :", motChoisi);
    
    creerGrille(6, longueurMot);
};

Jeu();

/* Lettre et Touche */

window.addEventListener("keydown", (event) => {
    if (/^[a-z]$/i.test(event.key)) {
        if (positionCase <= longueurMot) {
            console.log(positionCase)
            const classe = document.querySelector('#ligne_' + positionLigne + ' ' + '.case_' + positionCase)
            classe.textContent = event.key.toUpperCase()
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

    if (event.key === "Enter"){
        bouton.click()
    }
})

const bouton = document.getElementById("valider")
const afficheTentative = document.getElementById("tentative")

/* test le mot */

bouton.addEventListener("click", () => {
    let motEcrit = "";
    let lettresRestantes = motChoisi.split("");

    for (let i = 1; i <= longueurMot; i++) {
        const caseLettre = document.querySelector(
            '#ligne_' + positionLigne + ' .case_' + i
        );
        motEcrit += caseLettre.textContent.toUpperCase();
    }

    if (motEcrit.includes(".")){
        alert("Le mot est incomplet !")
        return;
    }

    for (let i = 0; i < longueurMot; i++) {
        const caseLettre = document.querySelector(
            '#ligne_' + positionLigne + ' .case_' + (i + 1)
        );

        if (motEcrit[i] === motChoisi[i]) {
            caseLettre.classList.add("bien");
            lettresRestantes[i] = null;
        }
    }

    for (let i = 0; i < longueurMot; i++) {
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
        return;
    }

    tentativesRestantes--;
    afficheTentative.textContent = "Tentatives restantes : " + tentativesRestantes;

    positionLigne++;
    positionCase = 1;

    if (positionLigne > 6){
        alert("Vous avez perdu... Le mot était :" + motChoisi)
    }
});

const bouton_recharge = document.getElementById("new")

bouton_recharge.addEventListener("click", () => {
    location.reload()
});