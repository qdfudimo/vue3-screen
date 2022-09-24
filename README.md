# 疫情大屏可视化
前台技术栈：`vue3+datav+vite`
后台数据：`node+axios`

## 开发

```bash
# 克隆项目
git clone https://github.com/qdfudimo/vue3-screen.git

# 进入项目目录
cd vue3-screen

# 安装依赖
pnpm install

pnpm install --registry=https://registry.npm.taobao.org

# 启动服务
pnpm run dev
```
## 大屏适配方案
案例中采用了`css3`的缩放`transform: scale(X,y)`属性，改变分辨率时，`scale`的值是变化的。
通过获取当前屏幕大小screen和当前窗口大小,我们只要监听浏览器窗口大的小，同时控制变化的比例就可以了。
```
const { width, height } = screen
 const w = window.innerWidth / width
 const h = window.innerHeight / height
this.style.transform = 'scale(' + x +"," + y ') translate(-50%, -50%)'

```
也可以使用vue3的css样式绑定
https://cn.vuejs.org/api/sfc-css-features.html#v-bind-in-css
```
<script setup>
const theme = {
  color: 'red'
}
</script>
<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```
