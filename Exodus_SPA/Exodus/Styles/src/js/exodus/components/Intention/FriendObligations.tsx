import * as React from 'react';
import { getLangValue, getLang, getApiKey, getUserID, getUserName } from '../../global.js';
import { Obligation } from '../../classes/Obligation';
import moment = require("moment");
import { Currency, FilterObligation } from '../../enums';
import DatePicker from 'react-datepicker';
import { SelectPaymentCard } from '../../components/PaymentAccount/SelectPaymentCard';
import { notify } from '../../components/Shared/Notifications';
import { UserSelect } from '../User/UserSelect';
import { ObligationRouting } from '../../classes/ObligationRouting';
//import { PaymentAccountByID } from '../../components/PaymentAccount/PaymentAccountByID';
const shortid = require('shortid');

interface Props {
    UserID :number
}

interface State {
    Obligations: Array<Obligation>;
    page:number;
    y1:object; 
    y2:object; 
    OpenObligation:number;
    InfoObligation:number;
    OpenTag:number;
    FulFillOrTransfer:number;
    StartDate:any;
    EndDate:any;
    KakPerechislit:number;
    KomuPerechislit:number;
    CardNumbers:Array<string>;
    CardID:Array<string>;
    AccountTypes:Array<number>;
    TypeID:Array<number>;
    heightForm:string;  // Высота формы 
    TransferAmount:number;
    TransferAmountCurrency:number;
    AccountID:number;    
    AccountTypeID:number;
    AccountDetails:string;
    AccountCustomDetails:string;
    TransferUserID:number|null;
    TransferUserCustomDetails:string;
    UploadComplite:boolean;
    fio:string;
    ObligationRouting:Array<ObligationRouting>;
    readonly:boolean;
    pusto:boolean;
    otpravlen:boolean;
    BankName:string;
}

export class FriendObligations extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { 
            page:1, 
            y1:{background:"#95c61e",color:"#fff"},
            y2:{},
            Obligations:[],        
            OpenObligation:0,
            InfoObligation:0,
            OpenTag:0,
            FulFillOrTransfer:1, // Вид 1 = Исполнить / 2 = Передать    RoutingTypeID
            StartDate:moment().add(7, 'days'),
            EndDate: moment(new Date()),
            KakPerechislit:1, // Как перечислить 1 Наличкой / 2 На счет в Эксодус / 3 на другой аккаунт TransferTypeID 
            KomuPerechislit:1, // Кому перечислить 1 = Мне лично / 2 Пользователю эксодус / 3 левому чуваку
            CardNumbers:[],
            CardID:[],
            AccountTypes:[],
            TypeID:[],
            heightForm:'350px',
            TransferAmount:0,
            TransferAmountCurrency:0,
            AccountID:0,  
            AccountTypeID:0,
            AccountDetails:'',
            AccountCustomDetails:'',
            TransferUserID:parseInt(getUserID()),
            TransferUserCustomDetails:'',

            UploadComplite:false,
            fio:getUserName(),
            ObligationRouting:[],
            readonly:false,
            pusto: false,
            otpravlen:false,
            BankName:"",
        };      
        this.mySubmit = this.mySubmit.bind(this);
    }
    
    componentWillMount() {
        this.setState({UploadComplite:false});
        fetch(`/api/PaymentAccount/Get_List?UserID=${this.props.UserID}`, {credentials: 'include'})
        .then(response=>response.json())
        .then(
            json=>                
            this.setState({ 
                CardNumbers:  json.Data.PaymentAccounts.map((item: any) => { return (item.AccountType!=1?item.AccountDetails:item.Card.CardNumber); }), //получаем номер карты
                TypeID:       json.Data.PaymentAccounts.map((item: any) => { return (item.AccountType==1?item.Card.TypeID:item.AccountType); }), //массив типов карты
                CardID:       json.Data.PaymentAccounts.map((item: any) => { return (item.AccountID)}), //массив ID карт
                AccountTypes: json.Data.PaymentAccounts.map((item: any) => { return (item.AccountType); }) // Виды карт
            })              
        )        
        fetch('/api/Obligation/Get_ByHolderID?UserID='+getUserID(), {credentials: 'include'})
            .then(response => response.json()) 
            .then( json=>{                 
                this.setState({ Obligations: json.Data.map((item: any)=> { return new Obligation(item) }) })              
                this.setState({UploadComplite:true})}
            )
    }        
    FulFillChange  = (evt:any) => { this.setState({FulFillOrTransfer:evt.target.value}); } // Select Исполнить / Передать
    CloseFulFill = () =>{ this.setState({OpenObligation:0}) } // Закрыть форму
    
    
