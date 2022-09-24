<template>
    <div class="left-center">
        <BorderBox3>2222</BorderBox3>
    </div>
</template>
<script setup>
import { BorderBox3 } from '@kjgl77/datav-vue3'
const { width, height } = screen
</script>
<style lang="less" scoped>
.left-center {
    height: 33%;
    width: 100%;
    /deep/  .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
}
</style>