import React, { useMemo } from "react";
import { Button } from "flowbite-react";
import Lesson from './Lesson.jsx';
import cardData from '../data/cardData.json';

function DiscoverBox() {
  const randomLessons = useMemo(() => {
    const picks = new Set();
    while (picks.size < 3 && picks.size < cardData.length) {
      picks.add(Math.floor(Math.random() * cardData.length));
    }

    return [...picks].map((index) => {
      const card = cardData[index];
      return {
        id: index,
        img: `${card.name}.png`,
        title: card.printed_name,
        text: card.printed_text || "",
      };
    });
  }, []);

  return (
    <>
      <div>
        <Button>Learn</Button>
      </div>
      <div class="grid grid-cols-4 gap-4">
        {randomLessons.map((lesson) => (
        <div key={lesson.id} className="mb-4" md={4}>
          <Lesson class="hover:shadow-lg" style={{ hover: { boxShadow: '0 0 5px 5px #ddd' } }}
            card_img={lesson.img}
            card_title={lesson.title}
            card_text={lesson.text}
          />
        </div>
      ))}
      </div>
    </>
  );
}

export default DiscoverBox;