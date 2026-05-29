import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useSavedLessons } from "../context/SavedLessonsContext";

function LessonPool() {
    const { savedLessons, removeLesson } = useSavedLessons();
    const [selected, setSelected] = useState(null);
    
    if (savedLessons.length === 0) return null;

    const handleRemove = () => {
        removeLesson(selected.id);
        setSelected(null);
    };
    
    return (
        <>
            <div className="flex flex-col items-start gap-0 px-4 py-2">
                {savedLessons.map((lesson, i) => (
                    <div
                    key={lesson.id}
                    onClick={() => setSelected(lesson)}
                    className="group relative cursor-pointer transition-all duration-300 ease-out"
                    style={{
                    zIndex: i,                               // top cards below bottom ones
                    }}
                    onMouseEnter={e => e.currentTarget.style.zIndex = 999}
                    onMouseLeave={e => e.currentTarget.style.zIndex = i}
                >
                    {/* Card container — collapsed by default, expands on hover */}
                    <div className=" overflow-hidden w-60 h-10">
                        <img className="w-full h-auto object-cover object-top" src={`imgs/${lesson.img}`} alt={lesson.title}/>
                    </div>
                </div>
                ))}
            </div>
            <Modal show={!!selected} onClose={() => setSelected(null)} size="md" dismissible>
                <ModalHeader className="font-beleren text-xl p-3">
                    {selected?.title}
                </ModalHeader>
                <ModalBody className="flex flex-col items-center">
                    <button
                        onClick={handleRemove}
                        className="mb-4 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-colors"
                    >
                        Remove Lesson
                    </button>
                    <img src={`imgs/${selected?.img}`} alt={selected?.title} className="w-55 h-auto mb-4" />
                <div className="flex flex-col items-center gap-4">
                    <p className="font-mplantin text-base text-center">
                    {selected?.text || "No description available."}
                    </p>
                </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export default LessonPool;