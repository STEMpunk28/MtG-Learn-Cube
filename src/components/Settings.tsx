import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Popover } from "flowbite-react";
import { useLanguage } from "../context/LanguageContext.tsx";
import { useSavedLessons } from "../context/SavedLessonsContext";
import { t } from "../data/translations.ts";
import cardData from "../data/CardData.json";

function Settings() {
    const { blacklist, toggleBlacklist } = useSavedLessons();
    const { lang } = useLanguage();
    const [openModal, setOpenModal] = useState(false);
    const [infoOpen1, setInfoOpen1] = useState(false);
    const [infoOpen2, setInfoOpen2] = useState(false);

    const DEFAULT_BLACKLIST = [11, 29, 46, 61];

    const handleReset = () => {
        DEFAULT_BLACKLIST.forEach(id => {
            if (!blacklist.includes(id)) toggleBlacklist(id);
        });
        blacklist.forEach(id => {
            if (!DEFAULT_BLACKLIST.includes(id)) toggleBlacklist(id);
        });
    };

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <div>
            <button onClick={() => setOpenModal(true)} className="text-4xl text-white md:opacity-70 hover:opacity-100 transition">
                ⚙️
            </button>
            <Modal show={openModal} size="3xl" onClose={onCloseModal} dismissible>
                <ModalHeader>
                    {t[lang].settings}
                </ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-1">
                        <div className="border border-gray-500 rounded-xl p-4 bg-gray-900/40">
                            <div className="flex gap-2 mb-9">
                                <h2>{t[lang].maxPoolTitle}</h2>
                                <Popover
                                    open={infoOpen1}
                                    placement="right"
                                    content={
                                        <div className="w-52 px-3 py-2">
                                        <p className="text-sm text-black dark:text-gray-300">
                                            {t[lang].maxPoolInfo}
                                        </p>
                                        </div>
                                    }
                                >
                                    <span
                                        onMouseEnter={() => setInfoOpen1(true)}
                                        onMouseLeave={() => setInfoOpen1(false)}
                                        onTouchStart={() => setInfoOpen1(prev => !prev)}
                                        >
                                        ℹ️
                                    </span>
                                </Popover>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                            </div>
                        </div>
                        <div className="border border-gray-500 rounded-xl p-4 bg-gray-900/40">
                            <div className="flex items-center justify-between mb-9">
                                <div className="flex gap-2">
                                    <h2>{t[lang].blacklistTitle}</h2>
                                    <Popover
                                        open={infoOpen2}
                                        placement="right"
                                        content={
                                            <div className="w-52 px-3 py-2">
                                            <p className="text-sm text-black dark:text-gray-300">
                                                {t[lang].blacklistInfo}
                                            </p>
                                            </div>
                                        }
                                    >
                                        <span
                                            onMouseEnter={() => setInfoOpen2(true)}
                                            onMouseLeave={() => setInfoOpen2(false)}
                                            onTouchStart={() => setInfoOpen2(prev => !prev)}
                                            >
                                            ℹ️
                                        </span>
                                    </Popover>
                                </div>
                                <Button
                                    onClick={handleReset}
                                    color="red"
                                    className="cursor-pointer"
                                >
                                    {t[lang].resetDefault}
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                            {cardData.map((card, index) => {
                                const isBlacklisted = blacklist.includes(index);
                                return (
                                <div
                                    key={index}
                                    onClick={() => toggleBlacklist(index)}
                                    className="flex -mt-6 overflow-hidden cursor-pointer transition-all"
                                >
                                    <div className={`relative overflow-hidden w-60 h-16 rounded-xl rounded-b-none transition-all
                                        ${isBlacklisted && "border border-red-500"}`}
                                    >
                                        <img
                                            src={`imgs/${card.name}.webp`}
                                            alt={card.name}
                                            className="w-full h-auto object-cover object-top"
                                        />
                                        {isBlacklisted && (
                                            <div className="absolute inset-0 bg-red-500/40" />
                                        )}
                                    </div>
                                </div>
                                );
                            })}
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Settings