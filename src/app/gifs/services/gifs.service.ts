import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GIFResponse } from '../interfaces/GifResponse';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];
  public results: Gif[] = [];
  private APIKEY: string = "WsuBf6bHKu7qxIxJdDiSxmR0jzDrWEoi";
  private BASEURL = "https://api.giphy.com/v1/gifs";


  get history(): string[] {
    return [...this._history];
  }

  constructor(private httpClient: HttpClient) {
    this._history = JSON.parse(localStorage.getItem("history")!) || [];
    this.results = JSON.parse(localStorage.getItem("results")!) || [];
  }

  searchGifs(term: string) {

    term = term.trim().toLowerCase();
    if (!this._history.includes(term)) {
      this._history.unshift(term);
      this._history = this._history.splice(0, 10);
      localStorage.setItem("history", JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set("api_key", this.APIKEY)
      .set("q", term)
      .set("limit", '10');

    this.httpClient.get<GIFResponse>(`${this.BASEURL}/search`, { params })
      .subscribe((response) => {
        this.results = response.data;
        localStorage.setItem("results", JSON.stringify(this.results));
      })

  }


}
