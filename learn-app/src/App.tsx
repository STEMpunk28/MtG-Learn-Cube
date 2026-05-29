import { useState } from 'react'
import './App.css'
import DiscoverBox from './components/DiscoverBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <DiscoverBox />
      </section>
    </>
  )
}

export default App
