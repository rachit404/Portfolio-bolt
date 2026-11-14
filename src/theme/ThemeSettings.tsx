import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, RotateCcw, Settings, X } from "lucide-react";
import { presets, type PresetId } from "./palette";
import { useTheme } from "./ThemeContext";

export function ThemeSettings() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open theme settings"
        aria-expanded={open}
        aria-controls={panelId}
        whileHover={{ rotate: 45, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-3 right-3 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-fg shadow-lg backdrop-blur-md transition-colors hover:border-primary hover:text-primary sm:top-4 sm:right-4"
      >
        <Settings size={20} aria-hidden="true" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="theme-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.aside
              key="theme-panel"
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-label="Theme settings"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-sm flex-col border-l border-border bg-bg text-fg shadow-2xl"
            >
              <PanelContent closeRef={closeRef} onClose={close} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function PanelContent({
  closeRef,
  onClose,
}: {
  closeRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
}) {
  const { presetId, colors, selectPreset, setPrimary, setBackground, reset } = useTheme();

  return (
    <>
      <header className="flex items-center justify-between border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <Palette size={20} className="text-primary" aria-hidden="true" />
          <h2 className="font-display text-lg">Theme</h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close theme settings"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </header>

      <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
        <section aria-labelledby="preset-heading" className="space-y-3">
          <h3 id="preset-heading" className="text-xs font-bold uppercase tracking-widest text-muted">
            Presets
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {presets.map((preset) => (
              <PresetButton
                key={preset.id}
                name={preset.name}
                primary={preset.colors.primary}
                background={preset.colors.background}
                active={presetId === preset.id}
                onClick={() => selectPreset(preset.id as PresetId)}
              />
            ))}
            <button
              type="button"
              onClick={() => selectPreset("custom")}
              aria-pressed={presetId === "custom"}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm font-medium transition-all hover:border-primary ${
                presetId === "custom" ? "border-primary bg-surface-2 shadow-[0_0_20px_rgb(var(--primary-rgb)/0.25)]" : "border-border bg-surface"
              }`}
            >
              <span
                className="h-6 w-6 rounded-full border border-border"
                style={{ background: "conic-gradient(#f43f5e, #f59e0b, #22c55e, #3b82f6, #a855f7, #f43f5e)" }}
                aria-hidden="true"
              />
              Custom
            </button>
          </div>
        </section>

        <section aria-labelledby="custom-heading" className="space-y-4">
          <h3 id="custom-heading" className="text-xs font-bold uppercase tracking-widest text-muted">
            Custom colors
          </h3>
          <ColorField label="Primary" value={colors.primary} onChange={setPrimary} />
          <ColorField label="Background / Secondary" value={colors.background} onChange={setBackground} />
        </section>

        <button
          type="button"
          onClick={reset}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Reset to default
        </button>
      </div>
    </>
  );
}

function PresetButton({
  name,
  primary,
  background,
  active,
  onClick,
}: {
  name: string;
  primary: string;
  background: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary ${
        active ? "border-primary shadow-[0_0_20px_rgb(var(--primary-rgb)/0.25)]" : "border-border"
      }`}
      style={{ background }}
    >
      <span className="mb-2 flex gap-1.5" aria-hidden="true">
        <span className="h-4 w-4 rounded-full" style={{ background: primary }} />
        <span className="h-4 w-4 rounded-full border border-white/20" style={{ background }} />
      </span>
      <span className="block text-sm font-medium" style={{ color: readableText(background) }}>
        {name}
      </span>
    </button>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (color: string) => void }) {
  const inputId = useId();
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-3">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
        <span className="block font-mono text-xs text-muted">{value.toUpperCase()}</span>
      </label>
      <input
        id={inputId}
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-14 cursor-pointer rounded-lg border border-border bg-transparent p-1"
      />
    </div>
  );
}

function readableText(background: string): string {
  const num = parseInt(background.replace("#", ""), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? "#0a0a0a" : "#ffffff";
}
