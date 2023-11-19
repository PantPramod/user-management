import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import './App.css'
import Teams from "./pages/Teams"
import UserDetails from "./pages/UserDetails"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/:userId" element={<UserDetails />} />
    </Routes>
  )
}

export default App