//***************************************************************** */
// Загрузка списка роутинга
    loadRouting=(Obligation:number)=>{
        this.setState({ ObligationRouting:[] })
        //this.setState({UploadComplite:false})
        fetch('/api/Obligation/Routing_ByObligationID',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: "POST",
            body:
                //this.state.OpenObligation.toString(),
                Obligation.toString(),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json=> {
                if (json.Data[0]!=null&&json.Data[0]!=undefined) 
                {
                    let x=0;
                    let h='';
                    if (json.Data[0].TransferUser.UserID==json.Data[0].RoutedByUser.UserID) {x=1;h='350px'}
                    if (json.Data[0].TransferUser.UserID!=json.Data[0].RoutedByUser.UserID) {x=2;h='400px'}
                    if (json.Data[0].TransferUser.UserID==0) {x=3;h='420px'}
                
                this.setState({ 
                    pusto:false, // Не пустая запись
                    ObligationRouting: json.Data.map((item: any)=> { return new ObligationRouting(item) }), 
                        KakPerechislit: (json.Data[0].TransferType.Type==null?'':json.Data[0].TransferType.Type),
                        KomuPerechislit: x,                     
                        heightForm: h,                        
                        EndDate:(json.Data[0].DesiredEndDate.toString().substr(8,2)+'.'+
                                 json.Data[0].DesiredEndDate.toString().substr(5,2)+'.'+
                                 json.Data[0].DesiredEndDate.toString().substr(0,4)),
                        fio: json.Data[0].TransferUser.UserFullName==null?'':json.Data[0].TransferUser.UserFullName, 
                        TransferUserCustomDetails:json.Data[0].TransferUserCustomDetails,
                        TransferAmount: json.Data[0].TransferAmount,
                        TransferAmountCurrency: json.Data[0].TransferAmountCurrency,
                        AccountDetails: json.Data[0].Account.AccountDetails,
                        AccountCustomDetails: json.Data[0].AccountCustomDetails,
                        BankName: json.Data[0].BankCard.BankName,                        
                })
                } else this.setState({pusto:true})
            //console.log(json.Data[0])
            //console.log(json.Data[0].TransferType.Type)
            //console.log(this.state.KakPerechislit)
            //console.log(this.state.KomuPerechislit)
            //console.log(json.Data[0].TransferUser.TransferUserCustomDetails)
            //this.setState({UploadComplite:true}) 
            })                   
        }  
