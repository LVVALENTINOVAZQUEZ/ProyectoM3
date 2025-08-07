import {useContext, useEffect, useState} from 'react'
import './App.module.css'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Misturnos from './views/MisTurnos/Misturnos'
import Register from './views/Register/Register'
import Styles from "./App.module.css";
import { Route, Routes, useNavigate} from 'react-router-dom'
import NotFound from './components/NavBar/NotFound/NotFound'
import NavBar from "./components/NavBar/NavBar"
import { UsersContext } from '../Context/UsersContext'
import AgendarTurno from './views/agendarTurno/AgendarTurno'

const App = () => {

   const {userId} = useContext(UsersContext)
   
   const [isNotFound, setIsNotFound] = useState(false)

   const navigate = useNavigate()
   

   useEffect(() => {

   
      const validRoutes = ["/", "/login", "/register", "/misturnos", '/agendarturno']

      if(!validRoutes.includes(location.pathname)) setIsNotFound(true)
      else setIsNotFound(false)

      if(!userId && location.pathname !== "/login" && location.pathname !== "/register"){
         navigate("/login")
      }
      if(userId && location.pathname === '/login' || userId && location.pathname === '/register'){
            navigate('/')
         }
}, [location.pathname, navigate, userId])
   return (
    <>
    {
      !userId ? (
     <main className={Styles.main}> 
  <Routes>
   <Route path='/login' element={<Login/>}/>
   <Route path='/register' element={<Register />}/>
  </Routes>
     </main>
   ) : (
     <>
    {
      !isNotFound && (
      <header>
       
         <NavBar/>
      </header>
      )
    }
      <main className={Styles.main}>
         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/misturnos' element={<Misturnos/>}/>
            <Route path='/agendarturno' element={<AgendarTurno/>}/>
            <Route path='*' element={<NotFound/>}/>
         </Routes>
      </main>
      </>
   )
}
 
    </>
   )
}


export default App
