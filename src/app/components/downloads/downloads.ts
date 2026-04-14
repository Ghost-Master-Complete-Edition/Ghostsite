import { Component, OnInit } from '@angular/core';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import {
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { YouTubePlayer } from '@angular/youtube-player';
import { DOWNLOAD_TYPES, DropdownItem } from '../../../types/types';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StrapiService } from '../../services/strapiservice';

@Component({
  selector: 'app-downloads',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopup,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
    YouTubePlayer,
    MatCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './downloads.html',
  styleUrl: './downloads.scss',
})

export class Downloads implements OnInit {
  constructor(private strapiService: StrapiService) { };

  videoId = 'totvGN4owj4'; //Change this to display another video, example: https://www.youtube.com/watch?v=totvGN4owj4  

  DOWNLOAD_TYPES = DOWNLOAD_TYPES;

  modVersions: DropdownItem[] = [];
  bspVersions: DropdownItem[] = [];
  soundtracks: DropdownItem[] = [];

  selectedMod = signal<DropdownItem>({ displayName: "Select Version", downloadLink: "", downloadInstallerLink: "" });
  selectedBsp = signal<DropdownItem>({ displayName: "Select Version", downloadLink: "", downloadInstallerLink: "" });
  selectedSoundtrack = signal<DropdownItem>({ displayName: "Select Soundtrack", downloadLink: "", downloadInstallerLink: "" });

  includeInstaller: boolean = true;

  /*   ngOnInit(): void {
      this.modVersions = [
        {
          displayName: '5.0.7 - Trainspooking',
          downloadName: 'GMCE_5.0.7.zip'
        },
        {
          displayName: '4.0.2 - Achievements',
          downloadName: 'GMCE_4.0.2.zip',
        },
        {
          displayName: '3.0.2 - Chronicler',
          downloadName: 'GMCE_3.0.2.zip',
        },
      ];
  
      this.bspVersions = [
        {
          displayName: '4.2.0 - xxxx',
          downloadName: 'GMCE_4.2.0 - xxxx',
        },
        {
          displayName: '3.1.0 - xxxx',
          downloadName: 'GMCE_3.1.0 - xxxx',
        },
        {
          displayName: '2.4.0 - xxxx',
          downloadName: 'GMCE_2.4.0 - xxxx',
        },
        {
          displayName: '1.5.0 - xxxx',
          downloadName: 'GMCE_1.5.0 - xxxx',
        },
      ];
  
      this.soundtracks = [
        {
          displayName: 'track1',
          downloadName: 'GMCE_track1',
        },
        {
          displayName: 'track2',
          downloadName: 'GMCE_track2',
        },
        {
          displayName: 'track3',
          downloadName: 'GMCE_track3',
        },
        {
          displayName: 'track4',
          downloadName: 'GMCE_track4',
        },
        {
          displayName: 'track5',
          downloadName: 'GMCE_track5',
        },
      ];
    } */

  contentItems: any[] = []; //Data for posts gets read from here

  ngOnInit(): void {
    this.strapiService.getContentType('downloads').subscribe(
      (response) => {
        this.contentItems = response.data;
      },
      (error) => {
        console.error('Error fetching content:', error);
      }
    );
    this.contentItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    for (let item of this.contentItems) {
      switch (item.Download_Type) {
        case "Mod":
          this.modVersions.push(<DropdownItem>{ displayName: item.File_Name, downloadLink: item.Download_Link, downloadInstallerLink: item.Download_Link_Installer });
          break;
        case "BSP":
          this.bspVersions.push(<DropdownItem>{ displayName: item.File_Name, downloadLink: item.Download_Link, downloadInstallerLink: "" });
          break;
        case "Soundtrack":
          this.soundtracks.push(<DropdownItem>{ displayName: item.File_Name, downloadLink: item.Download_Link, downloadInstallerLink: "" });
          break;
      }
    }
  }

  onIncludeInstallerChanged(event: any) {
    this.includeInstaller = event.checked;
  }

  onValueChanged(event: DropdownItem[], dropdown: DOWNLOAD_TYPES) {
    switch (dropdown) {
      case DOWNLOAD_TYPES.MOD:
        return this.selectedMod.set(event[0]);

      case DOWNLOAD_TYPES.BSP:
        return this.selectedBsp.set(event[0]);

      case DOWNLOAD_TYPES.TRACK:
        return this.selectedSoundtrack.set(event[0]);

      default:
        alert(`Unspecified ${dropdown} selected!`);
    }
  }

  downloadFile(buttonType: DOWNLOAD_TYPES) {
    let url = "";
/*     let filename = "";
 */
    switch (buttonType) {
      case DOWNLOAD_TYPES.MOD:
        if (this.includeInstaller == false)
        url = this.selectedMod().downloadLink;
        else
        url = this.selectedMod().downloadInstallerLink;
        break;

      case DOWNLOAD_TYPES.BSP:
        url = this.selectedBsp().downloadLink;
        break;

      case DOWNLOAD_TYPES.TRACK:
        url = this.selectedSoundtrack().downloadLink;
        break;

      default:
        alert(`Unspecified button!`);
        return;
    }

    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    /*link.setAttribute('download', filename); We get the file name from the download link*/
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
