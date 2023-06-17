import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabular-display',
  templateUrl: './tabular-display.component.html',
  styleUrls: ['./tabular-display.component.css']
})
export class TabularDisplayComponent {
  @Input() data: CardData[] | null = null;
}

type CardData = {
  dateLastEdited: string;
  description: string; 
  image: string;
  name: string;
}
