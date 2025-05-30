<script setup>
import { ref } from "vue";
import swiper2 from "@/assets/images/swiper2.png";
import swiper3 from "@/assets/images/swiper3.png";
import swiper4 from "@/assets/images/swiper4.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";

const modules = [Pagination, Autoplay];

const swiperList = ref([
  {
    id: 1,
    img: swiper2,
  },
  {
    id: 2,
    img: swiper3,
  },
  {
    id: 3,
    img: swiper4,
  },
]);
</script>

<template>
  <div class="swiper-container">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 7000, disableOnInteraction: false }"
    >
      <SwiperSlide v-for="item in swiperList" :key="item.id">
        <img :src="item.img" alt="" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.swiper-container {
  height: 740px;
}

:deep(.swiper-pagination-bullet) {
  width: 50px;
  height: 4px;
  border-radius: 0;
  background: rgba(255, 255, 255, 0.5);
}

:deep(.swiper-pagination-bullet-active) {
  background: rgba(255, 255, 255, 1);
}
</style>
