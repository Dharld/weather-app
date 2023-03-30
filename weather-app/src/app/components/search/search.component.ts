import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  inputValue = new Subject<string>();
  @Output() textChange = new EventEmitter<string>();
  @Input() initialInput = '';
  debounceTime = 300;

  trigger$ = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  constructor() {}

  ngOnInit(): void {
    this.trigger$.subscribe((value) => this.textChange.emit(value));
  }

  onChange(changedValue: string) {
    this.initialInput = changedValue;
    this.inputValue.next(this.initialInput);
  }
}
