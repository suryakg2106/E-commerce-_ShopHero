import './App.css'
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Register from './Pages/Register'
import {Route,Routes,useLocation} from "react-router-dom"
import Navbar from './Component/Navbar'
import Dashboard from './Pages/Dashboard'
import CreateProduct from './Pages/CreateProduct'
import ProtectedRoute from './Routes/Protected'
import MyProfile from './Pages/MyProfile'
import MyProduct from './Pages/MyProduct'
import ProductDetails from './Pages/ProductDetails'

function Applayout() {

  const Locations = useLocation();
  const hideNavbar = ["/login","/register"];
  const navHide = hideNavbar.includes(Locations.pathname);

  return(
    <>
    <div>
      <main>
        {!navHide && <Navbar/>}
        <Routes>
          <Route path='/' element={<Home/>}/>
           <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/my-products' element={<ProtectedRoute><MyProduct/></ProtectedRoute>}/>
          <Route path='/my-profile' element={<ProtectedRoute><MyProfile/></ProtectedRoute>}/>
          <Route path='/dashboard' element={ <ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/addproduct" element={<ProtectedRoute><CreateProduct/> </ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </main>
    </div>
    </>
  )
}
function App() {


  return (
    <>
    <Applayout/>
    </>
   
  )
}

export default App
