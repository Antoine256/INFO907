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
        path = [element.color.toLowerCase()];
        if (element.inkable){
            path.push('inkable');
        }else{
            path.push('not inkable');
        }
        path.push(...["cost_"+element.cost.toString(), element.type.toLowerCase()]);
        if (element.abilities){
            element.abilities.split(',').forEach((ability) => {
                if (ability.trim() !== "") path.push(ability.trim().toLowerCase());
            })
        }
        if (element.classifications){
            element.classifications.split(',').forEach((classification) => {
                if (classification.trim() !== ""){
                    path.push(classification.trim().toLowerCase());
                }
            })
        }
        if (element.strength){
            path.push("strength_"+element.strength.toString())
        }
        if (element.willpower){
            path.push("willPower_"+element.willpower.toString())
        }
        if (element.lore){
            path.push("lore_"+element.lore.toString())
        }else{
            path.push("lore_0")
        }
        addToOntologie( element.name, path);
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
