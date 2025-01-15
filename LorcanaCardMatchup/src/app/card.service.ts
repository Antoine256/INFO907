import {Injectable} from '@angular/core';
import {Card} from "../interfaces/Card";
import {elementAt} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardsOntologie!: any;

  constructor() {
    this.fetchJSONData();
  }

  //récupère les 5 cartes les plus similaires à notre carte.
  getFiveCards(card: Card, deep: number = 0): Card[] {
    const cardPath = this.getPath(card.name)
    let result: any[] = [];
    let level: any = this.cardsOntologie

    for(let i = 0; i < cardPath.length - deep; i++){
      level = level[cardPath[i]]
    }
    result = this.getCards(level)

    console.log(result)
    if(result.length === 5)
      return result
    return result
  }

  getCardss(level: any): string[]{
    if(Array.isArray(level)) {
      return level
    }
    let thisRes: string[] = []
    const keys = Object.keys(level)
    for(let i = 0; i < keys.length; i++){
      thisRes.concat(this.getCardss(level[keys[i]]))
    }
    return thisRes
  }

  getCards(level: any): string[]{
    console.log(level)
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
