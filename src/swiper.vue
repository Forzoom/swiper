<!-- <template>
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
</template> -->

<script>

    import {
        _Vue,
    } from './install';
    import {
        cloneVNode,
    } from 'vue/src/core/vdom/vnode.js';

    /**
     * 将val限定在一定的范围之内
     */
    function range(val, min, max) {
        return Math.max(Math.min(val, max), min);
    }

    /**
     * 
     */
    function round(val, min, step) {
        return min + Math.round((val - min) / step) * step;
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
             * 是否自动播放
             */
            autoplay: {
                type: Boolean,
                default: false,
            },
            /**
             * 是否循环显示
             */
            loop: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                /**
                 * 每张图片的宽度
                 */
                width: 0,
                /**
                 * 移动的距离
                 */
                translate: 0,
                /**
                 * 当前是否已经锚定
                 */
                isMount: false,
                /**
                 * 过渡效果是否启用
                 */
                transition: false,
                /**
                 * 定时器
                 */
                handler: null,
            };
        },
        computed: {
            rangeMax() {
                return 0;
            },
            rangeMin() {
                return -this.width * (this.slides.length - 1); // 这里原本是 - 1，但是需要前置和后置内容，所以需要 + 2，最终就是 + 1
            },
            count() {
                return this.slides.length;
            },
            slides() {
                // 确认$slots存在
                const defaultSlots = this.$slots.default || [];
                const slides = defaultSlots.filter(function(vnode) {
                    return vnode != null && vnode.tag != null && vnode.tag.indexOf('SwiperSlide') != -1;
                });
                if (!this.loop) {
                    return slides;
                }
                if (slides.length > 0) {
                    const firstVNode = cloneVNode(slides[0]);
                    const lastVNode = cloneVNode(slides[slides.length - 1]);
                    slides.push(firstVNode);
                    slides.unshift(lastVNode);
                }
                return slides;
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
                this.translate = range(this.translate + x, this.rangeMin, 0);
            },
            onTouchUp(startPos, currentPos) {
                this.transition = true;
            },
            onTouchSlide() {
                const vm = this;
                vm.translate = range(round(vm.translate, 0, vm.width), vm.rangeMin, 0);
                vm.onTouchRange();
            },
            onTouchFling({ speedX, }) {
                const vm = this;
                vm.translate = range(round(vm.translate + 0.5 * (speedX > 0 ? vm.width : -vm.width), 0, vm.width), vm.rangeMin, 0);
                vm.onTouchRange();
            },
            onTouchRange() {
                const vm = this;
                // 不做循环的情况下，直接返回
                if (!this.loop) {
                    return;
                }
                if (vm.translate === 0 || vm.translate === vm.rangeMin) {
                    vm.$nextTick(function() {
                        vm.transition = false;
                        if (vm.translate === 0) {
                            vm.translate = -vm.width * (this.slides.length - 2);
                        } else if (vm.translate === vm.rangeMin) {
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
            const vm = this;
            vm.width = window.innerWidth;
            vm.translate = 0;
            if (this.loop) {
                vm.translate = -window.innerWidth
            }
            if (vm.autoplay) {
                // 启动定时器
                vm.handler = setInterval(function() {
                    vm.transition = true;
                    vm.translate -= vm.width;
                    vm.onTouchRange();
                }, vm.duration);
            }
        },
        render(h) {
            const slides = this.slides;
            slides.forEach(function(vnode) {
                if (vnode.data.style) {
                    vnode.data.style.width = 1 / slides.length * 100 + '%';
                } else {
                    vnode.data.style = {
                        width: 1 / slides.length * 100 + '%',
                    };
                }
            });

            // 创建touch
            const touch = h('Touch', {
                on: {
                    'touch-down': this.onTouchDown,
                    'touch-move': this.onTouchMove,
                    'touch-up': this.onTouchUp,
                    'touch-slide': this.onTouchSlide,
                    'touch-fling': this.onTouchFling,
                },
            }, [
                h('div', {
                    'class': ['ro-swiper', {transition: this.transition}],
                    style: {
                        width: (slides.length * 100) + '%',
                        transform: 'translateX(' + this.translate + 'px)',
                    },
                }, slides),
            ]);
            const el = h('div', {
                'class': ['ro-swiper-container'],
            }, [touch]);
            return el;
        },
    };
</script>

<style>
    .ro-swiper-container {
        overflow: hidden;
    }
    .ro-swiper.transition {
        transition: transform 0.3s;
    }
    .ro-swiper-content {
        width: 100%;
    }
</style>