import { register, load } from './load';
import { notify } from './components/Shared/Notifications';
//import { renderMainPage } from './react';
import { Currency } from './enums';

register('#TypeID', creditCard_setBankName);
register('#ValidTillMonth', creditCard_setValidDate);
register('#ValidTillYear', creditCard_setValidDate);
register('#LinkButton', linkButton);
register(".main-menu-open-button", loadMainPage);
register(".main-menu-close-button", closeMainPage);

function closeMainPage(element){
    { element.addEventListener('click', closeMain);}    
}

function closeMain() {
    $('.ex-main-menu').attr('class','ex-main-menu ex-main-menu_close')    
}
 
function loadMainPage(element)
{ element.addEventListener('click', loadMainMenu);}

export function loadMainMenu()
{
    $('.ex-main-menu_close').removeClass('ex-main-menu_close');
    setTimeout(function() {load($("#ex-route-1")[0]); }, 260);
}

export function getLangValue(key)
{
    return window.langArray[key];   
}

export function getLang()
{
    return window.mainLanguage;
}

export function getUserID()
{
    return getCookie('UserID'); 
}

export function getUserStatus()
{
    return getCookie('UserStatus'); 
}

export function getUserName()
{
    return getCookie('UserName'); 
}

export function getApiKey()
{
    return getCookie('api_key'); 
}

export function getCookie(cname)
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) 
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') { c = c.substring(1); }
        if (c.indexOf(name) == 0) 
        { return c.substring(name.length, c.length); }
    }
    return "";
}

function creditCard_setBankName(element) 
{
    element.addEventListener('change', dataChange);
    function dataChange() 
    {
        var selectedIndex = document.getElementById('TypeID').selectedIndex;
        var value = document.getElementById('TypeID')[selectedIndex].innerText;
        document.getElementById('BankName').value = value;
    }
}

function creditCard_setValidDate(element) 
{
    element.addEventListener('change', dataChange);
    function dataChange() {
    var mounthIndex = document.getElementById('ValidTillMonth').selectedIndex;
    var yearIndex = document.getElementById('ValidTillYear').selectedIndex;
    var month =
        String(document.getElementById('ValidTillMonth')[mounthIndex].value)
            .padStart(2, "0");
    var year =
        String(document.getElementById('ValidTillYear')[yearIndex].value)
            .substring(2, 4);
    document.getElementById('CardValidTill').value = '01-' + month + '-' + year;
    }
}

function card_number_format(value) 
{
    var numbers = value.replace(/[^\d]+/g, '');
    var rez = '';
    for (var i = 0; i <= numbers.length-1 && i < 16; i++)
    {
        if(i%4==0 && i != 0){ rez += ' '; }
        rez += numbers[i];
    }
    return rez;
}

function linkButton(element) 
{
    element.addEventListener('click', function () 
    {    
        var myLink = document.querySelector('#linkToJoin'),
            callback = () => {
                notify.success(getLangValue("Notification.LinkCopied"));
            };

        if (typeof navigator.clipboard !== 'undefined') {
            let toCopy = myLink.innerText;
            navigator.clipboard.writeText(toCopy).then(callback);
        } else {
            var range = document.createRange();  
            range.selectNode(myLink);  
            window.getSelection().addRange(range); 
            var successful = document.execCommand('copy');
            if (successful == false) {
                document.execCommand('copy');
            }
            callback();
            window.getSelection().removeAllRanges(); 
        }
    });
}

const currencyCodes =  [getLangValue("Unset"), getLangValue("Dollars"), getLangValue("Hryvnia"), getLangValue("Rubles"), getLangValue("Euro")]; 

export function getCurrencyCode(currencyID) {
    currencyID = currencyID > 4 ? 0: currencyID;
    return currencyCodes[currencyID];
}

export function getCurrencySymbol(currencyID)
{
    let curCode = getLangValue('Unset');

    switch(currencyID) {
        case Currency.USD: 
            curCode = getLangValue('Currency.Symbol.USD');
            break;
        case Currency.UAH: 
            curCode = getLangValue('Currency.Symbol.GRN');
            break;
        case Currency.RUB: 
            curCode = getLangValue('Currency.Symbol.RUB');
            break;
        case Currency.EUR: 
            curCode = getLangValue('Currency.Symbol.EUR');
            break;
    }
    return curCode; 
}


const dayOfWeek = [getLangValue("Unset"), getLangValue("OnMonday"), getLangValue("OnTuesday"), getLangValue("OnWednesday"), getLangValue("OnThursday"), getLangValue("OnFriday"), getLangValue("OnSaturday"), getLangValue("OnSunday")];
const period =  ['', getLangValue("Unset"), getLangValue("Once"), getLangValue("Weekly"), getLangValue("Monthly"), getLangValue("Quarterly"), getLangValue("Yearly")]; 

export function getPeriodName(periodID) {
    periodID = periodID > 6 ? 0 : periodID;
    return period[periodID];
}

export function getOnDayOfWeek(dayIndex) {
    dayIndex = dayIndex > 7 ? 0 : dayIndex;
    return dayOfWeek[dayIndex];
}
