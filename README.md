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
