import { Pipe, PipeTransform } from '@angular/core';
import { Log } from '../interfaces/log';

@Pipe({
  name: 'filterLogs',
  standalone: true,
})
export class FilterLogsPipe implements PipeTransform {
  transform(logs: Log[], searchTerm: string): any[] {
    if (!logs || !searchTerm) {
      return logs;
    }
    return logs.filter((log) => {
      if (typeof log.message === 'string') {
        return log.message.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof log.message === 'object') {
        return JSON.stringify(log.message)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      return false;
    });
  }
}
