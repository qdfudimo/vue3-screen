<template>
    <div class="left-top">
        <BorderBox3>
            <div class="container">
                <div :class="['cover',key]" v-for=" (value, key) in chinaTotal.today" :key="key">
                    <h4>{{MapKey.get(key)}}</h4>
                    <div class="numberData">
                        {{chinaTotal.total[key]}}
                    </div>
                    <div class="added"><span>较昨日+</span>{{value}}</div>
                </div>
            </div>
        </BorderBox3>
    </div>
</template>
<script setup>
import { BorderBox3 } from '@kjgl77/datav-vue3';
import { reactive } from 'vue';
import { MapKey } from "@/config/index.js";
let chinaTotal = reactive({
    today: {
        input: 105,
        noSymptom: 726,
        storeConfirm: 89471,
        confirm: 90953,
        dead: 124,
        heal: 1358,
    },
    total: {
        confirm: 6792066,
        noSymptom: 14289,
        heal: 337499,
        dead: 25868,
        storeConfirm: 648699,
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
        margin:0 5px;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        h4 {
            font-size: 20px;
            text-align: center;
            margin: 0;
            color: #fff;
        }
        .numberData {
            text-align: center;
            width: 100%;
            font: 700 22px/54px DIN Alternate,din_alternate_bold,-apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
            overflow: hidden;
        }
        .added {
            font-size: 16px;
            font: 700 15px DIN Alternate,din_alternate_bold,-apple-system-font,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial;
            span {
                color: #fff;
                // font-weight: 800;
            }
        }
    }
    .input {
        color: #ffa352;
    }
    .noSymptom {
        color: #cdcdcd;
        // color: #1296db;
    }
    .storeConfirm {
        color: #e44a3d;
    }
    .confirm {
        color: #a31d13;
    }
    .dead {
        color: #707070;
    }
    .heal {
        color: #34aa70;
    }
}
</style>