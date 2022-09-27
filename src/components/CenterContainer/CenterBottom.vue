<template>
    <!-- <div class="center-bottom"> -->
    <div class="center-bottom" @mouseenter="enterLine" @mouseleave="leaveLine">
        <BorderBox13>
            <div class="map" ref="lineRef"></div>
        </BorderBox13>
    </div>
</template>
<script setup>
import { BorderBox13 } from '@kjgl77/datav-vue3'
import { inject, onMounted, computed, onUnmounted, nextTick, ref, watch } from 'vue';
const lineRef = ref(null)
let lineChart = null;
let echarts = inject("echarts")
const props = defineProps({
    xLabel: {
        type: Array,
        default: []
    },
    conformData: {
        type: Array,
        default: []
    },
});
let xLabel = computed(() => {
    return props.xLabel.slice(0, 7) || []
})
let conformData = computed(() => {
    return props.conformData.slice(0, 7) || []
})
let timer = null;
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
    }, 2000)
}
const clearTime = () => {
    timer && clearInterval(timer)
    timer = null;
}
const enterLine = () => {
    clearTime()
}
const leaveLine = () => {
    props.xLabel.length && changeLine()
}
let dataTime = null;
let XLen = xLabel.value.length || 7
const pushConformData = () => {
    if (!lineChart) return
    dataTime = setInterval(() => {
        if (XLen == props.xLabel.length) {
            XLen = 0
        }
        xLabel.value.shift()
        xLabel.value.push(props.xLabel[XLen])
        conformData.value.shift()
        conformData.value.push(props.conformData[XLen])
        lineChart.setOption({
            xAxis:
            {
                data: xLabel.value
            }
            ,
            series: [
                {
                    data: conformData.value
                }
            ]
        });
        XLen++
    }, 2000)
}
const drawChats = () => {
    const option = {
        title: {
            text: '30日全国确诊数据(含港澳台)',
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20
            },
        },
        backgroundColor: "rgba(14, 28, 71,.6)",
        grid: {
            x: 60,
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
                fontSize: 14,
                formatter: function (str) {
                    return str.slice(5)
                }
            },
            data: xLabel.value
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
                data: conformData.value,
                type: 'line',
                smooth: true,
                //折线上的圆点大小
                symbolSize: 6,
                // areaStyle: {},
                //是否连接空数据。
                connectNulls: true,
                itemStyle: {
                    normal: {
                        color: '#fff',//拐点颜色
                        borderColor: '#000000',//拐点边框颜色
                        borderWidth: 3//拐点边框大小
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
    lineChart = echarts.init(lineRef.value)
    lineChart && lineChart.setOption(option);
}
onMounted(() => {
    watch(() => props.xLabel, () => {
        drawChats()
        if (lineChart) {
            props.xLabel.length && changeLine()
            pushConformData()
        }
    })
})
onUnmounted(() => {
    lineChart && lineChart.dispose();
    lineChart = null;
    clearTime()
    dataTime && clearInterval(dataTime)
    dataTime = null
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