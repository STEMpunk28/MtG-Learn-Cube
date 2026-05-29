import { useState } from 'react'
import './App.css'
import DiscoverBox from './components/DiscoverBox'
import LessonPool from './components/LessonPool'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <DiscoverBox />
      </section>
      <section className="flex self-center mb-0">
        <LessonPool />
      </section>
    </>
  )
}

export default App
