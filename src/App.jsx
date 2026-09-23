import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import "./App.css";
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import useAnalytics from './hooks/useAnalytics';

// Sends a GA4 page_view on every route change. Must live inside
// <BrowserRouter> since it relies on react-router's location context.
function AnalyticsTracker() {
  useAnalytics();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App;
