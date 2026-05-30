import React, { createContext, useContext, useState } from "react";

const SavedLessonsContext = createContext();

export function SavedLessonsProvider({ children }) {
  const [savedLessons, setSavedLessons] = useState(() => {
    try {
      const stored = localStorage.getItem("savedLessons");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveLesson = (lesson) => {
    setSavedLessons((prev) => {
      if (prev.find((l) => l.id === lesson.id)) return prev;
      const updated = [...prev, lesson];
      localStorage.setItem("savedLessons", JSON.stringify(updated));
      return updated;
    });
  };

  const removeLesson = (id) => {
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