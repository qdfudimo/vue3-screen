<template>
    <div class="center-top">
        <BorderBox12>
            <div class="map" ref="mapRef"></div>
        </BorderBox12>
    </div>
</template>
<script setup>
import { BorderBox12 } from '@kjgl77/datav-vue3'
import chinaJSON from "/public/china.json"
import { inject, onMounted, nextTick, onUnmounted, ref } from 'vue';
const mapRef = ref(null)
let myChart = null
let echarts = inject("echarts")
var data = [{
    name: '北京',
    value: 10
}, {
    name: '天津',
    value: 0
}, {
    name: '上海',
    value: 123
}, {
    name: '重庆',
    value: 45657
}, {
    name: '河北',
    value: 6132
}, {
    name: '河南',
    value: 234
}, {
    name: '云南',
    value: 22
}, {
    name: '辽宁',
    value: 55
}, {
    name: '黑龙江',
    value: 778
}, {
    name: '湖南',
    value: 990
}, {
    name: '安徽',
    value: 86
}, {
    name: '山东',
    value: 5332
}, {
    name: '新疆',
    value: 23
}, {
    name: '江苏',
    value: 2355
}, {
    name: '浙江',
    value: 2532
}, {
    name: '江西',
    value: 1231
}, {
    name: '湖北',
    value: 444
}, {
    name: '广西',
    value: 1233
}, {
    name: '甘肃',
    value: 112
}, {
    name: '山西',
    value: 12
}, {
    name: '内蒙古',
    value: 234
}, {
    name: '陕西',
    value: 755
}, {
    name: '吉林',
    value: 1235
}, {
    name: '福建',
    value: 12334
}, {
    name: '贵州',
    value: 121
}, {
    name: '广东',
    value: 555
}, {
    name: '青海',
    value: 333
}, {
    name: '西藏',
    value: 121
}, {
    name: '四川',
    value: 121
}, {
    name: '宁夏',
    value: 1
}, {
    name: '海南',
    value: 22
}]
const option = {
    //标题
    title: {
        text: '今日各省确诊地图数据',
        // subtext: '单位/万吨',
        itemGap: 30,
        left: 'center',
        textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 20
        },
        subtextStyle: {
            color: '#646464',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16
        }
    },
    //地图显示：移动鼠标，显示数据
    tooltip: {
        trigger: 'item',
        formatter: function (e) {
            var name = e.name ? e.name : '获取中';
            var value = e.value ? e.value : '暂无数据'
            return `${name}:<br>累计确诊:${value}（人） `
        }

    },
    //图例
    visualMap: [{
        min: 0,
        type: "piecewise",
        max: 99999,
        left: 0,
        // bottom: 40,
        showLabel: !0,
        // text: ["高","低"],
        textStyle: {
            color: '#black',
            fontSize: 14
        },
        // selectedMode:false,
        pieces: [{
            gt: 10000,
            label: "> 10000人",
            color: "#7f1100"
        }, {
            gte: 1000,
            lt: 10000,
            label: "1000-9999 人",
            color: "#ed6d3d"
        }, {
            gt: 500,
            lt: 10000,
            label: "500-999 人",
            color: "#ff8c71"
        }, {
            gt: 100,
            lt: 500,
            label: "100-499 人",
            color: "#ffd768"
        }, {
            gt: 10,
            lt: 100,
            label: "10-99 人",
            color: "#fddea5"
        }, {
            gt: 1,
            lt: 10,
            label: "1-9人",
            color: "#fff1cf"
        }, {
            gt: 0,
            lt: 1,
            label: "0 人",
            color: "#e3e3e3"
        }],
        show: !0
    }],
    //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
    toolbox: {
        show: false,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {
                readOnly: false
            },
            restore: {},
            saveAsImage: {}
        }
    },
    geo: {
        map: 'china',
        roam: true, //是否允许缩放，拖拽
        //初始化大小
        zoom: 1.2,
        left: 130,
        //缩放大小限制
        scaleLimit: {
            min: 0.8, //最小
            max: 10, //最大
        },
        label: {
            //地图上的字是否显示颜色
            normal: {
                show: true,
                color: '#fff',
                fontSize: 12
            },
            //经过地图上某个省市的字是否显示颜色
            emphasis: {
                show: true,
                color: '#292929'
            }
        },
        //地图区域的多边形 图形样式。
        itemStyle: {
            normal: {
                areaColor: '#fbfbfb',
                borderColor: '#3399FF'

            },
            emphasis: {
                areaColor: '#CC9933'
            }
        }
    },
    series: [{
        type: 'map',
        mapType: 'china',
        geoIndex: 0,
        label: {
            normal: {
                show: true
            },
            emphasis: {
                show: true
            }
        },
        data: data
    }]
};
onMounted(() => {
    myChart = echarts.init(mapRef.value)
    echarts.registerMap('china', chinaJSON) //注册可用的地图
    myChart && myChart.setOption(option);
})
onUnmounted(() => {
    myChart && myChart.dispose();
    myChart = null;
})

</script>
<style lang="less" scoped>
.center-top {
    height: 50%;
    width: 100%;

    .map {
        width: 100%;
        height: 100%;
    }
}
</style>