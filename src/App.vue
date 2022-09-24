

<template>
  <div id="full-screen-container">
    <ScaleBox>
      <div class="main-warper" :style="{
        width: width + 'px',
        height: height + 'px',
      }">
        <BorderBox11 title="新冠病毒疫情可视化" class="mainBox">
          <div class="main-container">
            <div class="left-chart-container">
              <LeftTop />
              <LeftBottom />
            </div>
            <div class="middle-chart-container">
              <CenterTop></CenterTop>
              <CenterBottom></CenterBottom>
            </div>
            <div class="right-chart-container">
              <RightTop/>
              <RightCenter/>
              <RightBottom/>
            </div>
          </div>
        </BorderBox11>
      </div>
    </ScaleBox>
  </div>
</template>
<script setup>
import { provide } from 'vue';
import echarts from './util/commonEchart'
import ScaleBox from "./components/scaleBox.vue"
import LeftTop from "./components/leftContainer/LeftTop.vue"
import LeftBottom from './components/leftContainer/LeftBottom.vue';
import { BorderBox11 } from '@kjgl77/datav-vue3'
import CenterTop from './components/CenterContainer/CenterTop.vue';
import CenterBottom from './components/CenterContainer/CenterBottom.vue';
import RightTop from './components/RightContainer/RightTop.vue';
import RightCenter from './components/RightContainer/RightCenter.vue';
import RightBottom from './components/RightContainer/RightBottom.vue';
provide("echarts", echarts)
const { width, height } = screen
</script>
<style scoped lang="less">
#full-screen-container {
  width: 100%;
  height: 100vh;
  background-color: #030409;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  color: #fff;
}

// .mainBox {
//   :deep(.border-box-content) {
//     padding: 20px;
//     box-sizing: border-box;
//     display: flex;
//   }
// }
:deep(.border-box-content) {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
  }
.main-container {
  display: flex;
  height: 100%;
  width: 100%;
  box-sizing: content-box;
}

.main-warper {
  background-image: url('./img/bg.png');
  background-size: 100% 100%;
  box-shadow: 0 0 3px blue;
  display: flex;
  // flex-direction: column;
}

.left-chart-container {
  width: 30%;
  padding:20px 10px 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.middle-chart-container {
  width: 40%;
  padding-left: 5px;
  box-sizing: border-box;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
}

.right-chart-container {
  width: 30%;
  padding:20px 10px 0 10px;
  box-sizing: border-box;
}

// .logo:hover {
//   filter: drop-shadow(0 0 2em #646cffaa);
// }

// .logo.vue:hover {
//   filter: drop-shadow(0 0 2em #42b883aa);
// }
</style>
