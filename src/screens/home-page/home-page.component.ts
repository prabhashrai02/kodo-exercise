import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable, Subject, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  showData: any;
  data: any;
  filteredData: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  searchQuery: string = '';
  sortOption: string = '';
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(300))
      .subscribe((query) => {
        this.onSearch(query);
      });

    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.searchQuery = params.get('query') || '';
      this.sortOption = params.get('sort') || '';
      this.searchSubject.next(this.searchQuery);
    });

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

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery },
      queryParamsHandling: 'merge',
    });
  }

  updateSearchQuery(query: string) {
    this.searchSubject.next(query);
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
    return this.data.filter(
      (item: any) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        this.checkPartialMatch(item.name.toLowerCase(), query) ||
        this.checkPartialMatch(item.description.toLowerCase(), query)
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
    this.sortOption = option;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery, sort: this.sortOption },
      queryParamsHandling: 'merge',
    });

    if (option.toLowerCase() === 'name') {
      this.filteredData = this.filteredData.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
    } else if (option.toLowerCase() === 'last edited') {
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
  
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
