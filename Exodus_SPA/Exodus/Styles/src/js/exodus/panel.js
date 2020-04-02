import { register } from './load';

register('.ex-panel', bind);

function bind(panel) {
    const toggle = panel.querySelector('.ex-panel__toggle');
    const content = panel.querySelector('.ex-panel__content');

    if (!toggle) return;

    toggle.addEventListener('click', function(){
        panel.classList.toggle('ex-panel_close');
        $(content).slideToggle();
    });
}
