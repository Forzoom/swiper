<template>
    <div
        class="ro-swiper-content-wrap">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'SwiperSlide',
    };
</script>

<style>
    .ro-swiper-content-wrap {
        display: inline-block;
        top: 0;
    }
</style>