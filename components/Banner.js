import React from "react";
import "../components/Banner.css";
import banner1Img from '../images/banner1.jpg';
import banner2Img from '../images/banner2.jpg';
import banner3Img from '../images/banner3.jpg';

const Banner = () => {
  return (
    <div
      id="carouselExampleDark"
      className="carousel carousel-dark slide"
      data-bs-ride="carousel"
      data-bs-interval="3000" // Tự động chuyển đổi sau 1 giây
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={banner1Img} className="d-block w-100" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img src={banner2Img} className="d-block w-100" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img src={banner3Img} className="d-block w-100" alt="Third slide" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
