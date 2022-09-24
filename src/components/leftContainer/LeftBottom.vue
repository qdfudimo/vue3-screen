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
    header: ['地区', '新增', '现有', '累计', '死亡', '治愈'],
    oddRowBGC:"rgba(4,49,128,.1)",
    evenRowBGC:"rgba(4,49,128,.3)",
    headerBGC:"rgba(4,49,128,.6)",
    data: [
        ['行1列1', '行1列2', '行1列3', '行1列3', '行1列3', '行1列3'],
        ['行2列1', '行2列2', '行2列3', '行1列3', '行1列3', '行1列3'],
        ['行3列1', '行3列2', '行3列3', '行1列3', '行1列3', '行1列3'],
        ['行4列1', '行4列2', '行4列3', '行1列3', '行1列3', '行1列3'],
        ['行5列1', '行5列2', '行5列3', '行1列3', '行1列3', '行1列3'],
        ['行6列1', '行6列2', '行6列3', '行1列3', '行1列3', '行1列3'],
        ['行7列1', '行7列2', '行7列3', '行1列3', '行1列3', '行1列3'],
        ['行8列1', '行8列2', '行8列3', '行1列3', '行1列3', '行1列3'],
        ['行9列1', '行9列2', '行9列3', '行1列3', '行1列3', '行1列3'],
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
}
</style>