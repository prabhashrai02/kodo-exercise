import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent {
  @Input() cardData: CardData | null = null;
}

type CardData = {
  dateLastEdited: string;
  description: string; 
  image: string;
  name: string;
}