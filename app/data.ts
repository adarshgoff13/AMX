import { BrandConfig, DeviceModel, LayoutPreset, WidgetData } from './types';

export const INITIAL_BRAND_CONFIG: BrandConfig = {
  name: 'AMX OS',
  slogan: 'The Elegant glass-reskin OS for Android',
  accentColor: '#3b82f6',
  githubUrl: 'https://github.com/adarshgoff13/AMX',
  downloadVersion: 'v2.1.0-stable',
  baseOS: 'Android 14 (AOSP)',
  hasDynamicIsland: true,
  hasMacOSDock: true,
};

export const ALTERNATIVE_BRANDS: Array<Partial<BrandConfig> & { id: string; label: string }> = [
  {
    id: 'amx',
    label: 'AMX OS (Core macOS Glass)',
    name: 'AMX OS',
    slogan: 'The Elegant glass-reskin OS for Android',
    accentColor: '#3b82f6',
    githubUrl: 'https://github.com/adarshgoff13/AMX',
    downloadVersion: 'v2.1.0-stable',
    baseOS: 'Android 14 (AOSP)',
    hasDynamicIsland: true,
    hasMacOSDock: true,
  },
  {
    id: 'neon',
    label: 'AMX Cyber (Neon Tech-Sleek)',
    name: 'AMX Cyber',
    slogan: 'High-performance cyberpunk reskin',
    accentColor: '#ec4899',
    githubUrl: 'https://github.com/adarshgoff13/AMX',
    downloadVersion: 'v2.2.5-beta',
    baseOS: 'Android 14 (LineageOS)',
    hasDynamicIsland: true,
    hasMacOSDock: false,
  },
  {
    id: 'minimal',
    label: 'AMX Ivory (Warm Minimalist)',
    name: 'AMX Ivory',
    slogan: 'Serene & simple, gentle warm space reskin',
    accentColor: '#10b981',
    githubUrl: 'https://github.com/adarshgoff13/AMX',
    downloadVersion: 'v1.0.8-stable',
    baseOS: 'Android 13 (Pixel Experience)',
    hasDynamicIsland: false,
    hasMacOSDock: true,
  }
];

export const DEVICE_MODELS: DeviceModel[] = [
  {
    id: 'pixel9',
    manufacturer: 'Google',
    modelName: 'Pixel 9 / 9 Pro / 9 Pro XL',
    codename: 'caiman/komodo',
    downloadUrl: 'https://releases.amx.dev/downloads/amx-2.1.0-caiman.zip',
    stableVersion: 'v2.1.0 Stable',
    recoveryMethod: 'fastboot'
  },
  {
    id: 'pixel8',
    manufacturer: 'Google',
    modelName: 'Pixel 8 / 8 Pro',
    codename: 'shiba/husky',
    downloadUrl: 'https://releases.amx.dev/downloads/amx-2.1.0-husky.zip',
    stableVersion: 'v2.1.0 Stable',
    recoveryMethod: 'fastboot'
  },
  {
    id: 'pixel7',
    manufacturer: 'Google',
    modelName: 'Pixel 7 / 7 Pro',
    codename: 'panther/cheetah',
    downloadUrl: 'https://releases.amx.dev/downloads/amx-2.1.0-panther.zip',
    stableVersion: 'v2.1.0 Stable',
    recoveryMethod: 'fastboot'
  },
  {
    id: 'op12',
    manufacturer: 'OnePlus',
    modelName: 'OnePlus 12',
    codename: 'jeep',
    downloadUrl: 'https://releases.amx.dev/downloads/amx-2.1.0-jeep.zip',
    stableVersion: 'v2.1.0 Stable',
    recoveryMethod: 'recovery-zip'
  },
  {
    id: 'op11',
    manufacturer: 'OnePlus',
    modelName: 'OnePlus 11',
    codename: 'salami',
    downloadUrl: 'https://releases.amx.dev/downloads/amx-2.0.8-salami.zip',
    stableVersion: 'v2.0.8 Stable',
    recoveryMethod: 'recovery-zip'
  },
  {
    id: 'poco-f5',
    manufacturer: 'Xiaomi / Poco',
    modelName: 'Poco F5',
    codename: 'marble',
    downloadUrl: 'https://releases.amx.dev/downloads/amx-2.1.0-marble.zip',
    stableVersion: 'v2.1.0 Stable',
    recoveryMethod: 'sideload'
  },
  {
    id: 's24u',
    manufacturer: 'Samsung',
    modelName: 'Galaxy S24 Ultra (Unlocked Snapdragon)',
    codename: 'eureka',
    downloadUrl: 'https://releases.amx.dev/downloads/amx-2.0.5-eureka.zip',
    stableVersion: 'v2.0.5 Port',
    recoveryMethod: 'sideload'
  },
];

