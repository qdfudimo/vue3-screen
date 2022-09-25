<template>
    <div class="left-bottom">
        <BorderBox10 class="left">
            <ScrollBoard :config="config"></ScrollBoard>
        </BorderBox10>
    </div>
</template>
<script setup>
import { BorderBox10, ScrollBoard } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
const config = reactive({
    header: ['地区', '新增', '累计', '死亡', '治愈'],
    oddRowBGC:"rgba(4,49,128,.1)",
    evenRowBGC:"rgba(4,49,128,.3)",
    headerBGC:"rgba(4,49,128,.6)",
    columnWidth: [56,76,120],
    waitTime:1000,
    headerHeight:42,
    rowNum:6,
    align:["center","center","center","center","center"],
    data: [
        ['广东', '12', '12314451', '13231', '454222'],
        ['广东', '13', '12314451', '13231', '454222'],
        ['广东', '15555', '12314451', '13231', '454222'],
        ['广东', '1', '12314451', '13231', '454222'],
        ['广东', '1', '12314451', '13231', '454222'],
        ['广东', '1', '12314451', '13231', '454222'],
        ['广东', '1', '12314451', '13231', '454222'],
        ['广东', '1', '12314451', '13231', '454222'],
        ['广东', '1', '12314451', '13231', '454222'],
    ]
})

</script>
<style lang="less" scoped>
.left-bottom {
    height: 60%;
    width: 100%;
    margin-top: 10px;

    :deep(.border-box-content) {
        padding: 10px;
        box-sizing: border-box;
    }
    :deep(.dv-scroll-board .rows .row-item) {
        font-size: 16px;
    }
}
</style>