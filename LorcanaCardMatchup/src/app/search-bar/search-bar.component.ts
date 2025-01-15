import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Card} from "../../interfaces/Card";
import cards from "../../data/cards";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{
  @Output() onCardSelected = new EventEmitter<Card>();

  cards: Card[]= [];
  cardsFound: Card[]= [];
  hideResults: boolean = true;

  ngOnInit() {
    this.cards = cards;
  }

  searchCards(name: string): Card[] {
    this.cardsFound = []
    this.cards.some(card => {
      if(card.name.toLowerCase().includes(name.toLowerCase())){
        this.cardsFound.push(card)
      }
    });
    this.updateHideResults(false)
    return this.cardsFound
  }

  selectCard(card: Card): void {
    this.updateHideResults(true)
    this.onCardSelected.emit(card)
  }

  updateHideResults(value: boolean){
    this.hideResults = value
  }
}
