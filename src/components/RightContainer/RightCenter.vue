<template>
    <div class="right-center">
        <BorderBox6>
            <div>境外输入top10柱状图</div>
        </BorderBox6>
    </div>
</template>
<script setup>
import { BorderBox6 } from '@kjgl77/datav-vue3'
</script>
<style lang="less" scoped>
.right-center {
    height: 33.33%;
    width: 100%;
    :deep(.border-box-content)  {
      padding: 22px;
      box-sizing: border-box;
      display: flex;
    }
}
</style>