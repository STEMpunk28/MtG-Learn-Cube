import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Popover } from "flowbite-react";
import { useSavedLessons } from "../context/SavedLessonsContext";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../data/translations";

function LessonPool() {
  const { lang } = useLanguage();
  const { savedLessons, removeLesson } = useSavedLessons();
  const [selected, setSelected] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  if (savedLessons.length === 0) return null;

  const handleRemove = () => {
    removeLesson(selected.id);
    setSelected(null);
  };

  return (
    <>
      <div className="bg-gray-900/60 border border-b-0 border-white rounded-xl rounded-b-none mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <span className="font-beleren text-base text-gray-200">
            {t[lang].lessonsInExile}
          </span>
          <Popover
            open={infoOpen}
            placement="top"
            content={
              <div className="w-52 px-3 py-2">
                <p className="text-sm text-black dark:text-gray-300">
                  {t[lang].exileInfo}
                </p>
              </div>
            }
          >
            <span className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer transition-colors"
              onMouseEnter={() => setInfoOpen(true)}
              onMouseLeave={() => setInfoOpen(false)}
              onTouchStart={() => setInfoOpen(prev => !prev)}
              >
                ℹ️
            </span>
          </Popover>
        </div>

        {/* Cards */}
        <div className="flex flex-col items-end gap-0 px-4">
          {savedLessons.map((lesson, i) => (
            <div
              key={lesson.id}
              onClick={() => setSelected(lesson)}
              className="cursor-pointer -mt-6 first:mt-0"
              style={{ zIndex: i }}
            >
              <div className="card-glow overflow-hidden w-60 h-16 rounded-xl rounded-b-none shadow-md transition-all duration-200">
                <img className="w-full h-auto object-cover object-top" src={`imgs/${lesson.img}`} alt={lesson.title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={!!selected} onClose={() => setSelected(null)} size="md" dismissible>
        <ModalHeader className="font-beleren text-xl py-2 items-center">
          {selected?.title}
        </ModalHeader>
        <ModalBody className="flex flex-col items-center">
          <button
            onClick={handleRemove}
            className="mb-4 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-colors"
          >
            {t[lang].removeLesson}
          </button>
          <img src={`imgs/${selected?.img}`} alt={selected?.title} className="w-55 h-auto mb-4" />
          <div className="flex flex-col items-center gap-4">
            <p className="font-mplantin text-base text-center text-black dark:text-gray-200">
              {selected?.text || t[lang].noDescription}
            </p>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default LessonPool;