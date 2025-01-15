import {Component} from '@angular/core';
import {Card} from "../../interfaces/Card";
import {NgForOf, NgIf} from "@angular/common";
import {SearchBarComponent} from "../search-bar/search-bar.component";

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

  updateCard(card: Card): void {
    this.card = card
    this.remplacmentCards = [card, card, card, card, card]
  }
}
