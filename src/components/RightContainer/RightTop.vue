<template>
    <div class="right-top">
        <BorderBox1 :reverse="true">
            <div>高风险地区中风险地区</div>
        </BorderBox1>
    </div>
</template>
<script setup>
import { BorderBox1 } from '@kjgl77/datav-vue3'
</script>
<style lang="less" scoped>
.right-top {
    height: 33.33%;
    width: 100%;
    :deep(.border-box-content)  {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
}
</style>