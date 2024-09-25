import { Pipe, PipeTransform } from '@angular/core';
import { Media } from '../../core/models/app.model';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(media: Media[], searchTerm: string): Media[] {
    if (!media || !searchTerm) {
      return media;
    }
    return media.filter((content) =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
