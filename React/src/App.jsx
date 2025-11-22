import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { themeContext } from './context'
import Home from './Home'
import Button from './Components/Button'

function App() {
  const [theme, setTheme] = useState('light');
  const handleClick = () => {
    setTheme((prev) => prev == "light" ? "dark" : "light")
  }
  const handler = (x) => {
    console.log(x)
  }
  return (
    <>
      <Button value={"Hello"} handlerFunction={handler} />
      <themeContext.Provider value={{ theme, handleClick }}>
        <Home />
      </themeContext.Provider>
    </>
  )
}

export default App
