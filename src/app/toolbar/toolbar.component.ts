import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  searchQuery: string = '';
  selectedSortOption: string = 'name';
  dropdownOptions = ['name', 'Last Edited'];

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() sort: EventEmitter<string> = new EventEmitter<string>();

  onOptionSelected(option: string) {
    this.selectedSortOption = option;
    this.sort.emit(option);
  }

  onSearch() {
    this.search.emit(this.searchQuery);
  }
}
