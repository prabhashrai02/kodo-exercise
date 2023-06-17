import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  setPage(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }
  
  shouldShowPage(pageNumber: number): boolean {
    return (
      Math.abs(pageNumber - this.currentPage) <= 1 ||
      pageNumber === this.totalPages
    );
  }
}
