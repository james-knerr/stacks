import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sliceArrayPipe',
    pure: false
})
export class SliceArrayPipe implements PipeTransform {
    transform(items: any[], slice: number, totalSlices: number): any {
        if (!items) {
            return items;
        }
        const itemsLength = items.length;
        const numberOfItemsToReturn = itemsLength / totalSlices;
        const startSlice = (numberOfItemsToReturn * slice) - numberOfItemsToReturn;
        return slice === totalSlices ? items.slice(startSlice) : items.slice(startSlice, startSlice + numberOfItemsToReturn);
    }
}
