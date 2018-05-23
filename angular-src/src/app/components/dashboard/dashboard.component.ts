import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MoviesService]
})
export class DashboardComponent implements OnInit {

  constructor(private _movieService: MoviesService) { }

  public movies = [];

  ngOnInit() {
    this._movieService.getMovies()
    .subscribe(data => this.movies = data);
    // console.log('LOG' + this.movies[1].movie);
    
  }

}
