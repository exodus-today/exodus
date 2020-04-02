import { register, bind } from './load';
import { post, get, when } from 'jquery';

register('form[data-update]', setHandlers);

function setHandlers(element) {
    element.addEventListener("submit", handleSubmit);
    const parts = element.dataset.update.split(',');
    let wait;

    function handleSubmit(event) {
        event.preventDefault();
        element.classList.add('ex-loading');
        const data = $(element).serialize();
        const request = post(element.action, data).then(handleRequest).then(updateParts);
        wait = [request];
    }

    function handleRequest(data) {

    }

    function updateParts() {
        parts.forEach(updatePartWithUrl);
        when(...wait).then(()=>element.classList.remove('ex-loading'));
    }

    function updatePartWithUrl(href) {
        const part = document.querySelector(`[data-href="${href}"]`);
        const request = get(href).then(function(data){
            part.innerHTML = data;
            bind(part);
        });
        wait.push(request);
    }
}