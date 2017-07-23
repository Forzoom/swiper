<template>
    <div class="ro-swiper-container">
        <Touch
            @touch-down="onTouchDown"
            @touch-move="onTouchMove"
            @touch-up="onTouchUp"
            @touch-slide="onTouchSlide"
            @touch-fling="onTouchFling">
            <div
                class="ro-swiper"
                :class="{transition: transition}"
                :style="{width: preparedImages.length * 100 + '%',transform: 'translateX(' + translate + 'px)'}">
                <div 
                    class="ro-swiper-content-wrap" 
                    :style="{width: 1 / preparedImages.length * 100 + '%'}"
                    v-for="image in preparedImages">
                    <img class="ro-swiper-content" :src="image">
                </div>
            </div>
        </Touch>
    </div>
</template>

<script>
    /**
     * 将val限定在一定的范围之内
     */
    function range(val, min, max) {
        return Math.max(Math.min(val, max), min);
    }

    function round(value, min, step) {
        return min + Math.round((value - min) / step) * step;
    }

    import Touch from '@forzoom/touch';
    export default {
        name: 'Swiper',
        components: {
            Touch,
        },
        props: {
            /**
             * 每张图片的展示时间
             */
            duration: {
                type: Number,
                default: 3000,
            },
            /**
             * 所有需要展示的图片
             */
            images: {
                required: true,
                type: Array,
            },
        },
        data() {
            return {
                width: 0,
                translate: 0,
                isMount: false,
                transition: false,
            };
        },
        computed: {
            /**
             * 添加头尾用于过渡的images
             */
            preparedImages() {
                const images = this.images.slice(0);
                images.unshift(this.images[this.images.length - 1]);
                images.push(this.images[0]);
                return images;
            },
        },
        methods: {
            onTouchDown() {
                if (!this.isMount) {
                    this.mount();
                }
                this.transition = false;
            },
            onTouchMove({ x, y, }) {
                // 需求屏幕的宽度
                this.translate = range(this.translate + x, -this.width * (this.preparedImages.length - 1), 0);
            },
            onTouchUp(startPos, currentPos) {
                this.transition = true;
            },
            onTouchSlide() {
                const vm = this;
                vm.translate = range(round(vm.translate, 0, vm.width), -vm.width * (vm.preparedImages.length - 1), 0);
                vm.onTouchRange();
            },
            onTouchFling({ speedX, }) {
                const vm = this;
                vm.translate = range(round(vm.translate + 0.5 * (speedX > 0 ? vm.width : -vm.width), 0, vm.width), -vm.width * (vm.preparedImages.length - 1), 0);
                vm.onTouchRange();
            },
            onTouchRange() {
                const vm = this;
                if (vm.translate === 0 || vm.translate === -vm.width * (vm.preparedImages.length - 1)) {
                    vm.$nextTick(function() {
                        vm.transition = false;
                        if (vm.translate === 0) {
                            vm.translate = -vm.width * (vm.preparedImages.length - 2)
                        } else if (vm.translate === -vm.width * (vm.preparedImages.length - 1)) {
                            vm.translate = -vm.width;
                        }
                    });
                }
            },
            /**
             * 直接选取window的宽度
             */
            mount() {
                this.width = window.innerWidth;
                this.isMount = true;
            },
        },
        mounted() {
            this.width = window.innerWidth;
            this.translate = -window.innerWidth;
        },
    };
</script>

<style>
    .ro-swiper.transition {
        transition: transform 0.3s;
    }
    .ro-swiper-content-wrap {
        display: inline-block;
        top: 0;
    }
    .ro-swiper-content {
        width: 100%;
    }
</style>