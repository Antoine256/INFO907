import {Injectable} from '@angular/core';
import {Card} from "../interfaces/Card";
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

  getSimilarCard(card: Card, limit: number, filter: string[] = []): Card[]{
    const cardPath = this.getPath(card.name)
    const cards = this.getXCards(card.name, cardPath, 5, 0 , [], limit, filter)
    return cards.map(similarCard => CARDS.find(c => c.name === similarCard)!)
  }

  getXCards(cardName: string, cardPath: string[], x: number, deep: number = 0, savedResult: string[], limit: number, filter: string[]): string[] {
    let result: any[] = [];
    let level: any = this.cardsOntologie

    for(let i = 0; i < cardPath.length - deep; i++){
      level = level[cardPath[i]]
    }
    result = this.getCards(level)
    result = result.filter(card => card !== cardName)

    result = result.filter(cardN =>{
      let good = false
      filter.forEach(f => {
        if (this.getPath(cardN).includes(f)){
          good = true
        }
      })
      return good
    })

    savedResult = savedResult.concat(result).filter((value, index, self) => index === self.findIndex((t) => (t === value)))

    if(savedResult.length >= x)
      return savedResult.slice(0, 5)
    if (deep +1 >= limit){
      return savedResult
    }
    return this.getXCards(cardName, cardPath, x, deep + 1, savedResult, limit, filter)
  }
  //récupère les 5 cartes les plus similaires à notre carte.

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
