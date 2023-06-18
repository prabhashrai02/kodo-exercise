import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Input() searchQuery: string = '';
  @Input() sortOption: string = '';

  dropdownOptions = ['Name', 'Last Edited'];

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() sort: EventEmitter<string> = new EventEmitter<string>();

  onOptionSelected(option: string) {
    this.sortOption = option;
    this.sort.emit(option);
  }

  onSearch() {
    this.search.emit(this.searchQuery);
  }
}
