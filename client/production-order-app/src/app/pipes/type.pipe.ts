import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'type'})
export class TypePipe implements PipeTransform {
  transform(type: string): string {
    switch (type) {
      case 'LIGHT': {
        return 'LAMP';
      }
      case 'SWITCHER': {
        return 'SWITCH';
      }
      case 'HOUSING': {
        return 'CASE';
      }
      default: {
        return type;
      }
    }
  }
}
