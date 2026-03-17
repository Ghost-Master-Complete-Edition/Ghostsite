import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, TwitterIcon, YoutubeIcon } from "lucide-angular";

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Header {
      readonly YoutubeIcon = YoutubeIcon;
      readonly TwitterIcon = TwitterIcon;
}
