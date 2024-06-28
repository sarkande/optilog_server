import { Component, Input, OnInit } from '@angular/core';
import { Log } from '../../interfaces/log';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-log]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss',
})
export class LogComponent implements OnInit {
  // add props here timestamp and message
  @Input() toggleTimestamp?: boolean;
  @Input() log?: Log;

  constructor() {}
  ngOnInit(): void {
    // add logic here
    console.log('LogComponent initialized');
    console.log('ToggleTimestamp:', this.toggleTimestamp);
    console.log('Log:', this.log);
  }
}
