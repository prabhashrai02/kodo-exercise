import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})

export class DropdownComponent {
  @Input() options: string[] = [];
  @Output() optionSelected = new EventEmitter<string>();

  dropdownOpen = false;
  selectedOption = '';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.dropdownOpen = false;
  }
}
