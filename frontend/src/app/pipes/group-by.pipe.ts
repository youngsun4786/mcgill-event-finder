// group-by.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
  standalone: true,
})
export class GroupByPipe implements PipeTransform {
  transform(collection: any[], property: string): Map<any, any[]> {
    if (!collection || !property) {
      return new Map();
    }

    const groupedMap = new Map();

    collection.forEach((item) => {
      const key = item[property];
      if (!groupedMap.has(key)) {
        groupedMap.set(key, []);
      }

      groupedMap.get(key).push(item);
    });

    return groupedMap;
  }
}
