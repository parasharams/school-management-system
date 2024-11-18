import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'directionFilter'
})
export class DirectionFilterPipe implements PipeTransform {

  transform(items: any[], direction?: string): any {
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if (direction === 'odd')
      return items.filter((item, index) => item.id % 2 !== 0);
    else
      return items.filter((item, index) => item.id % 2 === 0);
  }

}

