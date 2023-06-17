import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  showData: any;
  data: any;
  filteredData: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchJsonData().subscribe(() => {
      this.filteredData = this.data;
      this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
      this.showData = this.getPaginatedData();
    });
  }

  fetchJsonData(): Observable<void> {
    return this.http.get('assets/mock_data.json').pipe(
      map((response) => {
        this.data = response;
      })
    );
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.showData = this.getPaginatedData();
  }

  getPaginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData?.slice(startIndex, endIndex);
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.currentPage = 1;
  
    if (query.startsWith('"') && query.endsWith('"')) {
      this.filteredData = this.getExactFilteredData();
    } else {
      this.filteredData = this.getFilteredData();
    }
  
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.showData = this.getPaginatedData();
  }

  getExactFilteredData(): any[] {
    
    if (this.searchQuery.trim() === '') {
      return this.data;
    }
    const query = this.searchQuery.toLowerCase().trim();
    return this.data.filter(
      (item: any) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  getFilteredData(): any[] {
    
    if (this.searchQuery.trim() === '') {
      return this.data;
    }
    const query = this.searchQuery.toLowerCase().trim();
    return this.data.filter((item: any) =>
      item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) ||
      this.checkPartialMatch(item.name.toLowerCase(), query) || this.checkPartialMatch(item.description.toLowerCase(), query)
    );
  }
  
  checkPartialMatch(text: string, query: string): boolean {
    const words = query.split(' ');
    for (const word of words) {
      if (!text.includes(word)) {
        return false;
      }
    }
    return true;
  }
  

  onSort(option: string) {
    if (option === 'name') {
      this.filteredData = this.filteredData.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
    } else if (option === 'dateLastEdited') {
      this.filteredData = this.filteredData.sort((a: any, b: any) => {
        const dateA = new Date(a.dateLastEdited);
        const dateB = new Date(b.dateLastEdited);
        return dateA.getTime() - dateB.getTime();
      });
    }
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.showData = this.getPaginatedData();
  }
}
