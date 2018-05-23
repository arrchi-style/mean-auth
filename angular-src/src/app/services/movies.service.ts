import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../common/protocols';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class MoviesService {

  constructor(private http: HttpClient) { }

  private _url = 'http://localhost:8080/movies/movies';

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this._url);
  }

}
