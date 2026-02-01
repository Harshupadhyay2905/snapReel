"use client";

/**
 * Theme Toggle Component
 * Button to switch between light and dark themes
 */

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Toggle theme">
        <div className="theme-toggle-icon">
          <Sun size={20} />
        </div>
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "system") {
      return <Monitor size={20} />;
    }
    return resolvedTheme === "dark" ? <Moon size={20} /> : <Sun size={20} />;
  };

  const getLabel = () => {
    if (theme === "system") return "System theme";
    return theme === "dark" ? "Dark mode" : "Light mode";
  };

  return (
    <button
      className={cn("theme-toggle", resolvedTheme === "dark" && "theme-toggle-dark")}
      onClick={cycleTheme}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <div className="theme-toggle-icon">{getIcon()}</div>
    </button>
  );
}
