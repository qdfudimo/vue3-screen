<template>
    <div class="center-bottom" @mouseenter="enterLine" @mouseleave="leaveLine">
        <BorderBox13>
            <div class="map" ref="lineRef"></div>
        </BorderBox13>
    </div>
</template>
<script setup>
import { BorderBox13 } from '@kjgl77/datav-vue3'
import { inject, onMounted, onUnmounted, ref } from 'vue';
const lineRef = ref(null)
let lineChart = null;
let xLabel = ['7.30', '7.31', '08.01', '08.04', '08.02', '08.07', '08.05'];
let timer = null;
let echarts = inject("echarts")
const option = {
    title: {
        text: '30日全国确诊数据',
        textStyle: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20
        },
    },
    backgroundColor: "rgba(14, 28, 71,.6)",
    grid: {
        x: 50,
        y: 45,
        x2: 10,
        y2: 25,
    },
    xAxis: {
        type: 'category',
        //坐标轴线
        axisLine: {
            lineStyle: {
                color: "rgba(255,255,255,1)",
                width: 2,
                cap: "round"
            }
        },
        //坐标轴刻度
        axisTick: {
            alignWithLabel: true,
            lineStyle: {
                color: "rgba(255,255,255,1)",
                width: 2,
            }
        },
        //坐标轴刻度标签
        axisLabel: {
            fontSize: 14
        },
        data: xLabel
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            fontSize: 14,
            // color: "#192a44"
            color: "rgba(255,255,255,1)"
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "#233653"
            }
        },
        //#7ec7ff
    },
    //显示底部硕放
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    tooltip: {
        trigger: 'axis',
        // backgroundColor: "transparent",
        //标线渐变
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(126,199,255,.2)' // 0% 处的颜色
                    }, {
                        offset: 0.5,
                        color: ' rgba(126,199,255,1)'// 100% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(126,199,255,.2)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
            label: {
                backgroundColor: '#283b56'
            }
        },
        textStyle: {
            fontSize: 16
        }
    },
    series: [
        {
            data: [820, 932, 901, 934, 560, 1330, 130],
            type: 'line',
            smooth: true,
            //折线上的圆点大小
            symbolSize: 6,
            // areaStyle: {},
            //是否连接空数据。
            connectNulls: true,
            itemStyle:{
              normal:{
                  color:'#fff',//拐点颜色
                  borderColor:'#000000',//拐点边框颜色
                  borderWidth:3//拐点边框大小
              },
              emphasis: {
                    color: 'transparent'//hover拐点颜色定义
                }
            },
            lineStyle: {        // 系列级个性化折线样式
                width: 3,
                // type: 'solid',
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#7f1100'
                }, {
                    offset: 1,
                    color: '#F9D423'
                }]),//线条渐变色
            },
            areaStyle: { //区域填充样式
                normal: {
                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(10,219,250,.3)"
                    },
                    {
                        offset: 1,
                        color: "rgba(10,219,250, 0)"
                    }
                    ], false),
                    shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
            },
            label: {
                show: true,
                position: 'top',
                fontSize: 16,
                color: "#fff"
            },
        }
    ]
};
let len = 0
const changeLine = () => {
    timer = setInterval(() => {
        if (len === xLabel.length) {
            len = 0
        }
        lineChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: len,
        })
        len++
    }, 1000)
}
const clearTime = () => {
    clearInterval(timer)
    timer = null;
}
const enterLine = () => {
    clearTime()
}
const leaveLine = () => {
    changeLine()
}
onMounted(() => {
    lineChart = echarts.init(lineRef.value)
    lineChart && lineChart.setOption(option);
    changeLine()
})
onUnmounted(() => {
    lineChart && lineChart.dispose();
    lineChart = null;
    clearTime()
})
</script>
<style lang="less" scoped>
.center-bottom {
    height: 50%;
    width: 100%;

    .map {
        width: 100%;
        height: 100%;
    }
}
</style>