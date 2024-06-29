import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogsListComponent } from './components/logs-list/logs-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogsListComponent, NgbModule, NgxJsonViewerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  title = 'log-viewer';
}