//  Загрузка списка роутинга
//****************************************************
    CloseInfoFill = () =>{ this.setState({InfoObligation:0}) } // Закрыть форму
    // Select Как перечислить средства селект - Наличка / На карту Exo / На карту новую
    howTransferFunds = (evt:any) => { (evt.target.value == 1 && this.state.KomuPerechislit==1) ? this.setState({heightForm:'320px', KakPerechislit:evt.target.value}) :
                                      (evt.target.value == 1 && this.state.KomuPerechislit==2) ? this.setState({heightForm:'500px', KakPerechislit:evt.target.value}) :
                                      (evt.target.value == 1 && this.state.KomuPerechislit==3) ? this.setState({heightForm:'400px', KakPerechislit:evt.target.value}) :
                                      (evt.target.value == 2) ? this.setState({KakPerechislit:evt.target.value, heightForm:'300px'}) :
                                      (evt.target.value == 3) ? this.setState({KakPerechislit:evt.target.value, heightForm:'350px'}): // другой счет
                                                                this.setState({KakPerechislit:evt.target.value, heightForm:'400px'})
    }

    // Selector Кому отдать наличку селектор - UserFromExodus / Other    
    whomTransferFunds = (evt:any) => { 
        evt.target.value == 1 ? this.setState({KomuPerechislit:evt.target.value, heightForm:'350px'}):
        this.setState({KomuPerechislit:evt.target.value, heightForm:'550px'}
        ); } 
        
    buttonClickAll2 =()=> { this.setState({page:FilterObligation.Vse, y1:{background:"#95c61e",color:"#fff"},y2:{} }) } //Все обязательства 
    buttonClickArhiv2 =()=> { this.setState({page:FilterObligation.Arhiv, y1:{},y2:{background:"#95c61e",color:"#fff"}}) } //Архив
    handleChangeDate=(e:any)=>{ this.setState({  StartDate: e, EndDate: e.format("YYYY-MM-DD HH:mm:ss") }) }           
    handleAccount=(value:any,value2:any)=>{ 
        this.setState({ AccountID: value, AccountTypeID:value2 })
        //console.log(value+' '+value2)
    } 

    selectCurrency=(value:any)=>{ this.setState({ TransferAmountCurrency: value.target.value }) } 
    selectAmount=(value:any)=>{ this.setState({ TransferAmount: value.target.value }) }  
    handleAccountCustomDetails=(value:any)=>{ this.setState({ AccountCustomDetails: value.target.value }) }  
    handleTransferUserCustomDetails=(value:any)=>{ this.setState({ TransferUserCustomDetails: value.target.value, TransferUserID:null }) }  
    
    //////////////////////////////////////
    //***** Отправка запроса на исполнение
    mySubmit = (evt:any) => {           
            if ((this.state.KakPerechislit==2) && (this.state.AccountID==0) && (this.state.AccountTypeID==0))
            {
                notify.error(getLangValue("Notification.EnterTheCardNumber"))
                evt.stopPropagation();
                return 
            }             
            
            console.log(this.state)
            if (this.state.otpravlen==false) 
            fetch("/api/Obligation/AddRouting",
                {
                 headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json; charset=utf-8'
                 },
                 method: "post",
                 body:
                 JSON.stringify({ "ObligationID": this.state.OpenObligation,                 
                                   "RoutingTypeID":"1", // Исполнить
                                   "RoutedByUserID":getUserID(), // Я
                                   "RoutedToUserID":getUserID(), //Ели Исполнить = getUserID() / передать взять UserID другого пользователя
                                   "TransferTypeID":this.state.KakPerechislit, // Нал = 1  СчетЭ = 2 Счет = 3 
                                   "AccountTypeID":this.state.AccountTypeID,
                                   "AccountID":this.state.AccountID,
                                   "AccountCustomDetails":this.state.AccountCustomDetails, // 3 Вручную указанный счет
                                   "TransferUserID":(this.state.KomuPerechislit==1)?parseInt(getUserID()):
                                                    (this.state.KomuPerechislit==2)?this.state.TransferUserID:null,
                                   //this.state.TransferUserID, // null если через не Экс польз / Экс польз = UserID
                                   "TransferUserCustomDetails":(this.state.KomuPerechislit==3)?this.state.TransferUserCustomDetails:'', 
                                   "TransferAmount":this.state.TransferAmount,
                                   "TransferAmountCurrency":this.state.TransferAmountCurrency,
                                   "DesiredEndDate":this.state.EndDate,
                                   "RoutingDT":moment().format('YYYY-MM-DD hh:mm:ss') }                                    
                                   ), 
                 credentials: 'include',        
                })
                .then(res=>{ if (res.ok)                     
                    notify.success(getLangValue("RequestHasBeenSent")) }) 
                this.setState({otpravlen:true}) 

            //alert(evt.target.id)
            //console.log(this.state.Obligations)
            let x:Array<Obligation>
            x=this.state.Obligations
            x[evt.target.id].ObligationStatus.ObligationStatus=4
            this.setState( { Obligations:x,OpenObligation:0 } )
            }                                   
