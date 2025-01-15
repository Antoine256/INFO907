import * as fs from 'fs';

let ontologie = {};

fs.readFile('output.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return;
    }

    const jsonData = JSON.parse(data);
    console.log(jsonData.length);

    jsonData.forEach((element) => {
        let path = [];
        if (element.type === "Character"){
            path = [element.color, element.inkable, element.cost, element.type]
            if (element.abilities){
                element.abilities.split(',').forEach((ability) => {
                    if (ability.trim() !== "") path.push(ability.trim());
                })
            }
            if (element.classifications){
                element.classifications.split(',').forEach((classification) => {
                    if (classification.trim() !== ""){
                        path.push(classification.trim());
                    }
                })
            }
            path.push(...[element.strength, element.willpower, element.lore])
            console.log(path);
            addToOntologie( element.name, path);
        }
    });

    writeOntologie();
});

function addToOntologie( element, path){
    let tempOntologie = ontologie
    for (let i = 0; i < path.length; i++){
        if (!tempOntologie[path[i]]) {
            if (i === path.length - 1) {
                tempOntologie[path[i]] = [];
            }else{
                tempOntologie[path[i]] = {};
            }
        }
        tempOntologie = tempOntologie[path[i]];
    }
    tempOntologie.push(element);
}

function writeOntologie(){
    fs.writeFile('outputOntologie.json', JSON.stringify(ontologie, null, 2), (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture du fichier:', err);
            return;
        }
        console.log('Fichier modifié écrit dans outputOntologie.json');
    });
}
