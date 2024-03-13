import { Route, Routes } from "react-router-dom";
import Footer from "./user/components/Footer/Footer";
import Header from "./user/components/Header/Header";
import Home from "./user/containers/Home/Home";
import Shop from "./user/containers/Shop/Shop";
import Shop_Detail from "./user/containers/Shop_Detail/Shop_Detail";
import Cart from "./user/containers/Cart/Cart";
import Chackout from "./user/containers/Chackout/Chackout";
import Testimonial from "./user/containers/Testimonial/Testimonial";
import Page from "./user/containers/Page/Page";
import Contact from "./user/containers/Contact/Contact";



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route extract path="/" element={<Home/>} />
        <Route extract path="/Shop" element={<Shop/>} />
        <Route extract path="/Shop_Detail" element={<Shop_Detail/>} />
        <Route extract path="/Cart" element={<Cart/>} />
        <Route extract path="/Chackout" element={<Chackout/>} />
        <Route extract path="/Testimonial" element={<Testimonial/>} />
        <Route extract path="/Page" element={<Page/>} />
        <Route extract path="/Contact" element={<Contact/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
