import { useEffect, useState, useCallback } from "react";
import * as API from "../../api";
import { trackActivity } from "./activityTracker";

type ProgressMap = Record<string, string[]>;

// In-memory cache synced from DB
let cache: ProgressMap = {};
let loaded = new Set<string>();

const subscribers = new Set<() => void>();
const notify = () => subscribers.forEach((cb) => cb());

export function useRoadmapProgress(roadmapKey: string | null) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const cb = () => forceUpdate((n) => n + 1);
    subscribers.add(cb);
    return () => { subscribers.delete(cb); };
  }, []);

  // Fetch from DB on mount if logged in
  useEffect(() => {
    if (!roadmapKey || !API.isLoggedIn() || loaded.has(roadmapKey)) return;
    API.getRoadmapProgress(roadmapKey)
      .then((data: any) => {
        if (data?.completed_skills) {
          cache[roadmapKey] = data.completed_skills;
          loaded.add(roadmapKey);
          notify();
        }
      })
      .catch(() => {});
  }, [roadmapKey]);

  const completed: Set<string> = roadmapKey
    ? new Set(cache[roadmapKey] || [])
    : new Set();

  const toggle = useCallback(async (skillId: string) => {
    if (!roadmapKey) return;

    // Optimistic update
    const arr = new Set(cache[roadmapKey] || []);
    const wasCompleted = arr.has(skillId);
    if (wasCompleted) arr.delete(skillId);
    else arr.add(skillId);
    cache[roadmapKey] = Array.from(arr);
    notify();

    if (!wasCompleted) {
      trackActivity("roadmap_skill", `${roadmapKey}:${skillId}`);
    }

    if (API.isLoggedIn()) {
      try {
        await API.toggleSkill(roadmapKey, skillId);
      } catch {
        // rollback
        const rollback = new Set(cache[roadmapKey] || []);
        if (rollback.has(skillId)) rollback.delete(skillId);
        else rollback.add(skillId);
        cache[roadmapKey] = Array.from(rollback);
        notify();
      }
    }
  }, [roadmapKey]);

  const reset = useCallback(async () => {
    if (!roadmapKey) return;
    cache[roadmapKey] = [];
    loaded.delete(roadmapKey);
    notify();

    if (API.isLoggedIn()) {
      API.resetRoadmap(roadmapKey).catch(() => {});
    }
  }, [roadmapKey]);

  return { completed, toggle, reset };
}

export function getProgressPercent(roadmapKey: string, totalSkills: number): number {
  if (totalSkills === 0) return 0;
  const done = cache[roadmapKey]?.length || 0;
  return Math.round((done / totalSkills) * 100);
}

export function useProgressVersion() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const cb = () => setV((n) => n + 1);
    subscribers.add(cb);
    return () => { subscribers.delete(cb); };
  }, []);
  return v;
}
