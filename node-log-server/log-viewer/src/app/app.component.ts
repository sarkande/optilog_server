import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogsListComponent } from './components/logs-list/logs-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogsListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  title = 'log-viewer';
}
