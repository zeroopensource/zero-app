export {};

interface ElectronApi {
  isElectron: boolean;
  electronPlatform: string | null | undefined;
  electronVersion: string | null | undefined;
}

declare global {
  interface Window {
    electronApi?: ElectronApi;
  }
}
