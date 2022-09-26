
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return () => {
            return <div class="empty">
                <svg-icon name="empty" style="fontSize:120px"></svg-icon>
                <div>暂无数据</div>
            </div>
        }
    }
})
</script>
<style lang="less" scoped>
.empty {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
        font-size: 22px;
        font-weight: 700;
    }
}
</style>