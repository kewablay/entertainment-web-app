import { Component, Input } from '@angular/core';
import { Media } from '../../../core/models/app.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent {
  @Input() media!: Media;
}
