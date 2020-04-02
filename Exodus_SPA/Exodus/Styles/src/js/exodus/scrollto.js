import { register } from './load';

register('[data-scrollto]', bind);

function bind(element) {
    let viewport = document.querySelector(element.dataset.viewport);
    let target = document.querySelector(element.dataset.scrollto);
    element.addEventListener('click', handleClick);
    viewport.addEventListener('scroll', handleScroll);

    function handleClick() {
        let scrollTop;
        if (target.classList.contains('ex-panel_close')) {
            const panel = target.querySelector('.ex-panel__content');
            panel.style.display = null;
            scrollTop = target.offsetTop - (viewport.offsetHeight - target.offsetHeight) / 2;
            panel.style.display = 'none';            
            target.classList.remove('ex-panel_close');
            $(panel).slideDown();
        } else {
            scrollTop = target.offsetTop - (viewport.offsetHeight - target.offsetHeight) / 2;
        }
        $(viewport).animate({ scrollTop });
    }

    function handleScroll(event) {
        const middle = viewport.scrollTop + viewport.offsetHeight / 2;
        const start = target.offsetTop;
        const end = target.offsetTop + target.offsetHeight + 30;

        if (middle >= start && middle <= end) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    }
}    
 