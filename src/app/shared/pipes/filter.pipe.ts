import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}


// // filter.pipe.ts
// import { Pipe, PipeTransform } from '@angular/core';
// import { Content } from '../core/models/content.model';

// @Pipe({
//   name: 'filter',
//   pure: true
// })
// export class FilterPipe implements PipeTransform {
//   transform(contents: Content[], searchTerm: string): Content[] {
//     if (!contents || !searchTerm) {
//       return contents;
//     }
//     return contents.filter(content =>
//       content.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }
// }