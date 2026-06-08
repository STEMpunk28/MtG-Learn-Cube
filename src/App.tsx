import './App.css'
import { useLanguage } from "./context/LanguageContext"
import DiscoverBox from './components/DiscoverBox'
import LessonPool from './components/LessonPool'
import Settings from './components/Settings';

function App() {
  const { lang, toggle } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="absolute top-4 left-4">
        <Settings/>
      </div>
      <div className="absolute top-4 right-4">
        <button onClick={toggle} className="text-md text-white cursor-pointer md:opacity-70 hover:opacity-100 transition">
          {lang === "en" ? "🇬🇧 English" : "🇪🇸 Español​"}
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center w-full">
        <DiscoverBox />
      </div>
      <LessonPool />
      <footer className="bg-black w-full text-center text-xs text-white/40 py-2">
        Magic: The Gathering is © Wizards of the Coast. This app is not affiliated nor produced nor endorsed by Wizards of the Coast.
        All card images, mana symbols, expansions and art related to Magic the Gathering is a property of Wizards of the Coast/Hasbro.
      </footer>
    </div>
  )
}

export default App
