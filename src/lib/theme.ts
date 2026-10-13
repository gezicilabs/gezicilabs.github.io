// Day/night theme.
// - No saved choice ("auto"): night between 19:00 and 07:00 on the visitor's clock,
//   re-checked every minute while the page is open.
// - Toggle button: saves the visitor's choice, which then always wins.
// - "Auto" button: forgets the saved choice and goes back to the clock.
// The same rules run inline in <head> (Base.astro) to avoid a flash on load.

const KEY = 'gezici-theme';
type Choice = 'light' | 'dark';

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

function writeChoice(v: Choice | null) {
  try {
    if (v) localStorage.setItem(KEY, v);
    else localStorage.removeItem(KEY);
  } catch {
    /* storage unavailable: choice lasts for this page view only */
  }
}

function isNight(): boolean {
  const h = new Date().getHours();
  return h >= 19 || h < 7;
}

let sessionChoice: Choice | null = null;

function apply() {
  const choice = readChoice() ?? sessionChoice;
  const dark = choice ? choice === 'dark' : isNight();
  const root = document.documentElement;
  root.dataset.theme = dark ? 'dark' : 'light';
  root.dataset.themeMode = choice ? 'manual' : 'auto';
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', (dark ? btn.dataset.labelLight : btn.dataset.labelDark) ?? '');
  });
}

export function initThemeControls() {
  apply();
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const next: Choice = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      sessionChoice = next;
      writeChoice(next);
      apply();
    }),
  );
  document.querySelectorAll('[data-theme-auto]').forEach((btn) =>
    btn.addEventListener('click', () => {
      sessionChoice = null;
      writeChoice(null);
      apply();
    }),
  );
  setInterval(apply, 60_000);
}
