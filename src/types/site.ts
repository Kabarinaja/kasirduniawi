export interface SiteConfig {
  appName: string;
  domain: string;
  price: number;
  priceFormatted: string;
  accessPeriod: string;
  isPaidApp?: boolean;
  downloadDeliveryMethod?: string;
  whatsappNumber: string;
  whatsappInternational: string;
  email: string;
  creator: {
    name: string;
    role: string;
    badge: string;
    bio: string;
  };
  qrisReady: boolean;
  apkReady?: boolean;
  apkFilename?: string;
  apkPath?: string;
  merchantName: string;
}

export interface ScreenshotItem {
  id: number;
  filename: string;
  path: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface GuideTopic {
  id: string;
  number: string;
  title: string;
  summary: string;
  steps: string[];
  tips?: string[];
}
