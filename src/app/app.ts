import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit{
  protected title = 'weather';

  
  searchForm: FormGroup;
  weatherData: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      city: [''],
    });
  }

  baseUrl: string = 'https://api.openweathermap.org/data/2.5/';
  apiKey: string = '784b97d1e30c72e6030b46633d0479a5';

  getWeather(city: string) {
    const url = `${this.baseUrl}weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  onSubmit() {
    this.getWeather(this.searchForm.value.city).subscribe({
      next: (resp) => {
        this.weatherData = resp;
        console.log(this.weatherData);
        this.searchForm.patchValue({ city: '' });
      },

      error: (err) => {
        console.error(err);
        if (err.status === 404) {
          alert('City not found');
          this.searchForm.patchValue({ city: '' });
        } else {
          alert('An error occurred. Please try again later.');
        }
      },
    });
  }

  ngOnInit() {
    this.searchForm.patchValue({ city: 'Lagos' });
    this.onSubmit();
  }


}
