export enum DOWNLOAD_TYPES {
  MOD,
  BSP,
  TRACK,
}

export type DropdownItem = {
  displayName: string;
  downloadLink: string;
  downloadInstallerLink: string;
}