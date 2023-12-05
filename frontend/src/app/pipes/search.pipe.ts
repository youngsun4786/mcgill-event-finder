import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'http';

@Pipe({
  name: 'search',
  standalone: true,
  pure: false
})
export class SearchPipe implements PipeTransform {

  // search is the string to search for
  // fields is an array of strings that are the fields to search in
  // filters is an object where the keys are the fields to filter by and the values are the values to filter by
  transform(items: any[], search: string, fields: string[], filters: {[field: string]: string[]} = {}): any[] {
    if (!items) return [];
    if (!search && Object.keys(filters).length === 0) return items;
    return this.searchItems(items, search.toLowerCase(), fields, filters);
  }

  private searchItems(items: any[], search: string, fields: string[], filters: {[field: string]: string[]} = {}): any[] {
    return items.filter((item) =>
      fields.some((field) =>
        this.checkNestedField(item, field.split('.'), search)
      )
    ).filter((item) =>
      Object.entries(filters).every(([field, values]) =>
        this.checkFilterNestedField(item, field.split('.'), values)
        // values.includes(item[field])  // checks every value and field to see if the item includes at least one of them at that field
      )
    )
  }

  // checks if the item has the search string in the field
  // in the case that the field is nested, the fieldParts array is used to access the nested field
  // it should also check if the field is an array and if so, check if the search string is in any of the items in the array
  private checkNestedField(item: any, fieldParts: string[], search: string): boolean {
    const nestedField = this.getNestedField(item, fieldParts);
    // handle case where nestedField is undefined
    if (!nestedField) return false;

    if (Array.isArray(nestedField)) {
      // handle array case
      return nestedField.some((element) => element.toString().toLowerCase().includes(search));
    }
    // handle object case
    return nestedField.toString().toLowerCase().includes(search);
  }

  private checkFilterNestedField(item: any, fieldParts: string[], values: string[]): boolean {
    const nestedField = this.getNestedField(item, fieldParts);
    // handle case where nestedField is undefined
    if (!nestedField) return false;

    if (Array.isArray(nestedField)) {
      // handle array case
      return nestedField.some((element) => values.includes(element.toString()));
    }
    // handle object case
    return values.includes(nestedField.toString());
  }

  private getNestedField(item: any, fieldParts: string[]): any {
    return fieldParts.reduce((obj, key) => {
      if (Array.isArray(obj)) {
        // handle array case
        return obj.reduce((acc, element) => acc.concat(element?.[key]), []);
      } else {
        // handle object case
        return obj?.[key];
      }
     }, item)
  }
}
