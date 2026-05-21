import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "skillpath-progress-v1";

type ProgressMap = Record<string, string[]>; // { frontend: ["html-css", "react"], ai: [...] }

function loadAll(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(map: ProgressMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

// global subscribers — чтобы все компоненты обновлялись синхронно
const subscribers = new Set<() => void>();
const notify = () => subscribers.forEach((cb) => cb());

export function useRoadmapProgress(roadmapKey: string | null) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const cb = () => forceUpdate((n) => n + 1);
    subscribers.add(cb);
    return () => { subscribers.delete(cb); };
  }, []);

  const completed: Set<string> = roadmapKey
    ? new Set(loadAll()[roadmapKey] || [])
    : new Set();

  const toggle = useCallback((skillId: string) => {
    if (!roadmapKey) return;
    const all = loadAll();
    const arr = new Set(all[roadmapKey] || []);
    if (arr.has(skillId)) arr.delete(skillId);
    else arr.add(skillId);
    all[roadmapKey] = Array.from(arr);
    saveAll(all);
    notify();
  }, [roadmapKey]);

  const reset = useCallback(() => {
    if (!roadmapKey) return;
    const all = loadAll();
    delete all[roadmapKey];
    saveAll(all);
    notify();
  }, [roadmapKey]);

  return { completed, toggle, reset };
}

// helper для карточек в сетке — считает % без подписки
export function getProgressPercent(roadmapKey: string, totalSkills: number): number {
  if (totalSkills === 0) return 0;
  const done = loadAll()[roadmapKey]?.length || 0;
  return Math.round((done / totalSkills) * 100);
}

// хук для подписки на изменения (для карточек)
export function useProgressVersion() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const cb = () => setV((n) => n + 1);
    subscribers.add(cb);
    return () => { subscribers.delete(cb); };
  }, []);
  return v;
}