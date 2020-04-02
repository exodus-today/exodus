import { register } from './load';

const menu = document.querySelector('.ex-main-menu');

register('.ex-main-menu [data-load]', function(element){
    element.addEventListener('click', closeMainMenuAndStopPropogation);    
});

if(menu != null)
{
    menu.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

function closeMainMenuAndStopPropogation(event) {
    event.stopPropagation();

    closeMainMenu();
}

export function closeMainMenu() {
    menu.classList.add('ex-main-menu_close');

    menu.addEventListener('click', openMainMenu);
    document.removeEventListener('click', closeMainMenuAndStopPropogation);
}

function openMainMenu(event) {
    event.stopPropagation();
    
    menu.classList.remove('ex-main-menu_close');

    menu.removeEventListener('click', openMainMenu);
    //document.addEventListener('click', closeMainMenuAndStopPropogation);
}