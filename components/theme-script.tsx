export function ThemeScript() {
  const script = `(() => {
    try {
      const storageKey = 'bestlife-theme';
      const stored = window.localStorage.getItem(storageKey);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored ?? 'system';
      const resolved = theme === 'dark' || (theme === 'system' && prefersDark) ? 'dark' : 'light';
      const root = document.documentElement;
      root.classList.toggle('dark', resolved === 'dark');
      root.dataset.theme = resolved;
    } catch (error) {
      console.warn('Theme initialization failed', error);
    }
  })();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
