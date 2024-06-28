import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogComponent } from '../log/log.component';
import { Log } from '../../interfaces/log';
import { FilterLogsPipe } from '../../pipes/filter-logs.pipe';

@Component({
  selector: 'app-logs-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LogComponent, FilterLogsPipe],
  templateUrl: './logs-list.component.html',
  styleUrl: './logs-list.component.scss',
})
export class LogsListComponent implements OnInit, OnDestroy {
  logs: Log[] = [];

  private logSubscription?: Subscription;
  private logInterval: any;
  private _toggleTimestamp: boolean = false;
  private _searchTerm: string = '';

  constructor(private logService: LogService) {}

  get toggleTimestamp(): boolean {
    return this._toggleTimestamp;
  }
  set toggleTimestamp(value: boolean) {
    this._toggleTimestamp = value;
  }

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
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
  clearLogs() {
    this.logService.clearLogs().subscribe({
      next: () => {
        this.logs = [];
      },
      error: (err) => {
        console.error('Error clearing logs:', err);
      },
    });
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
