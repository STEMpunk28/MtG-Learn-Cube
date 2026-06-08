import { createContext, useContext, useState } from "react";
import cardData from "../data/CardData.json";
import type { ReactNode } from "react";

export interface Lesson {
  id: number;
  img: string;
  title: string;
  text: string;
  mana_cost: string;
  type_line: string;
  es_title: string;
  es_text: string;
}

interface SavedLessonsContextType {
  savedLessons: Lesson[];
  saveLesson: (lesson: Lesson) => void;
  removeLesson: (id: number) => void;
  blacklist: number[];
  toggleBlacklist: (id: number) => void;
  maxPool: number;
  setMaxPool: (n: number) => void;
  availableCount: number;
}

const SavedLessonsContext = createContext<SavedLessonsContextType>({} as SavedLessonsContextType);

export function SavedLessonsProvider({ children }: { children: ReactNode }) {
  const [savedLessons, setSavedLessons] = useState<Lesson[]>(() => {
    try {
      const stored = localStorage.getItem("savedLessons");
      return stored ? JSON.parse(stored) : [];
      } catch { return []; }
  });
  
  const [blacklist, setBlacklist] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem("blacklist");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [availableCount, setAvailableCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("availableCount");
      return stored ? JSON.parse(stored) : cardData.length;
      } catch { return cardData.length; }
  });

  const [maxPool, setMaxPoolState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("maxPool");
      return stored ? JSON.parse(stored) : 30;
      } catch { return 30; }
  });

  const saveLesson = (lesson: Lesson) => {
    setSavedLessons((prev) => {
      if (prev.find((l) => l.id === lesson.id)) return prev;
      const updated = [...prev, lesson];
      localStorage.setItem("savedLessons", JSON.stringify(updated));
      return updated;
    });
  };

  const removeLesson = (id: number) => {
    setSavedLessons((prev) => {
      const updated = prev.filter((lesson) => lesson.id !== id);
      localStorage.setItem("savedLessons", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleBlacklist = (id: number) => {
    setBlacklist((prev) => {
      const updated = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem("blacklist", JSON.stringify(updated));

      const newAvailable = cardData.length - updated.length;
      localStorage.setItem("availableCount", JSON.stringify(newAvailable));
      setAvailableCount(newAvailable);

      // clamp maxPool if it's now out of range
      const maxAllowed = newAvailable - 2;
      setMaxPoolState(prev => {
        const clamped = Math.min(prev, maxAllowed);
        localStorage.setItem("maxPool", JSON.stringify(clamped));
        return clamped;
      });

      return updated;
    });
  };
  
  const setMaxPool = (n: number) => {
    localStorage.setItem("maxPool", JSON.stringify(n));
    setMaxPoolState(n);
  };

  return (
    <SavedLessonsContext.Provider value={{
      savedLessons, saveLesson, removeLesson,
      blacklist, toggleBlacklist,
      maxPool, setMaxPool, availableCount }}
    >
      {children}
    </SavedLessonsContext.Provider>
  );
}

export function useSavedLessons() {
  return useContext(SavedLessonsContext);
}