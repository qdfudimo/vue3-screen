export let debounce = (fn, delay) => {
    // 固定好16：9的宽高比，计算出最合适的缩放比
    const delays = delay || 100;
    let timer;
    return function () {
        const th = this;
        const args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delays);
    };
}