<template>
    <div class="left-top">
        <BorderBox3>
            <div class="container">
                <div class="cover">
                    <h4>境外输入</h4>
                    <div class="number">
                        1111
                    </div>
                    <div class="added"><span>较昨日</span>90953</div>
                </div>
                <div class="cover">2</div>
                <div class="cover">3</div>
                <div class="cover">4</div>
                <div class="cover">5</div>
                <div class="cover">6</div>
            </div>
        </BorderBox3>
    </div>
</template>
<script setup>
import { BorderBox3 } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
let chinaTotal = reactive({
    today: {
        confirm: 90953,
        incrNoSymptom: 726,
        heal: 1358,
        dead: 124,
        storeConfirm: 89471,
        input: 105
    },
    total: {
        confirm: 6792066,
        noSymptom: 14289,
        heal: 337499,
        dead: 25868,
        todayConfirm: 648699,
        input: 23632
    }
})
</script>
<style lang="less" scoped>
.left-top {
    height: 40%;
    width: 100%;

    :deep(.border-box-content) {
        padding: 22px;
        box-sizing: border-box;
        display: flex;
    }
}

.container {
    padding: 10px;
    height: 100%;
    width: 100%;
    // background-color: aqua;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .cover {
        width: calc(calc(100% / 3) - 10px);
        margin: 5px;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h4 {
            font-size: 20px;
            text-align: center;
            margin: 0;
        }
        .number {
            font-size: 24px;
            color: #ffa352;
            margin: 18px 0;
        }
        .added {
            font-size: 18px;
        }
    }
}
</style>