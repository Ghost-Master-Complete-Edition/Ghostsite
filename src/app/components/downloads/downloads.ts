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
import { DownloadsService } from '../../services/downloads';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
  constructor(private downloadService: DownloadsService) { };
  videoId = 'totvGN4owj4'; //Change this to display another video, example: https://www.youtube.com/watch?v=totvGN4owj4  

  DOWNLOAD_TYPES = DOWNLOAD_TYPES;
  
  modVersions: DropdownItem[] = [];
  bspVersions: DropdownItem[] = [];
  soundtracks: DropdownItem[] = [];

  selectedMod = signal<DropdownItem>({displayName: "Select Version", downloadName: ""});
  selectedBsp = signal<DropdownItem>({displayName: "Select Version", downloadName: ""});
  selectedSoundtrack = signal<DropdownItem>({displayName: "Select Soundtrack", downloadName: ""});
  
  includeInstaller: boolean = true;

  ngOnInit(): void {
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
  }

  onIncludeInstallerChanged(event: any){
    this.includeInstaller = event.checked;
  }

  onValueChanged(event: DropdownItem[], dropdown: DOWNLOAD_TYPES) {
    console.log(event);

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
    //need to check again how we handle it when we are hosting it
    let url = "";
    let filename = "";
    if (buttonType == DOWNLOAD_TYPES.MOD) {
      if(this.includeInstaller){
        url = `Installer_${this.selectedMod().downloadName}`;
      }
      else{
        url = this.selectedMod().downloadName;
      }
    } else if (buttonType == DOWNLOAD_TYPES.BSP) {
      url = this.selectedBsp().downloadName;
    } else if (buttonType == DOWNLOAD_TYPES.TRACK) {
      url = this.selectedSoundtrack().downloadName;
    } else {
      alert(`Unspecified button!`);
      return;
    }

    this.downloadService.downloadFile(url).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = url; //here should be the file name
      a.click();
      URL.revokeObjectURL(objectUrl);
    }
      , error => { alert(`Download failed. Reason: ${error.message}`) });
  }
}
