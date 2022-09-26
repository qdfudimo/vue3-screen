<template>
    <div class="right-botttom">
        <BorderBox4>
            <div class="day">
                <div class="hostTitle">数据来源：<span>网易新闻</span></div>
                <Decoration4 :reverse="true" style="width:100%;height:5px;margin: 8px 4px;" />
                <div class="time">截至 {{UpdateTime}}</div>
            </div>
        </BorderBox4>
    </div>
</template>
<script setup>
import { BorderBox4 ,Decoration4} from '@kjgl77/datav-vue3'
import { inject } from 'vue';
let UpdateTime = inject("UpdateTime")
console.log(UpdateTime);
</script>
<style lang="less" scoped>
.right-botttom {
    height: 10%;
    width: 100%;
    :deep(.border-box-content)  {
      padding: 24px 24px 16px;
      box-sizing: border-box;
      display: flex;
    }
    .day {
        display: flex;
        flex-direction: column;
        width: 100%;
        color: #999;
        .time {
            text-align: right;
        }
    }
    .hostTitle {
        margin-left: 12px;
    }
}
</style>