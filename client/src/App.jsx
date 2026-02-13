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
import SearchResultPage from './Pages/SearchProduct'
import ShopPage from './Pages/ShopPage'
import UpdateProduct from './Pages/UpdateProduct'
import Contact from './Pages/Contact'
import Footer from './Component/Footer'
import { Toaster } from 'react-hot-toast'
import GoCartPage from './Pages/GoCartPage'



function Applayout() {

  const Locations = useLocation();
  const hideNavbar = ["/login","/register"];
  const navHide = hideNavbar.includes(Locations.pathname);

  return(
    <>
    <div>
      <main>
        <Toaster position="top-right" />
        {!navHide && <Navbar/>}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<ProtectedRoute><GoCartPage/></ProtectedRoute>}/>
          <Route path='product/edit/:id' element={<UpdateProduct/>}/>
          <Route path="/shop-page" element={<ShopPage/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path="/search" element={<SearchResultPage/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/my-products' element={<ProtectedRoute><MyProduct/></ProtectedRoute>}/>
          <Route path='/my-profile' element={<ProtectedRoute><MyProfile/></ProtectedRoute>}/>
          <Route path='/dashboard' element={ <ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/addproduct" element={<ProtectedRoute><CreateProduct/> </ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
        {!navHide &&  <Footer/>}
       
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
