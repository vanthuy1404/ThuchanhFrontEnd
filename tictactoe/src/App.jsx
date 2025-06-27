import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './component/Button'
import TicTacToe from './TicTacToe'
import QuanLiSinhVien from './QuanLiSinhVien'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <QuanLiSinhVien/>
      {/* <TicTacToe/> */}
      {/**<Button content = "Replay"></Button> */}
    </>
  )
}

export default App
