import Swiper from './swiper.vue';
import SwiperSlide from './swiper-slide.vue';

export let _Vue;

export function install(Vue) {
    if (install.installed) {
        return;
    }
    install.installed = true;
    _Vue = Vue;

    Vue.component('ROSwiper', Swiper);
    Vue.component('ROSwiperSlide', SwiperSlide);
}