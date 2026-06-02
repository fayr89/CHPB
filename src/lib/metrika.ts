// Yandex.Metrika helper. The counter snippet itself lives in index.html;
// this module calls the global `ym` for SPA pageviews and goal tracking.
export const YM_ID = 109593176;

type YmFn = (id: number, action: string, ...args: unknown[]) => void;

function ym(action: string, ...args: unknown[]): void {
  const fn = (window as unknown as { ym?: YmFn }).ym;
  if (typeof fn === 'function') fn(YM_ID, action, ...args);
}

/** Pageview hit for SPA (client-side) route changes. */
export function trackPageview(url: string = window.location.href): void {
  ym('hit', url);
}

/** Reach a Metrika goal. Create a goal of type "JavaScript event" with this id. */
export function trackGoal(goal: string, params?: Record<string, unknown>): void {
  ym('reachGoal', goal, params);
}
