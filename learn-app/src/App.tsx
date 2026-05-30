import './App.css'
import { useLanguage } from "./context/LanguageContext"
import DiscoverBox from './components/DiscoverBox'
import LessonPool from './components/LessonPool'

function App() {
  const { lang, toggle } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="absolute top-4 right-4">
        <button onClick={toggle} className="text-md text-white md:opacity-70 hover:opacity-100 transition">
          {lang === "en" ? "🇬🇧 English" : "🇪🇸 Español​"}
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center w-full">
        <DiscoverBox />
      </div>
      <LessonPool />
    </div>
  )
}

export default App
