import { Injectable } from '@angular/core';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  //récupère les 5 cartes les plus similaires à notre carte.
  GetFiveCards() {
    fs.readFile('input.json', 'utf8', (err, data) => {
      const jsonData = JSON.parse(data);
    })
  }

  getPath(CardName: string) {
    fs.readFile('input.json', 'utf8', (err, data) => {
      const jsonData = JSON.parse(data);

      console.log(jsonData[CardName]);
    })
  }
}


