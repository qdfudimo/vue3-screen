<template>
    <div class="right-botttom">
        <BorderBox4>
            <div class="day">
                <div class="hostTitle">今日热词</div>
                <div class="host_relation" ref="highCharts"></div>
            </div>
        </BorderBox4>
    </div>
</template>
<script setup>
import { BorderBox4 } from '@kjgl77/datav-vue3'
</script>
<style lang="less" scoped>
.right-botttom {
    height: 15%;
    width: 100%;
    :deep(.border-box-content)  {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
    .day {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .hostTitle {
        font-size: 16px;
        padding-bottom: 10px;
        font-weight: 700;
    } 
    .host_relation {
        flex: 1;
    }
}
</style>