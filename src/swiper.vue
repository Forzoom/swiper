<template>
	<div class="ro-swiper-container">
		<Touch
			@touch-start="onTouchStart">
			<div v-for="image in images">
				<img :src="image">
			</div>
		</Touch>
	</div>
</template>

<script>
	import Touch from '@forzoom/touch';
	export default {
		name: 'Swiper',
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
		methods: {
			onTouchStart() {
				console.log('onTouchStart');
			},
		},
	};
</script>

<style>
	
</style>