export const INITIAL_WIDGETS: WidgetData[] = [
  {
    id: 'widget-island',
    title: 'Dynamic Island Hub',
    type: 'system',
    size: 'medium',
    config: {
      titleText: 'AMX Dynamic Island',
      showSeconds: false,
      accentColor: '#3b82f6',
    },
    author: 'Official AMX Team',
    stars: 1420
  },
  {
    id: 'widget-clock',
    title: 'macOS Simple Time',
    type: 'clock',
    size: 'small',
    config: {
      titleText: 'Cupertino Time',
      showSeconds: true,
    },
    author: 'SteveReskins',
    stars: 849
  },
  {
    id: 'widget-music',
    title: 'Glossy Audio Player',
    type: 'music',
    size: 'medium',
    config: {
      musicTrack: 'Stargazing',
      musicArtist: 'Astropilot',
    },
    author: 'VinylLover',
    stars: 1124
  },
  {
    id: 'widget-weather',
    title: 'Frosty Weather Info',
    type: 'weather',
    size: 'small',
    config: {
      locationText: 'San Francisco, CA',
      temperatureUnit: 'F',
    },
    author: 'WeatherMan',
    stars: 521
  },
  {
    id: 'widget-notes',
    title: 'Quick Scratch Pad',
    type: 'notes',
    size: 'medium',
    config: {
      notesContent: 'Write code. Customize. Reskin Android. Upload layout to community. Profit!',
    },
    author: 'DevUser',
    stars: 310
  }
];

export const PRESET_LAYOUTS: LayoutPreset[] = [
  {
    id: 'preset-classic',
    name: 'macOS Classic Workspace',
    description: 'Perfect replica of a classic macOS desktop with standard dock widgets, quick weather, and a center interactive clock.',
    author: 'AMX Design Team',
    thumbnailColor: 'bg-gradient-to-br from-blue-900 to-indigo-950',
    downloads: 4890,
    stars: 450,
    widgets: [
      {
        id: 'cl-1',
        title: 'macOS Simple Time',
        type: 'clock',
        size: 'small',
        config: { showSeconds: true },
        author: 'AMX',
        stars: 450
      },
      {
        id: 'cl-2',
        title: 'Frosty Weather Info',
        type: 'weather',
        size: 'small',
        config: { locationText: 'Cupertino' },
        author: 'AMX',
        stars: 232
      },
      {
        id: 'cl-3',
        title: 'Glossy Audio Player',
        type: 'music',
        size: 'medium',
        config: { musicTrack: 'Infinite Waves', musicArtist: 'Satie Room' },
        author: 'AMX',
        stars: 312
      }
    ]
  },
  {
    id: 'preset-minimal',
    name: 'Minimal Warm Slate',
    description: 'A clean, typography-led warm ivory environment highlighting simplicity, focusing on a notes helper and a system dashboard.',
    author: 'DieterRamsFan',
    thumbnailColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
    downloads: 3120,
    stars: 289,
    widgets: [
      {
        id: 'min-1',
        title: 'Quick Scratch Pad',
        type: 'notes',
        size: 'medium',
        config: { notesContent: 'Simplicity is final achievement.' },
        author: 'DieterRams',
        stars: 212
      },
      {
        id: 'min-2',
        title: 'macOS Simple Time',
        type: 'clock',
        size: 'small',
        config: { showSeconds: false },
        author: 'DieterRams',
        stars: 94
      }
    ]
  },
  {
    id: 'preset-cyber',
    name: 'Neon Cyber Deck',
    description: 'Brushed dark steel backing, vibrant pink glow accents, and performance terminal widget layouts.',
    author: 'MatrixReskin',
    thumbnailColor: 'bg-gradient-to-br from-purple-950 to-pink-900',
    downloads: 2450,
    stars: 320,
    widgets: [
      {
        id: 'cy-1',
        title: 'Liquid Status MonitorText',
        type: 'system',
        size: 'medium',
        config: { titleText: 'Cyber Controller', accentColor: '#ec4899' },
        author: 'Matrix',
        stars: 120
      },
      {
        id: 'cy-2',
        title: 'Glossy Audio Player',
        type: 'music',
        size: 'medium',
        config: { musicTrack: 'Vapor Rave', musicArtist: 'Subway Cyber' },
        author: 'Matrix',
        stars: 140
      }
    ]
  }
];

export const DEVELOPER_CODE_SNIPPETS = {
  widgetStructure: `{
  "id": "my-custom-slider",
  "title": "Hardware Volume Hud",
  "version": "1.0.0",
  "size": "small",
  "components": [
    {
      "type": "blur-panel",
      "glossFactor": 0.8,
      "radius": "16px"
    },
    {
      "type": "slider",
      "bindState": "system.volume",
      "icon": "volume-2"
    }
  ]
}`,
  layoutSchema: `{
  "presetName": "macOS Pro Desk",
  "grid": { "cols": 4, "rows": "auto" },
  "theme": "glass-dark",
  "widgets": [
    {
      "widgetId": "clock-small-v1",
      "position": { "x": 0, "y": 0, "w": 1, "h": 1 }
    },
    {
      "widgetId": "island-hub",
      "position": { "x": 1, "y": 0, "w": 2, "h": 1 }
    }
  ]
}`,
  sdkUsage: `import { AMXWidgetSDK } from "@amx/widget-sdk";

export default function VolumeWidget() {
  const [level, setLevel] = AMXWidgetSDK.useProperty("system.volume");
  
  return (
    <div className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
      <div className="flex items-center gap-3">
        <Icon name="volume-2" className="text-blue-400" />
        <span className="text-white font-mono">{level}%</span>
      </div>
    </div>
  );
}`
};
