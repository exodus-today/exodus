import { register } from './load';

register('.ex-navigation', bind);

function bind(navigation) {
    const links = navigation.querySelectorAll('.ex-navigation__item[data-load]');
    let active = navigation.querySelector('.ex-navigation__item.active');

    links.forEach(link=>link.addEventListener('click', handleLinkClick));

    function handleLinkClick(event) {
        if (active) {
            active.classList.remove('active');
        }

        active = event.target;
        active.classList.add('active');
    }
}
