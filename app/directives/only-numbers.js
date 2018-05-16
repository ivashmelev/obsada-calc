export default {
    bind(el, binding, vnode) {
        el.addEventListener('input', () => {
            if (!/^[0-9]*$/.test(el.value)) {
                el.value = el.value.slice(0, -1);
                vnode.elm.dispatchEvent(new CustomEvent('input'));
            }
        })
    }
}