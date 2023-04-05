import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Navigation, Pagination]);

function Tes() {
  return (
    <Swiper
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <img src="./images/img_01.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="./images/img_02.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="./images/img_03.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="./images/img_04.jpg" alt="" />
      </SwiperSlide>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-pagination"></div>
    </Swiper>
  );
}

export default Tes;
