import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'deleteFilter',
    pure: false
})
export class DeleteFilterPipe implements PipeTransform {
    transform(items: any[]): any {
        if (!items) {
            return items;
        }
        return items.filter(item => item.isDeleted === false);
    }
}
