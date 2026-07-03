import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;
import ProductCard from '../components/ProductCard';

import farmHeroImage from '../assets/farm.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      axios.get(`${API}/products`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error(error));
    }, []);

  return (
    <>
      {/* HERO SECTION */}
      <div className="container-fluid p-0 hero-container overflow-hidden">
        <div className="row g-0 h-100 min-vh-100">

          {/* LEFT SIDE */}
          <div className="col-12 col-md-5 bg-white d-flex flex-column justify-content-between px-4 px-lg-5 position-relative">

            <div className="hero-image-wrapper mt-4 mt-md-0">
              <img
                src={farmHeroImage}
                alt="Farm"
                className="img-fluid hero-farm-img shadow"
              />
            </div>

            <div className="pt-4 pt-lg-5 max-content-width">
              <h2 className="farm-title-dark mb-3">
                Pure Farm Freshness, Delivered Daily
              </h2>

              <h5 className="farm-subtitle-dark mb-4">
                Healthy living starts from natural farming
              </h5>

              <p className="farm-text-muted">
                We provide fresh cow milk, country eggs, coconuts,
                organic manure, and naturally raised farm products.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-12 col-md-7 farm-bg-dark d-flex flex-column justify-content-between p-4 p-lg-5 text-white">

            <div className="my-auto py-5 pe-lg-5 max-content-width align-self-center w-100">
              <h1 className="farm-display-title mb-4">
                FRESH FROM <br /> OUR FARM
              </h1>

              <p className="farm-text-light mb-4">
                Experience the taste of pure and natural farming.
              </p>

              <p className="farm-text-highlight mb-4">
                Natural products grown with traditional farming methods
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="container my-5 pt-5 text-center">

        <h3 className="mb-5 fw-bold text-dark">
          Our Products
        </h3>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
          className="pb-5"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Home;