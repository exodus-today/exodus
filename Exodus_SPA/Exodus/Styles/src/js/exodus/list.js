import { register } from './load';

register('.ex-list', bind);

function bind(element) {
    let active = element.querySelector('.ex-list__item_active');
    let items = element.querySelectorAll('.ex-list__viewport .ex-list__item');

    items.forEach(item=>item.addEventListener('click', handleClick));

    function handleClick(event) {
        active && active.classList.remove('ex-list__item_active');
        active = event.currentTarget;
        active.classList.add('ex-list__item_active');
    }
}
