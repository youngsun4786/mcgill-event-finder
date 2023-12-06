import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upcomingPipe',
  pure: false, 
  standalone: true,
})
export class upcomingPipe implements PipeTransform {
    transform(items: any[]): any[] {
        if (!items) return [];
    
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const nextMonth = (currentMonth + 1) % 12; // Get the next month, considering it may go beyond December
    
        const groupedEvents = items.reduce((groups, item) => {
          const startDate = new Date(item.startDate);
          const eventMonth = startDate.getMonth();
    
          if (eventMonth === currentMonth || eventMonth === nextMonth) {
            const groupKey = eventMonth === currentMonth ? 'currentMonth' : 'nextMonth';
    
            if (!groups[groupKey]) {
              groups[groupKey] = {
                month: startDate.getMonth(),
                year: startDate.getFullYear(),
                events: [],
              };
            }
    
            groups[groupKey].events.push(item);
          }
    
          return groups;
        }, {});
    
        return Object.values(groupedEvents);
      }
}
