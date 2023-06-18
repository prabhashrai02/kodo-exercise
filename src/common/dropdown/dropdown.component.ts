import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Input() selectedOption: string = '';

  @Output() optionSelected = new EventEmitter<string>();

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: any) {
    const dropdownElement = document.getElementById('dropdown');
    if (dropdownElement && !dropdownElement.contains(target)) {
      this.dropdownOpen = false;
    }
  }
}
