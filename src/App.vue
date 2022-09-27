

<template>
  <div id="full-screen-container">
    <ScaleBox>
      <div class="main-warper" :style="{
        width: width + 'px',
        height: height + 'px',
      }">
        <div class="github"><a href="https://github.com/qdfudimo/vue3-screen" target="_blank"
            rel="noopener noreferrer"><svg-icon name="github" style="color:#fff;fontSize:22px"></svg-icon>https://github.com/qdfudimo/vue3-screen</a></div>
        <BorderBox11 title="新冠病毒疫情可视化" class="mainBox">
          <div class="main-container">
            <div class="left-chart-container">
              <LeftTop :confirmData="confirmData" />
              <LeftBottom :cityList="cityList" />
            </div>
            <div class="middle-chart-container">
              <CenterTop :MapCityList="MapCityList"></CenterTop>
              <CenterBottom :xLabel="chinaCityDayList.xLabel" :conformData="chinaCityDayList.conformData">
              </CenterBottom>
            </div>
            <div class="right-chart-container">
              <RightTop :hightRelationList="hightRelationList" />
              <RightCenter :areaList="areaList" />
              <RightBottom />
            </div>
          </div>
        </BorderBox11>
      </div>
    </ScaleBox>
  </div>
</template>
<script setup>
import { onBeforeMount, computed, provide, reactive, ref } from 'vue';
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
import { getChinaDayList, getWorldDayList } from "@/api/dayList";
let confirmData = reactive({
  today: {},
  total: {}
})
let areaList = ref([]);
let cityList = ref([]);
let MapCityList = ref([]);
let hightRelationList = ref([]);
const UpdateTime = ref("")
let chinaCityDayList = reactive({
  xLabel: [],
  conformData: []
})
onBeforeMount(() => {
  getChinaDayList().then(res => {
    if (res.code == 200) {
      let { today = {}, total = {}, lastUpdateTime = "", chinaDayList = [] } = res.data
      confirmData.today = today
      confirmData.total = total
      let xLabel = chinaDayList.map(item => item.date)
      let conformData = chinaDayList.map(item => item.today.confirm)
      chinaCityDayList.xLabel = xLabel
      chinaCityDayList.conformData = conformData
      UpdateTime.value = lastUpdateTime;
    }
  }).catch(error => {
    // console.log(error);
  })
  getWorldDayList().then(res => {
    if (res.code == 200) {
      let { chinaCityData = {}, areaTreeList = [] } = res.data
      let { children = [] } = chinaCityData;
      areaList.value = areaTreeList.map(item => {
        return {
          name: item.name,
          value: item.today.confirm,
        }
      });
      let list = children.map(item => {
        return [item.name, item.today.confirm, item.total.confirm, item.total.dead, item.total.heal]
      })
      cityList.value = list;
      //total.storeConfirm = total.confirm - total.dead - total.heal;
      let MapList = children.map(item => {
        let { total } = item
        return {
          name: item.name,
          value: (total.confirm - total.dead - total.heal) || 0
        }
      })
      MapCityList.value = MapList
      let hightRelation = children.filter(item => item.today.confirm).map(item => {
        return { name: item.name, value: item.today.confirm }
      })
      hightRelationList.value = hightRelation
    }
  }).catch(error => {
    // console.log(error);
  })
})

provide("echarts", echarts)
provide("UpdateTime", UpdateTime)

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
  padding: 20px 10px 0 10px;
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
  padding: 20px 10px 0 10px;
  box-sizing: border-box;
}

// .logo:hover {
//   filter: drop-shadow(0 0 2em #646cffaa);
// }

// .logo.vue:hover {
//   filter: drop-shadow(0 0 2em #42b883aa);
// }
.github {
  position: fixed;
  right: 10px;
  top: 6px;
  color: #fff;
  z-index: 9999;
  a {
    color: #fff;
    line-height: 22px;
  }
}
</style>
