<template>
    <div class="right-center">
        <BorderBox6>
            <div class="input">
                <div class="rankTitle">国外疫情数据排行</div>
                <ScrollRankingBoard :config="config" />
            </div>
        </BorderBox6>
    </div>
</template>
<script setup>
import { BorderBox6, ScrollRankingBoard } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
const config = reactive({
    data: [
        {
            name: '周口',
            value: 55
        },
        {
            name: '南阳',
            value: 120
        },
        {
            name: '西峡',
            value: 78
        },
        {
            name: '驻马店',
            value: 66
        },
        {
            name: '新乡',
            value: 80
        },
        {
            name: '信阳',
            value: 45
        },
        {
            name: '漯河',
            value: 29
        }
    ]
})
</script>
<style lang="less" scoped>
.right-center {
    height: 35%;
    width: 100%;

    :deep(.border-box-content) {
        padding: 18px;
        box-sizing: border-box;
        display: flex;
    }
    .input {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .rankTitle {
        font-size: 16px;
        padding-bottom: 10px;
        font-weight: 700;
    }
}
</style>