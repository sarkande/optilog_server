import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogService } from './services/log.service';
import { Log } from './services/log.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'log-viewer';
  logs: Log[] = [];
  private logSubscription?: Subscription;
  private logInterval: any;
  private _toggleTimestamp: boolean = false;

  constructor(private logService: LogService) {}

  get toggleTimestamp(): boolean {
    return this._toggleTimestamp;
  }
  set toggleTimestamp(value: boolean) {
    this._toggleTimestamp = value;
  }

  ngOnInit() {
    this.fetchLogs();
    this.logInterval = setInterval(() => {
      this.fetchLogs();
    }, 5000); // 10000 ms = 10 secondes
  }

  ngOnDestroy() {
    if (this.logInterval) {
      clearInterval(this.logInterval);
    }
    if (this.logSubscription) {
      this.logSubscription.unsubscribe();
    }
  }

  private fetchLogs() {
    console.log('Fetching logs');
    this.logSubscription = this.logService.getLogs().subscribe({
      next: (logs: Log[]) => {
        this.logs = logs; // Si vous voulez remplacer les logs existants
        // ou utilisez `this.logs.push(...logs)` pour ajouter à la liste existante
        console.log(this.logs);
      },
      error: (err) => {
        console.error('Error fetching logs:', err);
      },
    });
  }
}
