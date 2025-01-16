import {Component} from '@angular/core';
import {Card} from "../../interfaces/Card";
import {NgForOf, NgIf} from "@angular/common";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {CardService} from "../card.service";
import {TYPES} from "../../interfaces/types.enum";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly TYPES = TYPES
  card!: Card;
  replacementCards!: Card[];
  limit: number = 4;
  types: string[] = [TYPES.PERSONNAGE.value, TYPES.OBJET.value, TYPES.LIEU.value, TYPES.ACTION.value, TYPES.CHANSON.value];

  constructor(private cardService: CardService) {
  }

  updateCard(card: Card): void {
    this.card = card
    this.updateSimilarCard()
  }

  updateSimilarCard(){
    this.replacementCards = this.cardService.getSimilarCard(this.card, this.limit, this.types)
  }

  updateFilter(value: string): void {
    if(this.types.includes(value)){
      this.types = this.types.filter(type => type !== value)
    } else {
      this.types.push(value)
    }
    this.updateSimilarCard()
  }

  updateLimit(value: number | string){
    if (typeof value === "string")
      this.limit = parseInt(value)
    this.updateSimilarCard()
  }

  isSelected(value: string): boolean {
    return this.types.includes(value)
  }
}
