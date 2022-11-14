import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() searchPlaceholder: string;
  @Output() searchInitiated: EventEmitter<string> = new EventEmitter<string>();
  searchValue: string;

  constructor() { }

  ngOnInit(): void {
  }

  processSubmit() {
    this.searchInitiated.emit(this.searchValue);
    console.log('Submitted');
    console.log(this.searchValue);
  }

}
