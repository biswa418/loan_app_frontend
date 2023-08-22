import { Button } from '@mui/material'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl text-cyan-600'>Vite + React</h1>
      <Button variant="contained">Hello world</Button>
    </>
  )
}

export default App
