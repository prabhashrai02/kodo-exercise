import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-tabular-display',
  templateUrl: './tabular-display.component.html',
  styleUrls: ['./tabular-display.component.css']
})
export class TabularDisplayComponent implements OnChanges {

  @Input() data: CardData[] | null = null;
  showData: boolean = true;

  ngOnChanges(): void {
    this.showData = this.data?.length ? true : false;
  }

  formatDateLastEdited(dateLastEdited: string): string {
    const date = new Date(dateLastEdited);
    return date.toLocaleString();
  }
}

type CardData = {
  dateLastEdited: string;
  description: string; 
  image: string;
  name: string;
}
