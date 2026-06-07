import { useState } from 'react'
import { Popover, Button } from "flowbite-react";
import { useLanguage } from "../context/LanguageContext";

interface LessonProps {
  card_img?: string;
  card_title?: string;
  card_text?: string;
  card_es_title?: string;
  card_es_text?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

function Lesson({ 
    card_img="test.jpg",
    card_title="Card Title",
    card_es_title="Título de la Carta",
    card_es_text="Texto de ejemplo para el contenido de la carta.",
    onClick
}: LessonProps) {
  const {lang} = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <img
        className="card-glow w-full h-auto m-1 rounded-xl transition-all duration-200 cursor-pointer"
        src={`imgs/${card_img}`}
        alt={card_title}
        onClick={onClick}
      />
      {lang === "es" &&
        <Popover
          aria-labelledby="default-popover"
          open={isOpen}
          placement="top"
          content={
            <div className="w-64">
              <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 id="default-popover" className="font-bold text-lg text-gray-900 dark:text-white">
                  {card_es_title}
                </h3>
              </div>
              <div className="px-3 py-2">
                <p className="text-base text-black dark:text-gray-200">
                  {card_es_text}
                </p>
              </div>
            </div>
          }
        >
          <Button
            color="yellow"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onTouchStart={() => setIsOpen(prev => !prev)}
          >
            Traducción
          </Button>
        </Popover>
      }
    </div>
  );
}

export default Lesson;