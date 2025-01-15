import {Component} from '@angular/core';
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
  remplacmentCards!: Card[];

  constructor(private cardService: CardService) {
  }

  updateCard(card: Card): void {
    this.card = card
    this.remplacmentCards = this.cardService.getSimilarCard(card)
    console.log(this.remplacmentCards)
  }

}
