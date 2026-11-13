export type ThemeColors = {
  primary: string;
  background: string;
};

export type PresetId =
  | "spider-verse"
  | "midnight-blue"
  | "emerald-dark"
  | "sunset-orange"
  | "clean-light"
  | "monochrome"
  | "custom";

export const presets: { id: PresetId; name: string; colors: ThemeColors }[] = [
  { id: "spider-verse", name: "Spider-Verse", colors: { primary: "#e11d2e", background: "#0a0a0a" } },
  { id: "midnight-blue", name: "Midnight Blue", colors: { primary: "#3b82f6", background: "#0b1224" } },
  { id: "emerald-dark", name: "Emerald Dark", colors: { primary: "#10b981", background: "#06140f" } },
  { id: "sunset-orange", name: "Sunset Orange", colors: { primary: "#f97316", background: "#1a0d07" } },
  { id: "clean-light", name: "Clean Light", colors: { primary: "#1d4ed8", background: "#fafafa" } },
  { id: "monochrome", name: "Monochrome", colors: { primary: "#f5f5f5", background: "#0a0a0a" } },
];

export const DEFAULT_PRESET_ID: PresetId = "spider-verse";

export function getPreset(id: PresetId): ThemeColors | undefined {
  return presets.find((preset) => preset.id === id)?.colors;
}

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex([r, g, b]: Rgb): string {
  return "#" + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("");
}

function mix(from: string, to: string, amount: number): string {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return rgbToHex([0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * amount) as Rgb);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as Rgb;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function readableOn(hex: string): string {
  return contrastRatio(hex, "#ffffff") >= contrastRatio(hex, "#0a0a0a") ? "#ffffff" : "#0a0a0a";
}

export function isValidHex(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function buildThemeVars({ primary, background }: ThemeColors): Record<string, string> {
  const foreground = readableOn(background);
  const [r, g, b] = hexToRgb(primary);
  return {
    "--primary": primary,
    "--primary-rgb": `${r} ${g} ${b}`,
    "--primary-fg": readableOn(primary),
    "--background": background,
    "--foreground": foreground,
    "--surface": mix(background, foreground, 0.05),
    "--surface-2": mix(background, foreground, 0.1),
    "--muted": mix(background, foreground, 0.66),
    "--border": mix(background, foreground, 0.16),
  };
}
