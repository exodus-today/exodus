const callbacks = []
import { get } from 'jquery';

register('[data-load][data-target]', load);
register('[data-href]', load);
register('[href]', showLoading);

registerFirstUser('[data-user]');

export function load(element)
{
    let target = element;
    if(target.dataset.href != undefined)
    {
        target.classList.add('ex-loading');
        get(target.dataset.href).then(replaceContent);
    }
    else if(target.dataset.load != undefined)
    {
        target = document.querySelector(element.dataset.target);
        if($(element).is("select")) 
        { element.addEventListener('change', handleChange); }
        else 
        { element.addEventListener('click', handleClick); }
    }

    function handleChange(event)
    {
        if (target.dataset.href === element.value) return;
        target.classList.add('ex-loading');
        get(element.value).then(replaceContent);
    }

    function handleClick(event)
    {
        target.classList.add('ex-loading');
        get(element.dataset.load).then(replaceContent);
    }

    function replaceContent(response) 
    {
        target.innerHTML = response;
        target.classList.remove('ex-loading');
        bind(target);
    }
}

export function register(selector, setBindings) {
    
    function setBindingsForNewElements(context) {
        context.querySelectorAll(selector).forEach(setBindings);
    }
    callbacks.push(setBindingsForNewElements);
}

export function bind(context) 
{
    callbacks.forEach(callback=>callback(context));
}

export function bindToElement(element) 
{
    var context = document.querySelector(element)
    callbacks.forEach(callback=>callback(context));
}

function showLoading(element) {
    element.addEventListener('click', () => document.body.classList.add('ex-loading'));
}

export function registerFirstUser(selector) {
    
    function setBindingsForNewElements(context) {
        $(context.querySelector(selector)).attr('class', 'ex-list__item ex-list__item_active');
        $(context.querySelector(selector)).click();        
    }
    callbacks.push(setBindingsForNewElements);
}
