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
        if (len === xLabel.value.length) {
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
            text: '30?????????????????????(????????????)',
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
            //????????????
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,1)",
                    width: 2,
                    cap: "round"
                }
            },
            //???????????????
            axisTick: {
                alignWithLabel: true,
                lineStyle: {
                    color: "rgba(255,255,255,1)",
                    width: 2,
                }
            },
            //?????????????????????
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
        //??????????????????
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        tooltip: {
            trigger: 'axis',
            // backgroundColor: "transparent",
            //????????????
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
                            color: 'rgba(126,199,255,.2)' // 0% ????????????
                        }, {
                            offset: 0.5,
                            color: ' rgba(126,199,255,1)'// 100% ????????????
                        }, {
                            offset: 1,
                            color: 'rgba(126,199,255,.2)' // 100% ????????????
                        }],
                        global: false // ????????? false
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
                //????????????????????????
                symbolSize: 6,
                // areaStyle: {},
                //????????????????????????
                connectNulls: true,
                itemStyle: {
                    normal: {
                        color: '#fff',//????????????
                        borderColor: '#000000',//??????????????????
                        borderWidth: 3//??????????????????
                    },
                    emphasis: {
                        color: 'transparent'//hover??????????????????
                    }
                },
                lineStyle: {        // ??????????????????????????????
                    width: 3,
                    // type: 'solid',
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#7f1100'
                    }, {
                        offset: 1,
                        color: '#F9D423'
                    }]),//???????????????
                },
                areaStyle: { //??????????????????
                    normal: {
                        //??????????????????4??????????????????x0,y0,x2,y2(??????0~1);????????????????????????????????????????????????????????????????????????true?????????????????????????????????????????????
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "rgba(10,219,250,.3)"
                        },
                        {
                            offset: 1,
                            color: "rgba(10,219,250, 0)"
                        }
                        ], false),
                        shadowColor: 'rgba(10,219,250, 0.5)', //????????????
                        shadowBlur: 20 //shadowBlur???????????????????????????????????????shadowColor,shadowOffsetX/Y, ??????????????????????????????
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