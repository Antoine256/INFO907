// @ts-ignore
import * as fs from 'fs';

//récupère les 5 cartes les plus similaires à notre carte.
function GetFiveCards() {
    fs.readFile('input.json', 'utf8', (err, data) => {
        const jsonData = JSON.parse(data);
    })
}

function foundCharacter(ontTemp, CardName ) {
    if (Array.isArray(ontTemp)){
        if (ontTemp.includes(CardName)){
            return {res: true,path: []};
        }else{
            return {res: false,path: []}
        }
    }
    let thisRes = {res: false,path: []};
    for (let i=0; i < Object.keys(ontTemp).length; i++){
        let response = foundCharacter(ontTemp[Object.keys(ontTemp)[i]],CardName);
        if (response.res){
            response = {res: true,path: [Object.keys(ontTemp)[i],...response.path]};
            thisRes = response;
            break;
        }else{
            thisRes = {res: false,path: []};
        }
    }
    return thisRes;
}

async function getPath(cardName) {
    let path = [];
    await fs.readFile('outputOntologie.json', 'utf8', (err, data) => {
        let ontTemp = JSON.parse(data);
        //On fait une boucle ou tant qu'on est sur une fin, on itère sur tout les enfant et ainsi de suite (il faudarait du récursif, on enregistre le chemin en remontant.)
        path = foundCharacter(ontTemp, cardName);
        console.log(path);
    })
    return path
}

let path = await getPath("Mulan - Armored Fighter")
