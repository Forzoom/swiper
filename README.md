### Install

npm install @forzoom/swiper

### Usage

```javascript
import Vue from 'vue';
import Swiper from '@forzoom/swiper';

Vue.use(Swiper); // will register components 'ROSwiper' and 'ROSwiperSlide'
```

```
<template>
	<div>
		<ROSwiper>
			<ROSwiperSlide>
				...
			</ROSwiperSlide>
			<ROSwiperSlide>
				...
			</ROSwiperSlide>
		</ROSwiper>
	</div>
</template>
```

### Version

#### 0.0.4

1. 添加swiper-slide元素，export将分别导出组件
2. 使用Vue插件的形式

#### 0.0.6

1. ro-swiper-container添加overflow: hidden;

#### 0.0.7

1. ROSwiper添加loop属性，设置为false的情况下，将不会有循环效果
1. ROSwiperSlide添加slideClass属性，用于设置样式类

#### 0.0.8

1. 优化代码逻辑
1. 添加input事件，值为当前的slide的index

#### 0.0.9

1. 更新touch
1. 限制move事件中同时出现两个方向的滑动

#### 0.0.10

1. swiper-slide添加vertical-align: top