import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'randomizeOrderPipe',
    pure: false
})
export class RandomizeOrderPipe implements PipeTransform {
    transform(items: any[]): any {
        if (!items) {
            return items;
        }
        return this.shuffleInPlace(items);
    }
     shuffleInPlace<T>(array: T[]): T[] {
        // For each index in array
        for (let i = 0; i < array.length; i++) {
          // choose a random not-yet-placed item to place there
          // must be an item AFTER the current item, because the stuff
          // before has all already been placed
          const randomChoiceIndex = this.getRandom(i, array.length - 1);
          // place our random choice in the spot by swapping
          [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
        }
        return array;
      }
      getRandom(floor: number, ceiling: number) {
        return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
    }
}
