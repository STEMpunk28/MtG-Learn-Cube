import React, { useState, useCallback } from "react";
import { Button } from "flowbite-react";
import Lesson from './Lesson.jsx';
import cardData from '../data/cardData.json';
import { useSavedLessons } from "../context/SavedLessonsContext";

function pickRandom(savedLessons) {
  const savedIds = new Set(savedLessons.map(l => l.id));
  const available = cardData
    .map((card, index) => ({ index, card }))
    .filter(({ index }) => !savedIds.has(index));

  const picks = new Set();
  while (picks.size < 3 && picks.size < available.length) {
    picks.add(Math.floor(Math.random() * available.length));
  }

  return [...picks].map((i) => {
    const { index, card } = available[i];
    return {
      id: index,
      img: `${card.name}.png`,
      title: card.printed_name,
      text: card.printed_text || "",
    };
  });
}

function DiscoverBox() {
  const [randomLessons, setRandomLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const { saveLesson, savedLessons } = useSavedLessons();

  const refresh = useCallback(() => {
    setLoading(true);
    const lessons = pickRandom(savedLessons);
    let loaded = 0;
    lessons.forEach(lesson => {
      const img = new Image();
      img.src = `imgs/${lesson.img}`;
      img.onload = img.onerror = () => {  // onerror so it doesn't hang on broken images
        loaded++;
        if (loaded === lessons.length) {
          setRandomLessons(lessons);
          setLoading(false);
        }
      };
    });
  }, [savedLessons]);

  const handlePick = (lesson) => {
    saveLesson(lesson);
    setRandomLessons([]);  // clear cards after picking
  };

  return (
    <>
      <div>
        <Button onClick={refresh} disabled={loading}>
          {loading ? "Loading..." : "Learn"}
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {randomLessons.map((lesson) => (
          <div
            key={lesson.id}
            className="mb-4 cursor-pointer"
          >
            <Lesson
              card_img={lesson.img}
              card_title={lesson.title}
              card_text={lesson.text}
              onClick={() => handlePick(lesson)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default DiscoverBox;