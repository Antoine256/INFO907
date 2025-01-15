// @ts-ignore
import * as fs from 'fs';

//récupère les 5 cartes les plus similaires à notre carte.
function GetFiveCards() {
    fs.readFile('input.json', 'utf8', (err, data) => {
        const jsonData = JSON.parse(data);
    })
}

function getPath(CardName : string) {
    let path = [];
    //On fait une boucle ou tant qu'on est sur une fin, on itère sur tout les enfant et ainsi de suite (il faudarait du récursif, on enregistre le chemin en remontant.)
}

getPath("Mulan - Armored Fighter");
