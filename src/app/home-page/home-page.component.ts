import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  showData: any;
  data: any;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchJsonData().subscribe(() => {
      this.showData = this.getPaginatedData();
    });
  }

  fetchJsonData(): Observable<void> {
    return this.http.get('assets/mock_data.json').pipe(
      map((response) => {
        this.data = response;
        this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
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
    return this.data?.slice(startIndex, endIndex);
  }
}
