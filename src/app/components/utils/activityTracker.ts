const ACTIVITY_KEY = "skillpath_activity";

export type ActivityEvent = {
  type: "lesson" | "roadmap_skill" | "quiz" | "booking";
  date: string;
  detail?: string;
};

export const trackActivity = (type: ActivityEvent["type"], detail?: string) => {
  try {
    const events: ActivityEvent[] = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || "[]");
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    events.push({ type, date, detail });
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(events));
  } catch {}
};

export const getActivityEvents = (): ActivityEvent[] => {
  try {
    return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || "[]");
  } catch {
    return [];
  }
};
