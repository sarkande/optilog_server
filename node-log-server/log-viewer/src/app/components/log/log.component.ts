import { Component, Input, OnInit } from '@angular/core';
import { Log } from '../../interfaces/log';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: '[app-log]',
  standalone: true,
  imports: [CommonModule, NgxJsonViewerModule],
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  @Input() toggleTimestamp?: boolean;
  @Input() log?: Log;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    console.log('LogComponent initialized');
    console.log('ToggleTimestamp:', this.toggleTimestamp);
    console.log('Log:', this.log);
  }

  openModale(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          // console.log(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }
  isJsonString(str: string | object): boolean {
    try {
      if (typeof str === 'object') {
        return true;
      }
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  parseJson(str: string | object): any {
    try {
      if (typeof str === 'object') {
        return str;
      }
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  }
}
