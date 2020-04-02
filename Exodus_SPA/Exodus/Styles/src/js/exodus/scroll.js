import { register } from './load';

register('.ex-scroll', bind);

const scrollBarWidth = getScrollbarWidth();

function bind(element) {
    element.style.marginRight = `-${scrollBarWidth+1}px`;
}

function getScrollbarWidth() {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";
    document.body.appendChild(outer);
    
    const widthNoScroll = outer.offsetWidth;
    
    outer.style.overflow = "scroll";
    
    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        
    
    const widthWithScroll = inner.offsetWidth;
    
    outer.parentNode.removeChild(outer);
    
    return widthNoScroll - widthWithScroll;
}
