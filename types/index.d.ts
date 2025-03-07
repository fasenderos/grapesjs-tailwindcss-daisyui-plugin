export {};

declare global {
  interface Window {
    tailwind: Record<string, unknown>; // or specify the exact type if known
  }
}
