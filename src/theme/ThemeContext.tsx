import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  DEFAULT_PRESET_ID,
  buildThemeVars,
  getPreset,
  isValidHex,
  presets,
  type PresetId,
  type ThemeColors,
} from "./palette";

const STORAGE_KEY = "rachit-portfolio-theme";
const DEFAULT_COLORS = presets[0].colors;

type ThemeState = {
  presetId: PresetId;
  colors: ThemeColors;
};

type ThemeContextValue = ThemeState & {
  selectPreset: (id: PresetId) => void;
  setPrimary: (color: string) => void;
  setBackground: (color: string) => void;
  reset: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isPresetId(value: unknown): value is PresetId {
  return typeof value === "string" && (value === "custom" || presets.some((p) => p.id === value));
}

function loadState(): ThemeState {
  const fallback: ThemeState = { presetId: DEFAULT_PRESET_ID, colors: DEFAULT_COLORS };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return fallback;
    const { presetId, colors } = parsed as Record<string, unknown>;
    const candidate = colors as Partial<ThemeColors> | undefined;
    if (!isPresetId(presetId) || !candidate || !isValidHex(candidate.primary ?? "") || !isValidHex(candidate.background ?? "")) {
      return fallback;
    }
    return { presetId, colors: { primary: candidate.primary!, background: candidate.background! } };
  } catch {
    return fallback;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>(loadState);
  const hasMounted = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const vars = buildThemeVars(state.colors);
    Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value));

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    root.classList.add("theme-animating");
    const timer = window.setTimeout(() => root.classList.remove("theme-animating"), 700);
    return () => window.clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this session.
    }
  }, [state]);

  const selectPreset = useCallback((id: PresetId) => {
    if (id === "custom") {
      setState((prev) => ({ ...prev, presetId: "custom" }));
      return;
    }
    const colors = getPreset(id);
    if (colors) setState({ presetId: id, colors });
  }, []);

  const setPrimary = useCallback((color: string) => {
    setState((prev) => ({ presetId: "custom", colors: { ...prev.colors, primary: color } }));
  }, []);

  const setBackground = useCallback((color: string) => {
    setState((prev) => ({ presetId: "custom", colors: { ...prev.colors, background: color } }));
  }, []);

  const reset = useCallback(() => selectPreset(DEFAULT_PRESET_ID), [selectPreset]);

  const value = useMemo<ThemeContextValue>(
    () => ({ ...state, selectPreset, setPrimary, setBackground, reset }),
    [state, selectPreset, setPrimary, setBackground, reset],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
