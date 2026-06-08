import { useState, useCallback } from "react";
import { Button, Popover } from "flowbite-react";
import LessonItem from './LessonItem.js';
import cardData from '../data/CardData.json';
import { useSavedLessons } from "../context/SavedLessonsContext";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../data/translations.ts";
import type { Lesson } from "../context/SavedLessonsContext.tsx";

function pickRandom(savedLessons: Lesson[], blacklist: number[]): Lesson[] {
  const savedIds = new Set(savedLessons.map(l => l.id));
  const available = cardData
    .map((card, index) => ({ index, card }))
    .filter(({ index }) => !savedIds.has(index) && !blacklist.includes(index));

  const picks = new Set<number>();
  while (picks.size < 3 && picks.size < available.length) {
    picks.add(Math.floor(Math.random() * available.length));
  }

  return [...picks].map((i) => {
    const { index, card } = available[i];
    return {
      id: index,
      img: `${card.name}.webp` || "",
      title: card.name || "",
      text: card.oracle_text || "",
      mana_cost: card.mana_cost || "",
      type_line: card.type_line || "",
      es_title: card.printed_name || "",
      es_text: card.printed_text || "",
    };
  });
}

function DiscoverBox() {
  const { lang } = useLanguage();
  const [randomLessons, setRandomLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const { saveLesson, savedLessons, blacklist, maxPool } = useSavedLessons();
  const isPoolFull = savedLessons.length >= maxPool;

  const refresh = useCallback(() => {
    setLoading(true);
    const lessons = pickRandom(savedLessons, blacklist);
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
  }, [savedLessons, blacklist]);

  const handlePick = (lesson: Lesson) => {
    saveLesson(lesson);
    setRandomLessons([]);  // clear cards after picking
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {randomLessons.length === 0 && (
        <div className="flex items-center gap-2">
          <Button
            className="font-semibold text-2xl p-7 cursor-pointer"
            onClick={refresh}
            disabled={loading || isPoolFull}
          >
            {loading ? t[lang].loading : (isPoolFull ? t[lang].poolFull : t[lang].learn)}
          </Button>
          <Popover
            open={infoOpen}
            placement="top"
            content={
            <div className="w-52 px-3 py-2">
              <p className="text-sm text-black dark:text-gray-300">
              {t[lang].learnInfo}
              </p>
            </div>
            }
          >
            <span
              onMouseEnter={() => setInfoOpen(true)}
              onMouseLeave={() => setInfoOpen(false)}
              onTouchStart={() => setInfoOpen(prev => !prev)}
            >
              ℹ️
            </span>
          </Popover>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 mb-4 px-4">
        {randomLessons.map((lesson) => (
          <div key={lesson.id}>
            <LessonItem
              card_img={lesson.img}
              card_title={lesson.title}
              card_es_title={lesson.es_title}
              card_es_text={lesson.es_text}
              onClick={() => handlePick(lesson)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoverBox;