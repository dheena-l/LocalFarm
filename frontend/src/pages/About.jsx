import { motion } from "framer-motion";
import {
  FaLeaf,
  FaEgg,
  FaSeedling,
  FaTractor,
  FaCheckCircle,
} from "react-icons/fa";
import paddy from '../assets/paddy.jfif'; 
import plant from '../assets/plant.jpg'; 

import { GiCow } from "react-icons/gi";

function About() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="about-hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-100">

            {/* LEFT CONTENT */}
            <div className="col-lg-6 mb-5 mb-lg-0">

              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="about-badge"
              >
                30+ Years Of Traditional Farming
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="about-title mt-4"
              >
                Pure & Natural <br />
                Village Farming
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="about-text mt-4"
              >
                Our family has been involved in farming for more than
                30 years with dedication, trust, and traditional methods.
                We cultivate paddy fields, raise healthy cows and goats,
                produce fresh country eggs, coconuts, and natural organic
                manure directly from our farms.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4"
              >
                <div className="d-flex align-items-center mb-3">
                  <FaCheckCircle className="feature-check me-3" />
                  <span>100% Natural Farming Methods</span>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <FaCheckCircle className="feature-check me-3" />
                  <span>Fresh Farm Products Delivered Daily</span>
                </div>

                <div className="d-flex align-items-center">
                  <FaCheckCircle className="feature-check me-3" />
                  <span>Traditional Village Farming Experience</span>
                </div>
              </motion.div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="col-lg-6">

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="about-image-wrapper"
              >
                <img
                  src={paddy}
                  alt="Farm"
                  className="img-fluid about-main-image"
                />
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-5 about-feature-section">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="section-title">What We Produce</h2>
            <p className="section-subtitle">
              Fresh and healthy products directly from our farm
            </p>
          </div>

          <div className="row g-4">

            {/* CARD 1 */}
            <div className="col-md-6 col-lg-3">
              <motion.div
                whileHover={{ y: -10 }}
                className="about-card text-center"
              >
                <div className="icon-box">
                  <FaSeedling />
                </div>

                <h4>Paddy Farming</h4>

                <p>
                  We cultivate healthy paddy using natural and
                  traditional farming methods.
                </p>
              </motion.div>
            </div>

            {/* CARD 2 */}
            <div className="col-md-6 col-lg-3">
              <motion.div
                whileHover={{ y: -10 }}
                className="about-card text-center"
              >
                <div className="icon-box">
                <GiCow />
                </div>

                <h4>Cows & Goats</h4>

                <p>
                  Healthy cows and goats raised with proper natural
                  feeding and care.
                </p>
              </motion.div>
            </div>

            {/* CARD 3 */}
            <div className="col-md-6 col-lg-3">
              <motion.div
                whileHover={{ y: -10 }}
                className="about-card text-center"
              >
                <div className="icon-box">
                  <FaEgg />
                </div>

                <h4>Country Eggs</h4>

                <p>
                  Fresh farm eggs collected daily from naturally raised
                  country chickens.
                </p>
              </motion.div>
            </div>

            {/* CARD 4 */}
            <div className="col-md-6 col-lg-3">
              <motion.div
                whileHover={{ y: -10 }}
                className="about-card text-center"
              >
                <div className="icon-box">
                  <FaLeaf />
                </div>

                <h4>Organic Products</h4>

                <p>
                  Fresh coconuts and organic manure directly from our
                  sustainable farms.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="experience-section py-5">
        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6 mb-5 mb-lg-0">
              <img
                src={plant}
                alt="Farm Experience"
                className="img-fluid experience-image"
              />
            </div>

            <div className="col-lg-6">

              <span className="experience-tag">
                WHY CHOOSE US
              </span>

              <h2 className="experience-title mt-3">
                Trusted Farming Since 1995
              </h2>

              <p className="experience-text mt-4">
                We believe in healthy living through natural farming.
                Our products are cultivated with care, traditional
                farming knowledge, and sustainable agricultural methods.
              </p>

              <div className="row mt-4">

                <div className="col-6">
                  <div className="experience-box">
                    <h3>30+</h3>
                    <p>Years Experience</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="experience-box">
                    <h3>100%</h3>
                    <p>Organic Products</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default About;