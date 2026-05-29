import { useState } from 'react'
import {Popover, Button} from "flowbite-react";

function Lesson({ 
    card_img="test.jpg",
    card_title="Card Title",
    card_text="Placeholder text for the card content.",
    onClick=null
}) {
  return (
    <div>
        <img className="w-full h-auto hover:shadow-lg" src={`imgs/${card_img}`} alt="" onClick={onClick} />
        <Popover
            aria-labelledby="default-popover"
            content={
                <div className="w-64">
                    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3 id="default-popover" className="font-beleren text-lg text-gray-900 dark:text-white">
                        {card_title}
                        </h3>
                    </div>
                    <div className="px-3 py-2">
                        <p className="font-mplantin text-base text-gray-500 dark:text-gray-300">
                            {card_text}
                        </p>
                    </div>
                </div>
            }
            placement="top"
        >
            <Button color="yellow" outline>
                Traducción
            </Button>
        </Popover>
    </div>
  );
}

export default Lesson;