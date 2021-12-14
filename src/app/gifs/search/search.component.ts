import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  // Getting the reference from HTML, can be either an element, class or reference
  // ! ensures that the element always will be present
  @ViewChild('query') query!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  search() {
    this.gifsService.searchGifs(this.query.nativeElement.value);

    this.query.nativeElement.value = "";
    
  }

}
