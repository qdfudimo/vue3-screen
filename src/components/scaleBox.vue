<template>
    <div class="ScaleBox" :ref="scaleBox" :style="{
      width: width + 'px',
      height: height + 'px',
    }">
        <slot></slot>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { debounce } from "../util/index"
let scaleBox = ref("");
let scale = reactive({
    w:1,
    h:1,
});
const { width, height } = screen
let getScale = () => {
    const wh = window.innerHeight / height;
    const ww = window.innerWidth / width;
    return [wh,ww];
}
let setScale = (e) => {
    // 缩放比
    scale.h = getScale()[0];
    scale.w = getScale()[1];
}
let reCalc = debounce(setScale)
onMounted(() => {
    setScale();
    window.addEventListener("resize", reCalc);
})
onUnmounted(()=>{
    window.removeEventListener("resize", reCalc)
})
</script>
<script>
export default {
    name: "ScaleBox"
}
</script>

<style lang="less" scoped>
.ScaleBox {
    position: absolute;
    transform: scale(v-bind('scale.w'),v-bind('scale.h')) translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    transform-origin: top left;
    left: 50%;
    top: 50%;
    transition: 0.2s;
    z-index: 999;
    // background: rgba(255, 0, 0, 0.3);
}
</style>
