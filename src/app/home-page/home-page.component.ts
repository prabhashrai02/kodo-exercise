import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  data: any;

  constructor(private http: HttpClient) {
    this.fetchJsonData();
  }

  fetchJsonData() {
    this.http.get('assets/mock_data.json').subscribe((response) => {
      this.data = response;
      console.log(this.data); // optional: log the data to the console
    });
  }
}
