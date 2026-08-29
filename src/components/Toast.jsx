import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { animate } from "animejs";
import { prefersReducedMotion } from "../lib/animeMotion";

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, tone = "default") => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 2800);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[400] flex flex-col items-center gap-2 px-4">
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onDone={() => dismiss(toast.id)} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDone }) {
  return (
    <div
      ref={(node) => {
        if (!node || prefersReducedMotion()) return;
        animate(node, {
          opacity: [0, 1],
          y: [12, 0],
          ease: "outExpo",
          duration: 420,
        });
      }}
      className={`pointer-events-auto border px-4 py-3 font-mono-tech text-[11px] tracking-[0.14em] uppercase shadow-lg ${
        toast.tone === "accent"
          ? "border-accent bg-accent text-[#f7f8fa]"
          : "border-[var(--color-border-strong)] bg-ink text-cream"
      }`}
      role="status"
    >
      <button type="button" onClick={onDone} className="text-left">
        {toast.message}
      </button>
    </div>
  );
}

export async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}
