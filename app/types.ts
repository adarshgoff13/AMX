export interface BrandConfig {
  name: string;
  slogan: string;
  accentColor: string; // Tailwind hex or class
  githubUrl: string;
  downloadVersion: string;
  baseOS: string;
  hasDynamicIsland: boolean;
  hasMacOSDock: boolean;
}

export interface WidgetData {
  id: string;
  title: string;
  type: 'clock' | 'weather' | 'notes' | 'calendar' | 'music' | 'system';
  size: 'small' | 'medium' | 'large';
  config: {
    titleText?: string;
    showSeconds?: boolean;
    locationText?: string;
    notesContent?: string;
    temperatureUnit?: 'C' | 'F';
    musicTrack?: string;
    musicArtist?: string;
    accentColor?: string;
  };
  author: string;
  stars: number;
}

export interface DeviceModel {
  id: string;
  manufacturer: string;
  modelName: string;
  codename: string;
  downloadUrl: string;
  stableVersion: string;
  recoveryMethod: 'fastboot' | 'recovery-zip' | 'sideload';
}

export interface LayoutPreset {
  id: string;
  name: string;
  description: string;
  author: string;
  widgets: WidgetData[];
  thumbnailColor: string;
  downloads: number;
  stars: number;
}
