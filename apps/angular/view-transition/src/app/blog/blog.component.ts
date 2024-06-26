import { ChangeDetectionStrategy, Component } from '@angular/core';
import { posts } from '../data';
import { CurrentPostService } from '../shared/services/currentPost.service';
import { ThumbnailComponent } from './thumbnail.component';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [ThumbnailComponent],
  template: `
    <div
      class="fixed left-0  right-0 top-0 z-50 flex h-20 items-center justify-center border-b-2 bg-white text-4xl shadow-md"
      [style.view-transition-name]="'header'">
      Blog List
    </div>
    <div class="my-20 flex h-screen flex-col items-center gap-10 border p-10">
      @for (post of posts; track post.id) {
        <blog-thumbnail [post]="post" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogComponent {
  posts = posts;

  constructor(public currentPostService: CurrentPostService) {}
}
