'use client';

import { useTheme } from './theme-provider';
import { Select } from './select';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <span className="sr-only">Select theme</span>
      <Select
        aria-label="Theme selection"
        value={theme}
        onChange={(event) => setTheme(event.target.value as typeof theme)}
        className="w-28"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </Select>
    </label>
  );
}
