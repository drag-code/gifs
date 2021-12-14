import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GIFResponse } from '../interfaces/GifResponse';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];
  public results: Gif[] = [];
  private APIKEY: string = "WsuBf6bHKu7qxIxJdDiSxmR0jzDrWEoi";
  private BASEURL = "api.giphy.com/v1/gifs/search";


  get history(): string[] {
    return [...this._history];
  }

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem("history")) {
      this._history = JSON.parse(localStorage.getItem("history")!);
    }
  }

  searchGifs(term: string) {

    if (term.trim().length != 0) {
      this._history.unshift(term.trim().toLowerCase());
      this._history = Array.from(new Set(this._history));
      this._history = this._history.splice(0, 10);
      localStorage.setItem("history", JSON.stringify(this._history));
    }

    this.httpClient.get<GIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=WsuBf6bHKu7qxIxJdDiSxmR0jzDrWEoi&q=${term}&limit=10`)
      .subscribe((response) => {
        console.log(response.data);
        this.results = response.data;
      })

  }


}
