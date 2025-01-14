// Lire le fichier JSON
import * as fs from 'fs';

function convertKeysToLowerCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
      return obj; // Ne rien changer pour les valeurs non-objets
  }
  
  if (Array.isArray(obj)) {
      return obj.map(convertKeysToLowerCase); // Parcourir récursivement chaque élément
  }

  const lowerCaseObj = {};
  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          const lowerCaseKey = key.toLowerCase(); // Conversion de la clé en minuscule
          lowerCaseObj[lowerCaseKey] = convertKeysToLowerCase(obj[key]); // Appel récursif
      }
  }
  return lowerCaseObj;
}


fs.readFile('input.json', 'utf8', (err, data) => {
  if (err) {
      console.error('Erreur lors de la lecture du fichier:', err);
      return;
  }
  
  const jsonData = JSON.parse(data);
  const result = convertKeysToLowerCase(jsonData); // Conversion des clés
  
  fs.writeFile('output.json', JSON.stringify(result, null, 2), (err) => {
      if (err) {
          console.error('Erreur lors de l\'écriture du fichier:', err);
          return;
      }
      console.log('Fichier modifié écrit dans output.json');
  });
});