render() {
    let id = shortid.generate();
    if (this.state === null) return <div><img src="styles/dist/images/loading.svg" alt="" /></div>
    var now = moment().format("DD.MM.YYYY");
    const { page } = this.state;    
    const currency = [  getLangValue('Undefined'),
                            getLangValue('Currency.Symbol.USD'),
                            getLangValue('Currency.Symbol.GRN'),
                            getLangValue('Currency.Symbol.RUB'),
                            getLangValue('Currency.Symbol.EUR')];

    const head = <tr style={{height:41}}>
                    <th scope="col">{getLangValue('TagName')}</th>
                    <th scope="col">{getLangValue('Sender')}</th>
                    <th scope="col">{getLangValue('Amount')}</th>
                    {page === FilterObligation.Vse && (<th scope="col">{getLangValue('Action')}</th>)}
                    <th scope="col">{getLangValue('Status')}</th>
                 </tr>;
return (
<div>
       <div id="ex-route-2"> 
            <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space" >
                <div className="ex-panel">
                    <div className="ex-panel__header" style={{lineHeight:"50px"}}>
                        <i className="ex-panel__icon">#</i>
                        {getLangValue('ObligationsInMyFavour')} : {now}
                    </div>
                    <div className="ex-panel__content_big">
                        <button onClick={this.buttonClickAll2} 
                            className="btn btn-outline-success  w-80"
                            style={this.state.y1} >{getLangValue('All')} 
                        </button>&nbsp;

                        <button onClick={this.buttonClickArhiv2} 
                            className="btn btn-outline-success  w-80"
                            style={this.state.y2} >{getLangValue('Archive')} 
                        </button>             

        {page === FilterObligation.Vse && (
            <div>              
                <table>
                    <tbody>{head}    
                        {(!this.state.UploadComplite) && (<tr>
                            <td colSpan={5}>
                            <div style={{position:"relative",marginLeft:'50%',marginTop:'2%',marginBottom:'2%'}}>
                                <img src="styles/dist/images/loading.svg" alt="" />
                                </div>
                            </td>
                        </tr>)}
                    </tbody>                        
                    {this.state.Obligations.map((friendOblig,index) => ( 
                           ((friendOblig.ObligationStatus.ObligationStatus == 2) ||
                            (friendOblig.ObligationStatus.ObligationStatus == 3) ||
                            (friendOblig.ObligationStatus.ObligationStatus == 4) ||
                            (friendOblig.ObligationStatus.ObligationStatus == 6))                        
                        && (
                    <tbody key={index}>
                    <tr>
                        <td scope="row" style={{maxWidth:'200px'}}>
                            <strong>{getLang()=='en'?friendOblig.ObligationTag.NameEng:friendOblig.ObligationTag.NameRus}</strong><br/>
                            <span style={{fontSize:12}}>{getLang()=='en'?friendOblig.ObligationApplication.ApplicationNameEng:
                            friendOblig.ObligationApplication.ApplicationNameRus}</span>
                        </td>
                    <td>
                            <strong>{friendOblig.ObligationIssuer.UserFirstName} {friendOblig.ObligationIssuer.UserLastName}</strong><br/>
                            <span style={{fontSize:12}}>{getLang()=='en'?friendOblig.ObligationKind.ObligationNameEng:friendOblig.ObligationKind.ObligationNameRus}</span></td>
                        <td style={{width:'100px', background:'#e5fcb9'}}>
                            <b>{friendOblig.AmountTotal}</b>&nbsp;{currency[friendOblig.ObligationCurrency]}
                        </td>
                        <td style={{width:'100px', padding:5,margin:0}}>                                                            
                                <div className="dropdown"> 
                                    <button className="dropdown" style={{width:"150px"}}>{getLangValue('Choose')}</button>
                                    <div className="dropdown-content">

                                    {   //Запросить подтверждение
                                        (friendOblig.ObligationStatus.ObligationStatus == 2) &&
                                    (<button className="dropdown-content-button" 
                                        onClick={_=> {this.setState({  })}}> 
                                        {getLangValue('RequestConfirmation')}
                                    </button>)}

                                    {   //Информация об исполнении
                                        (friendOblig.ObligationStatus.ObligationStatus == 4) &&
                                    (<div><button className="dropdown-content-button" 
                                        onClick={_=> {  
                                            this.setState({ InfoObligation: friendOblig.ObligationID,
                                                OpenObligation: 0,
                                                readonly:true          
                                             });
                                            this.loadRouting(friendOblig.ObligationID);
                                            }}> 
                                        {getLangValue('PerformanceInformation')}
                                    </button>
                                    {/* Детали запроса, прячем Инфо об исполнении */}
                                    <button className="dropdown-content-button" 
                                        onClick={_=> {  
                                            this.setState({ OpenObligation: friendOblig.ObligationID, 
                                                OpenTag: friendOblig.ObligationTag.TagID, 
                                                TransferAmount:friendOblig.AmountTotal,
                                                InfoObligation: 0,
                                                readonly:true
                                             });
                                            this.loadRouting(friendOblig.ObligationID);
                                            }}> 
                                        {getLangValue('RequestDetails')}
                                    </button>                                    
                                    </div>
                                    )}

                                    {   //Запросить исполнение
                                        (friendOblig.ObligationStatus.ObligationStatus == 3) &&
                                    (<button className="dropdown-content-button" 
                                        onClick={_=> {this.setState({ OpenObligation: friendOblig.ObligationID,
                                                                        readonly:false,
                                                                        otpravlen:false,
                                                                        OpenTag: friendOblig.ObligationTag.TagID, 
                                                                        TransferAmount:friendOblig.AmountTotal,
                                                                        TransferAmountCurrency:friendOblig.ObligationCurrency
                                                                        }) }}>
                                        {getLangValue('RequestExecution')}
                                    </button>)}

                                    </div>
                                </div>                                 
                        </td> 
                        { (friendOblig.ObligationStatus.ObligationStatus == 4)?
                        (<td style={{fontSize:14, fontWeight:'normal', background:'#e5fcb9' }}>
                                {getLang()=='en'?friendOblig.ObligationStatus.ObligationStatusNameEng:friendOblig.ObligationStatus.ObligationStatusNameRus}
                        </td>):
                        (<td style={{fontSize:14, fontWeight:'normal' }}>
                                {getLang()=='en'?friendOblig.ObligationStatus.ObligationStatusNameEng:friendOblig.ObligationStatus.ObligationStatusNameRus}
                        </td>)}
                    </tr>

{ // Выпадающее меню Запросить исполнение обязательства
    (friendOblig.ObligationID==this.state.OpenObligation) && !this.state.readonly && (<tr><td colSpan={5}>
<div style={{width:"100%", height:"100%",background:'#ccc'}}>                      
    <div className="ex-panel__content" style={{borderBottom:"1px solid #e0e0e0"}}>
        <div className="col-3 text-center"></div>
            
            <div className="row mb-4">
                <div className="col-4">                    
                         {
                            getLangValue('WhatToDoWithTheObligation')
                         }
                </div>
                <div className="col-8 small text-muted">                                             
                    <select name="Vid" className="form-control" 
                        style={{ textShadow: '0 0 0 #4f4f4f' }}
                        onChange={this.FulFillChange} 
                        defaultValue={(this.state.FulFillOrTransfer).toString()}>
                        <option value="1" >{getLangValue('Perform')}</option> {/*selected={this.state.FulFillOrTransfer == 1}*/}
                        <optgroup label={getLangValue('TransferTo')}  style={{color:'#ccc'}}>
                            {getLangValue('TransferTo')}
                        </optgroup>
                    </select>                     
                </div>
            </div>

            <div className="col-3 text-center"></div>
            <div className="row mb-4" style={{background:'#eee'}}>
                { // Раздел исполнить обязательство
                (this.state.FulFillOrTransfer == 1) && 
                (<div style={{height:this.state.heightForm, padding:'20px', width:'100%'}}>
                    <div className="row mb-4" >
                        <div className="col-md-5">
                            <label className="labelR">{getLangValue('MethodOfPerformanceObligations')}:</label>                                                
                        </div>
                        <div className="col-md-7">
                        <select name="" 
                            defaultValue={this.state.KakPerechislit.toString()}
                            className="form-control" onChange={this.howTransferFunds}
                             style={{ textShadow: '0 0 0 #4f4f4f' }}>
                            <option value="1">{getLangValue('CashAtTheMeeting')}</option>
                            <option value="2">{getLangValue('ToMyPaymentAccountIsListedInExodus')}</option>
                            <option value="3">{getLangValue('SpecifyAnotherAccount')}</option>                            
                        </select>
                        </div>
                    </div>

                    { // Передать наличными
                    (this.state.KakPerechislit == 1) && 
                    (<div>
                    <div className="row mb-4" >
                        <div className="col-md-5">
                            <label className="labelR">{getLangValue('ThroughWhomToPass')}:</label>
                        </div>
                        <div className="col-md-7">
                        <select 
                            name="" 
                            defaultValue={this.state.KomuPerechislit.toString()} 
                            className="form-control" 
                            onChange={this.whomTransferFunds}
                            style={{ textShadow: '0 0 0 #4f4f4f' }} >
                            <option value="1">{getLangValue('ToMePersonally')}</option> {/* Лично мне */}
                            <option value="2">{getLangValue('ThroughAnotherExodusUser')}</option> {/* Через другого пользователя Exodus*/}
                            <option value="3">{getLangValue('SpecifyAnotherPerson')}</option> {/* Другого человека */}
                        </select>                                            
                        </div>
                    </div>             

                    { // Лично мне:
                        (this.state.KakPerechislit == 1) && (this.state.KomuPerechislit==1) &&
                        <div></div>                                                
                    }
                    { // Получатель из эксодус список:
                        (this.state.KakPerechislit == 1) && (this.state.KomuPerechislit==2) &&
                        (<div style={{paddingBottom:10}}>
                            <div className="row mb-4">
                                <div className="col-md-5">
                                    <label>{getLangValue('Recipient')}:</label>
                                </div>
                                <div className="col-md-7">
                                    {this.state.fio}
                                </div>
                            </div>                                      
                          <UserSelect count={5} query={''} fun={(x1:any,x2:any)=> this.setState({ TransferUserID:x1, fio:x2 }) } /> 
                          </div>
                        )                            
                    }

                    {(this.state.KakPerechislit == 1) && (this.state.KomuPerechislit==3) &&
                    <div className="row mb-4">
                        <div className="col-md-5">
                            <label>{getLangValue('SpecifyTheRecipient')}:</label>
                        </div>
                        <div className="col-md-7">
                            <textarea className="form-control" name="TransferUserCustomDetails" onChange={this.handleTransferUserCustomDetails}></textarea>
                        </div>
                    </div>                                                
                    }
                </div>)}

                    {   // Перечислить на карту описанную в Эксодус
                        (this.state.KakPerechislit == 2) && 
                        <SelectPaymentCard name={"MyCard"} 
                            CardNumbers={this.state.CardNumbers} 
                            AccountTypes={this.state.AccountTypes} 
                            TypeID={this.state.TypeID} 
                            CardID={this.state.CardID}
                            onSelectAccountID={this.handleAccount} />
                    }

                    {   // Перечислить на указанный счет
                        (this.state.KakPerechislit == 3) && (<div>
                        <div className="row mb-4">
                            <div className="col-md-5">                            
                                <label>
                                    {getLangValue('DescriptionOfThePaymentSystemAndAccount')}:
                                </label> {/* Описание платежной системы и счета */}
                            </div>
                            <div className="col-md-7">
                                <textarea className="form-control" 
                                            name="AccountCustomDetails" 
                                            onChange={this.handleAccountCustomDetails}>
                                </textarea>
                            </div>
                        </div>
                    </div>) }

                    <div className="row mb-4">
                        <div className="col-md-5">
                            <label className="labelR">
                                {getLangValue('AmountRange')}
                                 1-{friendOblig.AmountTotal}) &nbsp; 
                                {getLangValue('Currency')}:
                            </label>
                        </div>                        
                        <div className="col-md-4">
                            <input type="number" 
                                    disabled
                                    className="form-control" 
                                    name="TotalAmount" 
                                    min="1" 
                                    defaultValue={friendOblig.AmountTotal.toFixed(2)} 
                                    max={friendOblig.AmountTotal} 
                                    pattern="\d+(\,\d{2})?" 
                                    onChange={this.selectAmount}
                                    />
                        </div>
                            <div className="col-md-3" >
                            <select className="form-control" 
                                    style={{ textShadow: '0 0 0 #4f4f4f' }}
                                    name="TotalAmountCurrencyID" 
                                    onChange={this.selectCurrency}
                                    disabled value={friendOblig.ObligationCurrency}> 
                                <option value={Currency.USD}>{currency[Currency.USD]}</option>
                                <option value={Currency.UAH}>{currency[Currency.UAH]}</option>
                                <option disabled value={Currency.RUB}>{currency[Currency.RUB]}</option>
                                <option disabled value={Currency.EUR}>{currency[Currency.EUR]}</option>
                            </select>
                        </div>  
                    </div>

                    <div className="row mb-4">                                            
                        <div className="col-md-5">
                        <label className="labelR">{getLangValue('DesiredFinalDateOfPerformance')}:</label>
                    </div>
                        <div className="col-md-3">                                            
                        <DatePicker className="form-control"  
                            required
                            name="EndDate" 
                            dateFormat="DD.MM.YYYY"                                                
                            onChange={this.handleChangeDate}
                            selected={this.state.StartDate}
                            minDate= {moment()}
                        />  
                        </div>
                    </div>                                            
                 </div>
                )
            }
        </div>                      

        <div className="text-right">                           
            <button className="btn btn-outline-success" id={index.toString()}
                    onClick={this.mySubmit}>
                {getLangValue('SendRequest')}
            </button>
            &nbsp;
            <button className="btn btn-outline-success" 
                    onClick={this.CloseFulFill}>
                {getLangValue('Close')}
            </button>
        </div>
    </div>
</div>
</td></tr>)}        

{ // Выпадающее меню Детали исполнения обязательства
    (friendOblig.ObligationID==this.state.OpenObligation) && 
        this.state.readonly && 
        !this.state.pusto && 
        (<tr><td colSpan={5}>
<div style={{width:"100%", height:"100%",background:'#ccc'}}>                      
    <div className="ex-panel__content" style={{borderBottom:"1px solid #e0e0e0"}}>
        <div className="col-3 text-center"></div>
            <div className="col-3 text-center"></div>
            <div className="row mb-4" style={{background:'#eee'}}>
                { // Раздел исполнить обязательство
                (this.state.FulFillOrTransfer == 1) && 
                (<div style={{height:this.state.heightForm, padding:'20px', width:'100%'}}>
                    <div className="row mb-4" >
                        <div className="col-md-5">
                            <label className="labelR">{getLangValue('MethodOfPerformanceObligations')}:</label>                                                
                        </div>
                        <div className="col-md-7">
                        <select name="" 
                            disabled
                            value={this.state.KakPerechislit.toString()}
                            className="form-control" onChange={this.howTransferFunds}                            
                            style={{ textShadow: '0 0 0 #4f4f4f' }}>
                            <option value="1">{getLangValue('CashAtTheMeeting')}</option>
                            <option value="2">{getLangValue('ToMyPaymentAccountIsListedInExodus')}</option>
                            <option value="3">{getLangValue('SpecifyAnotherAccount')}</option>                            
                        </select>
                        </div>
                    </div>

                    { // Передать наличными
                    (this.state.KakPerechislit == 1) && 
                    (<div>
                    <div className="row mb-4" >
                        <div className="col-md-5">
                            <label className="labelR">{getLangValue('ThroughWhomToPass')}:</label>
                        </div>
                        <div className="col-md-7">
                        <select 
                            disabled
                            name="" 
                            value={this.state.KomuPerechislit.toString()} 
                            className="form-control" 
                            onChange={this.whomTransferFunds}
                            style={{ textShadow: '0 0 0 #4f4f4f' }} >
                            <option value="1">{getLangValue('ToMePersonally')}</option> {/* Лично мне */}
                            <option value="2">{getLangValue('ThroughAnotherExodusUser')}</option> {/* Через другого пользователя Exodus*/}
                            <option value="3">{getLangValue('SpecifyAnotherPerson')}</option> {/* Другого человека */}
                        </select>                                            
                        </div>
                    </div>             

                    { // Лично мне:
                        (this.state.KakPerechislit == 1) && (this.state.KomuPerechislit==1) &&
                        <div></div>                                                
                    }
                    { // Получатель из эксодус:
                        (this.state.KakPerechislit == 1) && (this.state.KomuPerechislit==2) &&
                        (<div style={{paddingBottom:10}}>
                            <div className="row mb-4">
                                <div className="col-md-5">
                                    <label>{getLangValue('Recipient')}:</label>
                                </div>
                                <div className="col-md-7">
                                <input type="text" 
                                    disabled
                                    className="form-control" 
                                    value={this.state.fio}
                                    /> 
                                </div>
                            </div>                                                                
                          </div>
                        )                            
                    }

                    {(this.state.KakPerechislit == 1) && (this.state.KomuPerechislit==3) &&
                    <div className="row mb-4">
                        <div className="col-md-5">
                            <label>{getLangValue('SpecifyTheRecipient')}:</label>
                        </div>
                        <div className="col-md-7">
                            <textarea 
                                    disabled
                                    className="form-control" 
                                    name="TransferUserCustomDetails" 
                                    defaultValue={this.state.TransferUserCustomDetails}>                                
                            </textarea>
                        </div>
                    </div>                                                
                    }
                </div>)}

                    {   // Перечислить на карту описанную в Эксодус
                        (this.state.KakPerechislit == 2) && 
                    <div>
                        <div className="row mb-4">
                            <div className="col-md-5">
                                <label>{getLangValue('CardNumber')}:</label>
                            </div>
                            <div className="col-md-7">
                                <input type="text" 
                                    disabled
                                    className="form-control" 
                                    defaultValue={this.state.AccountDetails.toString()}
                                    />  
                            </div>
                        </div>        
                        
                        <div className="row mb-4">
                            <div className="col-md-5">
                                <label>{getLangValue('BankName')}:</label>
                            </div>
                            <div className="col-md-7">
                                <input type="text" 
                                    disabled
                                    className="form-control" 
                                    defaultValue={this.state.BankName}
                                    />  
                            </div>
                        </div>
                    </div>                 
                            // Только отобразить карту
                                                   

                        // <SelectPaymentCard name={"MyCard"}                             
                        //     CardNumbers={this.state.CardNumbers} 
                        //     AccountTypes={this.state.AccountTypes} 
                        //     TypeID={this.state.TypeID} 
                        //     CardID={this.state.CardID}
                        //     onSelectAccountID={this.handleAccount} />
                    }

                    {   // Перечислить на указанный счет
                        (this.state.KakPerechislit == 3) && (<div>
                        <div className="row mb-4">
                            <div className="col-md-5">                            
                                <label>
                                    {getLangValue('DescriptionOfThePaymentSystemAndAccount')}:
                                </label> {/* Описание платежной системы и счета */}
                            </div>
                            <div className="col-md-7">
                                <textarea   disabled
                                            className="form-control" 
                                            name="AccountCustomDetails" 
                                            defaultValue={this.state.AccountCustomDetails}
                                            //onChange={this.handleAccountCustomDetails}
                                            >
                                </textarea>
                            </div>
                        </div>
                    </div>) }

                    <div className="row mb-4">
                        <div className="col-md-5">
                            <label className="labelR">
                                {getLangValue('Amount')}
                            </label>
                        </div>                        
                        <div className="col-md-4">
                            <input type="number" 
                                    disabled
                                    className="form-control" 
                                    name="TotalAmount" 
                                    min="1" 
                                    defaultValue={this.state.TransferAmount.toFixed(2)}                                     
                                    pattern="\d+(\,\d{2})?"                                     
                                    />
                        </div>
                            <div className="col-md-3" >
                            <select className="form-control" 
                                    style={{ textShadow: '0 0 0 #4f4f4f' }}
                                    name="TotalAmountCurrencyID" 
                                    disabled value={friendOblig.ObligationCurrency}> {/*onChange={this.selectCurrency}*/}
                                <option value={Currency.USD}>{currency[Currency.USD]}</option>
                                <option value={Currency.UAH}>{currency[Currency.UAH]}</option>
                                <option disabled value={Currency.RUB}>{currency[Currency.RUB]}</option>
                                <option disabled value={Currency.EUR}>{currency[Currency.EUR]}</option>
                            </select>
                        </div>  
                    </div>

                    <div className="row mb-4">                                            
                        <div className="col-md-5">
                        <label className="labelR">{getLangValue('DesiredFinalDateOfPerformance')}:</label>
                    </div>
                        <div className="col-md-3">                                            
                        <input type="text" 
                                    disabled
                                    className="form-control" 
                                    defaultValue={this.state.EndDate}
                                    /> 
                        </div>
                    </div>                                            
                 </div>
                )
            }
        </div>                      

        <div className="text-right">           
            <button className="btn btn-outline-success" 
                    onClick={this.CloseFulFill}>
                {getLangValue('Close')}
            </button>
        </div>
    </div>
</div>
</td></tr>)} 

{ // Выпадающее меню Информации о получении %%
    (friendOblig.ObligationID==this.state.InfoObligation) &&    
    (<tr><td colSpan={5}>
<div style={{width:"100%", height:"100%",background:'#ccc'}}>                      
    <div className="ex-panel__content" style={{borderBottom:"1px solid #e0e0e0", padding:'20px 40px'}}>
        <div className="col-3 text-center"></div>
            <div className="row">
                <div className="col-4">{getLangValue('Routings')}</div> {/*Роутинги*/}
                <div className="col-8 small text-muted"></div>
            </div>
            <div className="row mb-2">
            <table>
                <tbody>
                    <tr style={{height:41}}>
                        <th scope="col">{getLangValue('ID')}</th>
                        <th scope="col">{getLangValue('FromUser')}</th> 
                        <th scope="col">{getLangValue('TransferUser')}</th>
                        <th scope="col">{getLangValue('ToUser')}</th>
                        <th scope="col">{getLangValue('Amount')}</th>                        
                        <th scope="col">{getLangValue('PaymentInfo')}</th>                        
                    </tr>
                </tbody> 

                {
                    this.state.ObligationRouting.map((number) =>(
                        <tbody key={id+number.RoutingID}>
                            <tr style={{height:41}}>
                                <td scope="col">{number.RoutingID}</td>
                                <td scope="col">{number.RoutedByUser.UserFullName}</td>
                                <td scope="col">{number.TransferUser.UserFullName}</td>                                
                                <td scope="col">{number.RoutedToUser.UserFullName}</td>
                                <td scope="col">
                                    {number.TransferAmount} &nbsp; {currency[number.TransferAmountCurrency]} <br/>                                    
                                </td>
                                <td scope="col" >
                                    {getLang()=='en'?number.TransferType.NameEng:number.TransferType.NameRus}<br/>
                                    {
                                        number.TransferType.Type==2?number.Account.AccountDetails:'' // На счет
                                    } до {(number.DesiredEndDate).substr(0,10)}
                                </td>
                            </tr>
                        </tbody>
                    ))
                }
                </table>                 
            </div>
        <div className="text-right">           
            <button className="btn btn-outline-success" 
                    onClick={this.CloseInfoFill}>
                {getLangValue('Close')}
            </button>
        </div>
    </div>
</div>
</td></tr>)}
                    </tbody> 
                    )   ))}               
                </table>
            </div>
        )}

        {page === FilterObligation.Arhiv && (
                <table>                               
                    <tbody>  
                    {head}  
                        {this.state.Obligations.map((number,index) =>( 
                            ((number.ObligationStatus.ObligationStatus == 1) ||
                            (number.ObligationStatus.ObligationStatus == 5)) &&                       
                        (<tr key={index}>
                            <td scope="row" style={{maxWidth:'200px'}}>
                                <strong>{getLang()=='en'?number.ObligationTag.NameEng:number.ObligationTag.NameRus}</strong><br/>
                                <span style={{fontSize:12}}>
                                {getLang()=='en'?number.ObligationApplication.ApplicationNameEng:number.ObligationApplication.ApplicationNameRus}</span>
                            </td>
                            <td><strong>{number.ObligationIssuer.UserFirstName} 
                            {number.ObligationIssuer.UserLastName}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span></td>  
                            {/* number.ObligationStatus */}

                            { (number.ObligationStatus.ObligationStatus == 5)?
                            (<td style={{width:'100px', background:'#e5fcb9'}}> 
                                <b>{number.AmountTotal}</b>&nbsp;{currency[number.ObligationCurrency]}
                            </td>):
                            (<td style={{width:'100px', background:'#eee'}}> 
                                <b>{number.AmountTotal}</b>&nbsp;{currency[number.ObligationCurrency]}
                            </td>)}                            

                            <td style={{fontSize:14, fontWeight:'normal'}}>
                                    {getLang()=='en'?number.ObligationStatus.ObligationStatusNameEng:
                                    number.ObligationStatus.ObligationStatusNameRus}
                            </td>                       
                        </tr>
                        )))}
                    </tbody>
                </table>
        )}
                    </div>            
                </div>
            </div>
        </div>
</div> //maindiv
       );
    }
} 



