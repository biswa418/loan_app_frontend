import { Applications, Cousers, Create, Home, Page404, Users } from '../pages'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/apps' element={<Applications />} />
            <Route path='/couser' element={<Cousers />} />
            <Route path='/users/create' element={<Create />} />
            <Route path='/apps/create' element={<Create />} />
            <Route path='/couser/create' element={<Create />} />


            <Route path='*' element={<Page404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
