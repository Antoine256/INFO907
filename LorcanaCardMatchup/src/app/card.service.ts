import {Injectable} from '@angular/core';
import {Card} from "../interfaces/Card";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardsOntologie!: any;

  constructor() {
    this.fetchJSONData();
  }

  //récupère les 5 cartes les plus similaires à notre carte.
  GetFiveCards(card: Card): Card[] {
    console.log(this.getPath(card.name))
    return []
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
