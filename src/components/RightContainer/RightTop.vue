<template>
  <div class="right-top">
    <BorderBox1 :reverse="true">
      <div class="danger">
        <div class="common-danger hight">
          <div class="risk common">高风险(0)</div>
          <div class="containers common">
            <div class="water_tips" :style="`animation-duration: 10s;`">
              <span class="water_text scroll1">暂无数据||暂无数据暂无数据||暂无数据||暂无数据||暂无数据||暂无数据||</span>
              <span class="water_text scroll2">暂无数据||暂无数据暂无数据||暂无数据||暂无数据||暂无数据||暂无数据||</span>
            </div>
          </div>
        </div>
        <div class="common-danger in">
          <div class="risk common">中风险(0)</div>
          <div class="containers common">
            <div class="water_tips" :style="`animation-duration: 10s;`">
              <span class="water_text scroll1">暂无数据||暂无数据暂无数据||暂无数据||暂无数据||暂无数据||暂无数据||</span>
              <span class="water_text scroll2">暂无数据||暂无数据暂无数据||暂无数据||暂无数据||暂无数据||暂无数据||</span>
            </div>
          </div>
        </div>
        <div class="relation">
          <div class="hight_relation" ref="highCharts"></div>
        </div>
      </div>
    </BorderBox1>
  </div>
</template>
<script setup>
import { BorderBox1 } from '@kjgl77/datav-vue3';
import { ref, inject, watch, onMounted, onUnmounted } from 'vue';
const highCharts = ref("")
let echarts = inject("echarts")
let myChart = null;
const props = defineProps({
  hightRelationList: {
    type: Array,
    default: []
  }
});
let colorList = [
  "#CF4645",
  "#B580B2",
  "#29008A",
  "#146A90",
  "#8956FF",
  "#70C9A8",
  "#bfbfbf",
  "#595959",
  "#40a9ff",
  "#1890ff",
  "#ffd666",
  "#ffc53d",
  "#ffc53d",
  "#ffc069",
  "#ffa940",
  "#fa8c16",
  "#eccbd9",
  "#ffadad",
  "#ff6392",
  "#ffc09f",
  "#ffcb77",
  "#ffe066",
  "#ffd53e",
  "#ffda3d",
  "#adf7b6",
  "#a0e8af",
  "#80ed99",
  "#07beb8",
  "#17c3b2",
  "#48cae4",
  "#97d2fb",
  "#83bcff",
  "#91e5f6",
  "#9381ff",
];
let colorListLen = colorList.length;
let fontSizeList = [
  12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19,
  19.5, 20, 20.5, 21, 22, 23, 24,
];
let fontSizeListLen = fontSizeList.length;
let bgColor = "transparent";
let canDraggable = false;
const drawChats = () => {
  let data = props.hightRelationList.map(item => {
    return {
      name: item.name,
      value: item.value,
      draggable: canDraggable,
      itemStyle: {
        color: bgColor,
      },
      label: {
        color: colorList[Math.floor(Math.random() * colorListLen)],
        fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)],
      },
    }
  })
  let option = {
    animation: true,
    backgroundColor: "transparent",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    title: {
      show: true,
      text: "确诊省份",
      x: "center",
      y: "bottom",
      // 文字的颜色,默认 #333。
      textStyle :{
        color: "#999",
        fontSize: 18,
      }
    },
    toolbox: {
      show: false,
      feature: {
        // dataView: {readOnly: false},
        // magicType: {type: ['line', 'bar']},
        restore: {},
        // saveAsImage: {}
      },
    },
    itemStyle: {
      color: bgColor,
    },
    series: [
      {
        type: "graph",
        layout: "force",
        zoom:0.8,
        left:0,
        rigth:0,
        bottom:20,
        force: {
          repulsion: 80,
          edgeLength: 10,
        },
        roam: "scale",
        // symbol: '',
        // symbolSize: 0,
        label: {
          show: true,
          color: "auto",
          fontSize: 14,
        },
        data: data
      },
    ],
  };
  myChart = echarts.init(highCharts.value)
  myChart && myChart.setOption(option);
}
onMounted(() => {
  watch(() => props.hightRelationList, () => {
    drawChats()
  })
  // setInterval(() => {
  //   let data = props.hightRelationList.map(item => {
  //     return {
  //       name: item.name,
  //       value: item.value,
  //       draggable: canDraggable,
  //       itemStyle: {
  //         color: bgColor,
  //       },
  //       label: {
  //         color: colorList[Math.floor(Math.random() * colorListLen)],
  //         fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)],
  //       },
  //     }
  //   })
  //   myChart.setOption({
  //     series: [
  //       {
  //         data: data
  //       }
  //     ]
  //   })
  // }, 6000);
})
onUnmounted(() => {
  myChart && myChart.dispose();
  myChart = null;
})
    // scroll.value.style.width = scroll.value.getBoundingClientRect().width * 2 + "px"
</script>
<style lang="less" scoped>
.right-top {
  height: 50%;
  width: 100%;

  :deep(.border-box-content) {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
  }
}

.danger {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.common-danger {
  height: 38px;
  width: 100%;
  background-color: #000;
  text-align: left;
  display: flex;
  font-size: 16px;
  line-height: 38px;

  &.hight {
    color: rgb(236, 71, 46);
  }

  &.in {
    margin-top: 12px;
    color: rgb(222, 184, 12);

    .common {
      border-bottom: 3px solid rgb(222, 184, 12);
    }
  }
}

.risk {
  font-weight: 700;
  margin-right: 10px;
  padding: 0 10px;
}

.common {
  background-color: rgb(29, 27, 27);
  border-radius: 6px;
  border-bottom: 3px solid rgb(165, 32, 32);
}

.relation {
  display: flex;
  flex: 1;
  margin-top: 10px;
  display: flex;

  .hight_relation {
    flex: 1;
    overflow: hidden;
    margin-right: 5px;
    border: 2px solid rgb(206, 151, 50);
  }

}

.containers {
  flex: 1;
  overflow: hidden;
  // font-weight: 700;
}

.water_tips {
  width: fit-content;
  overflow: hidden;
  position: relative;
  animation-name: seamless-scrolling; // Q3
  animation-timing-function: linear; // 动画速度曲线，匀速
  animation-iteration-count: infinite; // 动画循环无限次播放
  animation-duration: 4s;
  white-space: nowrap;

}

.water_text {
  white-space: nowrap;
  display: inline-block;
}

@keyframes seamless-scrolling {
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(-50%); //Q2
  }
}
</style>