import {Component, ElementRef, ViewChild} from '@angular/core';
import {Card} from "../../interfaces/Card";
import {CommonModule, NgFor, NgForOf, NgIf} from "@angular/common";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {CardService} from "../card.service";

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

  card!: Card;
  replacementCards!: Card[];
  limit: number = 4;

  constructor(private cardService: CardService) {
  }

  updateCard(card: Card): void {
    this.card = card
    this.updateSimilarCard(4)
  }

  updateSimilarCard(limit: number | string){
    if (typeof limit === "string")
      limit = parseInt(limit)
    this.replacementCards = this.cardService.getSimilarCard(this.card, limit, ["character"])
  }
}
