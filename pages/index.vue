<template>
  <!-- <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div v-for="banner in banners" :key="banner" class="swiper-slide">
        <div class="swiper-zoom-container">
          <img :src="banner" class="slide-img" />
        </div>
      </div>
    </div>
    <div slot="button-prev" class="swiper-button-prev" />
    <div slot="button-next" class="swiper-button-next" />
    <div class="swiper-pagination" />
  </div> -->
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      banners: [
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        "https://images.unsplash.com/photo-1516648315-bbc935c622a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
      ],
      swiperOption: {
        loop: true,
        autoHeight: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        effect: "fade",
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  }
};
</script>

<style lang="scss">
.swiper-container {
  padding: 1rem 0 2rem 0;
}
.swiper-zoom-container {
  max-height: 500px !important;
}
.swiper-button-next,
.swiper-button-prev {
  filter: brightness(0) invert(1);
}
span.swiper-pagination-bullet-active {
  background: #fff !important;
  border: 2px solid #000;
}
span.swiper-pagination-bullet {
  background: rgb(0, 0, 0);
  border: 2px solid #fff;
}
</style>
