export default {
    bind(el, binding, vnode) {
        el.setAttribute('placeholder', '+7 (___) ___-__-__');
        el.addEventListener('keydown', (e) => {
            if( !(e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Backspace' || e.key == 'Tab')) { e.preventDefault() }
            let mask = '+7 (111) 111-11-11';

            if (/[0-9\+\ \-\(\)]/.test(e.key)) {
                let currentString = el.value,
                    currentLength = currentString.length;
                if (/[0-9]/.test(e.key)) {
                    if (mask[currentLength] == '1') {
                        el.value = currentString + e.key;
                        vnode.elm.dispatchEvent(new CustomEvent('input'));
                    } else {
                        for (let i = currentLength; i < mask.length; i++) {
                            if (mask[i] == '1') {
                                el.value = currentString + e.key;
                                vnode.elm.dispatchEvent(new CustomEvent('input'));
                                break;
                            }
                            currentString += mask[i];
                        }
                    }
                }
            }
        });
    }
}