import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Lesson {
  id: number;
  img: string;
  title: string;
  text: string;
}

interface SavedLessonsContextType {
  savedLessons: Lesson[];
  saveLesson: (lesson: Lesson) => void;
  removeLesson: (id: number) => void;
}

const SavedLessonsContext = createContext<SavedLessonsContextType>({} as SavedLessonsContextType);

export function SavedLessonsProvider({ children }: { children: ReactNode }) {
  const [savedLessons, setSavedLessons] = useState<Lesson[]>(() => {
    try {
      const stored = localStorage.getItem("savedLessons");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
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

  return (
    <SavedLessonsContext.Provider value={{ savedLessons, saveLesson, removeLesson }}>
      {children}
    </SavedLessonsContext.Provider>
  );
}

export function useSavedLessons() {
  return useContext(SavedLessonsContext);
}