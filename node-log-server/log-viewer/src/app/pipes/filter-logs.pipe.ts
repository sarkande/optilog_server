import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLogs',
  standalone: true,
})
export class FilterLogsPipe implements PipeTransform {
  transform(logs: any[], searchTerm: string): any[] {
    if (!logs || !searchTerm) {
      return logs;
    }
    return logs.filter((log) =>
      log.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
