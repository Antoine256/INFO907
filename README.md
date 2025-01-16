# INFO907
Ontologie et application pour suggestion de carte Lorcana


Récupération des données via l'api https://lorcana-api.com/. 

Url de l'api : api.lorcana-api.com
Url pour get toutes les cartes : api.lorcana-api.com/bulk/cards

## Ontologie :

### Attributs des cartes :

- Colors : Amber / Amethyst / Emerald / Ruby / Sapphire / Steel
- Inkable : Inkable / notInkable
- Cost : 0-10
- Types : Item / Character / Action / Location
      - Song
- Abilities : Bodyguard / Challenger / Evasive / Rush / Shift / Support / Ward / Reckless / Resist / Singer / Sing Together
- Classifications : Alien / Hero / Villain / Ally / Dreamborn / Storyborn / Floodborn / Captain / Mentor / Prince / Princess / Queen / King / Leader / Explorer / Performer / Artist / Inventor / Sorcerer / Assistant / Warrior / Pirate / Thief / Soldier / Archer / Beast / Animal / Creature / Monster / Trader / Musketeer
- Strength : 0-10
- Willpower : 1-10
- Lore : 0-5
- Move_Cost : 0-6 


### Arbre :

- Carte Lorcana
  - amber
      - inkable 
         - cost_1
            - item
              - Dinglehopper
            - character
              - challenger
              - evasive
              - ...
            - action
              - song
            - location
         - cost_2
          - ...
         - cost_3
           - character
               - bodyguard
                   - musketeer
                     - ...
                     - strength_2
                       - willpower_3
                         - lore_1
                           - Donald Duck - Musketeer Soldier
         - ...
     - notInkable
  - amethyst
  - emerald
  - ruby
  - sapphire
  - steel


## Transormation des données :

- On récupère les données sous la forme d'un Json dans ./input.json 
- ( nous avons enregistré les données d'un appel api dans un fichier json pour pouvoir travailler dessus sans avoir à faire des appels api à chaque fois)
- On utilise parseData de manière à pouvoir formater les données et on les enregistre dans un fichier json ./output.json
- On utilise ensuite GenerateOntologie.js qui permet de générer l'ontologie à partir des données formatées. 
- Le résultat de l'ontologie est visible dans le fichier ./outputOntologie.json.
- Ce fichier est ensuite utilisé par le site web.
- Les fonctions utilisées par le site web sont dans le service ./LorcanaCardMatchup/src/app/card.service.ts
