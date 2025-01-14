import {Component, OnInit} from '@angular/core';
import {Card} from "../../interfaces/Card";
import cards from "../../data/cards";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  cards : Card[]= [];
  tenCards: Card[] = [];

  ngOnInit() {
    console.log('HomeComponent initialized');
    this.cards = cards;
    this.tenCards = this.cards.slice(0, 10);
  }


}
