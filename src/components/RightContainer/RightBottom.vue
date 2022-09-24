<template>
    <div class="right-botttom">
        <BorderBox4>
            <div>今日热词</div>
        </BorderBox4>
    </div>
</template>
<script setup>
import { BorderBox4 } from '@kjgl77/datav-vue3'
</script>
<style lang="less" scoped>
.right-botttom {
    height: 33.33%;
    width: 100%;
    :deep(.border-box-content)  {
      padding: 22px;
      box-sizing: border-box;
      display: flex;
    }
}
</style>