import {Injectable} from '@angular/core';
import {Card} from "../interfaces/Card";
import {elementAt} from "rxjs";
import CARDS from "../data/cards";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardsOntologie!: any;
  cardsDatas!: Card[];

  constructor() {
    this.fetchJSONData();
    this.cardsDatas = CARDS
  }

  getSimilarCard(card: Card): Card[]{
    const cardPath = this.getPath(card.name)
    const cards = this.getXCards(card.name, cardPath, 5)
    return cards.map(similarCard => CARDS.find(c => c.name === similarCard)!)
  }

  //récupère les 5 cartes les plus similaires à notre carte.
  getXCards(cardName: string, cardPath: string[], x: number, deep: number = 0): string[] {
    let result: any[] = [];
    let level: any = this.cardsOntologie

    for(let i = 0; i < cardPath.length - deep; i++){
      level = level[cardPath[i]]
    }
    result = this.getCards(level)
    result = result.filter(card => card !== cardName)

    if(result.length >= x)
      return result.slice(0, 5)
    return this.getXCards(cardName, cardPath, x, deep + 1)
  }

  getCards(level: any): string[]{
    if (Array.isArray(level)){
      return level;
    }
    let thisRes:string[] = [];
    for (let i=0; i < Object.keys(level).length; i++){
      thisRes.push(...this.getCards(level[Object.keys(level)[i]]));
    }
    return thisRes;
  }

  getPath(cardName: string): string[] {
    return this.foundPath(this.cardsOntologie, cardName).path.reverse()
  }
  foundPath(ontTemp: any, cardName: any): Response {
    if (Array.isArray(ontTemp)){
      if (ontTemp.includes(cardName)){
        return {res: true,path: []};
      }else{
        return {res: false,path: []}
      }
    }
    let thisRes: Response = {res: false,path: []};
    for (let i=0; i < Object.keys(ontTemp).length; i++){
      let response: Response = this.foundPath(ontTemp[Object.keys(ontTemp)[i]],cardName);
      if (response.res){
        const name: string = Object.keys(ontTemp)[i]!
        response.path = response.path.concat(name)
        thisRes = response;
        break;
      }else{
        thisRes = {res: false,path: []};
      }
    }
    return thisRes;
  }

  fetchJSONData(): any {
    fetch("assets/outputOntologie.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error
          (`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) =>
        this.cardsOntologie = data)
      .catch((error) =>
        console.error("Unable to fetch data:", error));
  }
}

interface Response {
  res: boolean;
  path: string[];
}
