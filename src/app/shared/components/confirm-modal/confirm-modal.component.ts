import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() okButtonText: string;
  @Input() cancelButtonText: string;
  @Output() modalResultEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  faClose: IconDefinition = faClose

  constructor() { }

  ngOnInit(): void {
  }

  okayModal() {
    this.modalResultEvent.emit(true);
  }

  cancelModal() {
    this.modalResultEvent.emit(false);
  }

}
