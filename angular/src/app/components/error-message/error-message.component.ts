import { Component,  EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {
  @Input() show: boolean;
  @Output() showChange = new EventEmitter<boolean>();

  constructor() { }

  close() {
    this.show = !this.show;
    this.showChange.emit(this.show);
  }
}
