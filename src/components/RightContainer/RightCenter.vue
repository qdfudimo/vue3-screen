<template>
    <div class="right-center">
        <BorderBox6>
            <div class="input">
                <div class="rankTitle">国外疫情数据排行</div>
                <ScrollRankingBoard :config="config" class="RankingBoard" />
            </div>
        </BorderBox6>
    </div>
</template>
<script setup>
import { BorderBox6, ScrollRankingBoard } from '@kjgl77/datav-vue3';
import { reactive, watch } from 'vue';
const props = defineProps({
    areaList: {
        type: Array,
        default: []
    }
})
watch(() => props.areaList, () => {
    config.data = props.areaList
})
const config = reactive({
    data: [],
    waitTime: 1000
})
</script>
<style lang="less" scoped>
.right-center {
    height: 40%;
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

        .RankingBoard {
            :deep(.ranking-info) {
                font-size: 15px;
            }
        }
    }

    .rankTitle {
        font-size: 16px;
        padding-bottom: 10px;
        font-weight: 700;
    }
}
</style>