import { useState } from "react";
import { Modal, ModalBody, ModalHeader, Popover } from "flowbite-react";
import { useLanguage } from "../context/LanguageContext.tsx";
import { t } from "../data/translations.ts";

function Settings() {
    const { lang } = useLanguage();
    const [openModal, setOpenModal] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    return (
        <div>
            <button onClick={() => setOpenModal(true)} className="text-4xl text-white md:opacity-70 hover:opacity-100 transition">
            ⚙️
            </button>
            <Modal show={openModal} size="xl" onClose={onCloseModal} dismissible>
                <ModalHeader>
                    <span className="font-bold text-base text-gray-200">
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
                        <span className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            onMouseEnter={() => setInfoOpen(true)}
                            onMouseLeave={() => setInfoOpen(false)}
                            onTouchStart={() => setInfoOpen(prev => !prev)}
                            >
                            ℹ️
                        </span>
                    </Popover>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Settings