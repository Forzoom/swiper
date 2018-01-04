<template>
    <div class="ro-swiper-content-wrap" :class="slideClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'SwiperSlide',
        props: {
            slideClass: {
                type: [
                    Object,
                    Array,
                ],
            },
        },
    };
</script>

<style>
    .ro-swiper-content-wrap {
        display: inline-block;
        top: 0;
    }
</style>