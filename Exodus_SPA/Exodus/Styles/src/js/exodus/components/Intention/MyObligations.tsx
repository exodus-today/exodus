import * as React from 'react';
import { Obligation } from '../../classes/Obligation';
import * as moment from 'moment';
import { getLangValue, getApiKey, getUserID, getLang } from '../../global.js';
import { notify } from '../Shared/Notifications';
import { FilterObligation } from '../../enums';
import { ObligationRouting } from '../../classes/ObligationRouting';

function to4 (x:string) {
    return x.replace(/(\d)(?=(\d\d\d\d)+([^\d]|$))/g, '$1 ')
 }
 
interface Props {
    UserID :number
    itemID:number
}

interface State {
    Obligations: Array<Obligation>;
    page:number;
    x1:object;
    x2:object;
    UploadComplite:boolean;
    OpenObligation:number;
    ObligationRouting:Array<ObligationRouting>;
    ApplicationID: number,
    UserReceiver: number,
    UserSender: number,
    Currency: number,
    Amount: number,
    TagID: number,
    TransferType: 1, // TransferType.Type
    PaymentAccountID: number,
    TransactionDate: Date,
    ObligationID: number,
    TransactionMemo: string
}

export class MyObligations extends React.Component<Props, State> {
    constructor(props: Props) {
         super(props);
         this.state = { page:1, 
                        x1:{background:"#95c61e",color:"#fff"},x2:{},
                        Obligations:[],
                        UploadComplite:false,
                        OpenObligation:0,
                        ObligationRouting:[],

                        ApplicationID: 0,
                        UserReceiver: 0,
                        UserSender: 0,
                        Currency: 1,
                        Amount: 0,
                        TagID: 0,
                        TransferType: 1,
                        PaymentAccountID: 0,
                        TransactionDate: new Date(),
                        ObligationID: 0,
                        TransactionMemo: ""
                    };
        
    }  
    
    load=()=>{
    this.setState({UploadComplite:false});        
    fetch('/api/Obligation/Get_ByIssuerID?UserID='+getUserID(), {credentials: 'include'})
        .then(response => response.json())
        .then(
            json=> { 
                this.setState({ Obligations: json.Data.map((item: any)=> { return new Obligation(item) }) })              
                this.setState({UploadComplite:true})}
            )        
    }

    loadRouting=(Obligation:number)=>{
        //this.setState({UploadComplite:false});      
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
                this.setState({  ObligationRouting: json.Data.map((item: any)=> { return new ObligationRouting(item) }) })
                //this.setState({UploadComplite:true})            
                })
            .then(_=>this.setState({ OpenObligation: Obligation })) 
            //.then(_=>console.log(this.state.ObligationRouting))
           
        }    

    componentWillMount() {
        this.load()    
    } 
        
    CloseForm = () =>{ this.setState({OpenObligation:0}) } // Закрыть форму   

    ConfirmObligation = (ObligationID:number) => {         
        fetch("/api/Obligation/Confirm",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: "POST",
            body:
                ObligationID.toString(),
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                notify.success(getLangValue("Notification.SuccessfullyConfirm"));
                this.load()
            } else {
                notify.error(getLangValue("Error"));
            }
        });        
    }    

    ExecuteObligation = (   TransferType:number, // Тип передачи Нал / СчетЭ / Счет
                            TipAccount:string, // Тип Аккаунта Bank Card / Webmoney / Bitkoin
                            NomerCheta:string, // Номер счета
                            TransferUserFullName: string, // Через какого пользователя Эксодус передать
                            TransferUserDedcription: string, // Через кого передать через другого пользователя
                            TagID:number  // Код тега
                        ) => {     
        let memo=''
        //alert('TransferType:'+TransferType+' TagID:'+TagID+'TipAccount:'+TipAccount+'NomerCheta:'+NomerCheta)
        if (TransferType==1) {
            memo = 'Наличными через: ';
            if (TransferUserFullName!='') 
                memo = memo+TransferUserFullName
                else
                memo = memo+TransferUserDedcription            
        }
        if (TransferType==2) {
            memo='На счёт ';
            if (TipAccount=='Bank Card')
                memo = memo +':'+ to4(NomerCheta)
                else 
                memo = memo+TipAccount+':'+ (NomerCheta)
        }
        if (TransferType==3) {
            memo ='На счёт: ';
            memo = memo + (NomerCheta)
        }
        //alert(memo)


        fetch("/api/Transaction/Add",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: "POST",
            body:
                JSON.stringify({
                    "ApplicationID":0,
                    "UserReceiver": this.state.ObligationRouting[0].RoutedToUser.UserID,
                    "UserSender": getUserID(),
                    "Currency": this.state.ObligationRouting[0].TransferAmountCurrency,
                    "Amount": this.state.ObligationRouting[0].TransferAmount,
                    "TagID": TagID,
                    "TransferType": 1,
                    "PaymentAccountID":this.state.ObligationRouting[0].Account.AccountID,
                    "TransactionDate": moment().format(),
                    "ObligationID": this.state.ObligationRouting[0].ObligationID,
                    "TransactionMemo": memo//this.state.TransactionMemo
                }),
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                notify.success(getLangValue("Notification.SuccessfullyConfirm"));
                this.load()
            } else {
                notify.error(getLangValue("Error"));
            }
        });   
    }       

    DeleteObligation = (ObligationID:number) => {         
        fetch("/api/Obligation/Delete?ObligationID="+ObligationID,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: "POST",
            body:'',
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                notify.success(getLangValue("Notification.SuccessfullyDeleted"));
                this.load()
            } else {
                notify.error(getLangValue("Error"));
            }
        });        
    }

    buttonClickAll =()=> {
        this.setState({page:FilterObligation.Vse, x1:{background:"#95c61e",color:"#fff"},x2:{}})
    }   

    buttonClickArhiv =()=> {
        this.setState({page:FilterObligation.Arhiv, x1:{},x2:{background:"#95c61e",color:"#fff"}})
    }      

    render() {
        if (this.state === null) return <div><img src="styles/dist/images/loading.svg" alt="" /></div>
        
        var now = moment().format("DD.MM.YYYY");
        //var segodnya = new Date(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0])

        const { page } = this.state;

        const currency = [  getLangValue('Undefined'),
                            getLangValue('Currency.Symbol.USD'),
                            getLangValue('Currency.Symbol.GRN'),
                            getLangValue('Currency.Symbol.RUB'),
                            getLangValue('Currency.Symbol.EUR')];
        const head =        <tr>
                                <th scope="col">{getLangValue('Tag')}<br/><p style={{fontSize:12, fontWeight:'normal'}}>
                                {getLangValue('Application')}</p></th>                
                                <th scope="col">{getLangValue('Recipient')}<br/><p style={{fontSize:12, fontWeight:'normal'}}>
                                {getLangValue('TypeOfObligation')}</p></th>
                                <th scope="col">{getLangValue('Amount')}</th>   
                                {page === FilterObligation.Vse && (<th scope="col">{getLangValue('Action')}</th>)}
                                <th scope="col">{getLangValue('Status')}</th>
                            </tr>
                                
        return (
        <div id="ex-route-2"> 
           <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space" >
           <div className="ex-panel">
             <div className="ex-panel__header" style={{lineHeight:"50px"}}>
               <i className="ex-panel__icon">#</i>
               {getLangValue('MyObligations')} : {now} 
            </div>
            <div className="ex-panel__content_big">
                <button onClick={this.buttonClickAll} 
                     className="btn btn-outline-success w-80"
                     style={this.state.x1}>{getLangValue('All')}                     
                </button>&nbsp;
                <button onClick={this.buttonClickArhiv} 
                     className="btn btn-outline-success w-80"
                     style={this.state.x2}>{getLangValue('Archive')}                     
                </button>

        {page === FilterObligation.Vse && (
        <div>
            <table>
                <tbody> 
                    {head}  
                        { !this.state.UploadComplite && 
                        (<tr>
                            <td colSpan={5}>
                            <div style={{position:"relative",marginLeft:'50%',marginTop:'2%',marginBottom:'2%'}}> 
                                <img src="styles/dist/images/loading.svg" alt="" />  
                                </div>
                            </td>
                        </tr>)}    
                </tbody>                        
                                           
                        {this.state.Obligations.map((number,index) => (
                            ( 
                            (number.ObligationStatus.ObligationStatus == 2) ||
                            (number.ObligationStatus.ObligationStatus == 3) ||
                            (number.ObligationStatus.ObligationStatus == 4) ||
                            (number.ObligationStatus.ObligationStatus == 6)) &&
                            (this.props.itemID>0?number.ObligationID==this.props.itemID:true) &&
                            //(number.IsActive) && 
                            (
                            <tbody key={index}>     
                            <tr>
                            <td scope="row"><strong>
                                {getLang()=='en'?number.ObligationTag.NameEng:number.ObligationTag.NameRus}
                            </strong><br/><span style={{fontSize:12}}>
                                {getLang()=='en'?number.ObligationApplication.ApplicationNameEng:number.ObligationApplication.ApplicationNameRus}
                            </span></td>
                            <td><strong>{number.ObligationHolder.UserFirstName} {number.ObligationHolder.UserLastName}</strong><br/>
                                <span style={{fontSize:12}}>
                                {getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span></td>  
                            <td style={{width:'100px', background:'#e5fcb9'}}>
                                {number.AmountTotal}&nbsp;{currency[number.ObligationCurrency]}
                            </td>
                            <td style={{width:'100px', padding:5,margin:0}}> 
                                <div className="dropdown"> 
                                    <button className="dropdown" style={{width:"150px"}}>{getLangValue('Select')}</button>
                                    <div className="dropdown-content">

                                        {   //Подтвердить обязательства
                                            ((number.ObligationStatus.ObligationStatus == 2) ||                                            
                                            (number.ObligationStatus.ObligationStatus == 6))  &&
                                        (<button className="dropdown-content-button" 
                                                onClick={()=>this.ConfirmObligation(number.ObligationID)}>
                                                {getLangValue('Confirm')}
                                        </button>) }                                      

                                        {   //Исполнить обязательство
                                            (number.ObligationStatus.ObligationStatus == 4) &&
                                        (<button className="dropdown-content-button" 
                                                onClick={_=>
                                                 {
                                                    this.loadRouting(number.ObligationID)
                                                    //this.setState({ OpenObligation: number.ObligationID })
                                                 }}>
                                                {getLangValue('Execute')}
                                        </button>)}                                                                               

                                        {   //Отказаться от обязательств
                                            ((number.ObligationStatus.ObligationStatus == 2) ||
                                            (number.ObligationStatus.ObligationStatus == 3) ||
                                            (number.ObligationStatus.ObligationStatus == 4) ||
                                            (number.ObligationStatus.ObligationStatus == 6))  &&
                                        (<button className="dropdown-content-button" 
                                                onClick={()=>this.DeleteObligation(number.ObligationID)}>
                                                {getLangValue('Decline')}
                                        </button>) }
                                    </div>
                                </div>                                      
                            </td>
                            <td style={{fontSize:14, fontWeight:'normal', 
                                        background:((number.ObligationStatus.ObligationStatus==4)?'#c7eff5':
                                                    (number.ObligationStatus.ObligationStatus==3)?'#dff7ab':'')}
                                    }>
                                
                                {getLang()=='en'?number.ObligationStatus.ObligationStatusNameEng:
                                number.ObligationStatus.ObligationStatusNameRus}
                            </td>
                        </tr>


                        { // Выпадающее меню *************************************************
                            (number.ObligationID==this.state.OpenObligation) && 
                            (this.state.ObligationRouting[0]!==undefined) && 
                            (<tr><td colSpan={5}>
                            
                            <div className="ex-panel__content" style={{borderBottom:"1px solid #ccc"}}>
                            <div style={{width:"100%", height:"100%", background:'#EEEEEE'}}> 
                            <div style={{height: '420px', padding:'40px', width: '100%'}}>
                                <div className="text-left">
                                {/* Данные xxxx*/}
                                        <div className="row mb-2">
                                                <div className="col-4">
                                                    <label className="labelR">
                                                    {getLangValue('Amount')}: 
                                                    <h2>{this.state.ObligationRouting[0].TransferAmount} 
                                                        {currency[this.state.ObligationRouting[0].TransferAmountCurrency]}                                                        
                                                        </h2>
                                                    </label>
                                                </div>
                                                <div className="col-8">                                           
                                                    {getLangValue('DesiredExecutionDate')}: 
                                                        <h2>
                                                        {(this.state.ObligationRouting[0].DesiredEndDate!)?
                                                            this.state.ObligationRouting[0].DesiredEndDate.toString().substr(8,2)+'.'+
                                                            this.state.ObligationRouting[0].DesiredEndDate.toString().substr(5,2)+'.'+
                                                            this.state.ObligationRouting[0].DesiredEndDate.toString().substr(0,4)
                                                            :''}<br/>
                                                        </h2>
                                                </div>                 
                                        </div>                   
                                { // Способ исполнения обязательства                                    
                                    <div className="row mb-2">
                                        <div className="col-4">
                                            <label className="labelR">
                                                {getLangValue('MethodOfPerformanceObligations')}:
                                            </label>
                                        </div>
                                        <div className="col-8">
                                            <select disabled name="" defaultValue={this.state.ObligationRouting[0].TransferType.Type.toString()} 
                                                    className="form-control"
                                                    style={{background:'white'}}>
                                                <option value="1">{getLangValue('CashAtTheMeeting')}</option>
                                                <option value="2">{getLangValue('ToMyPaymentAccountIsListedInExodus')}</option>
                                                <option value="3">{getLangValue('SpecifyAnotherAccount')}</option>
                                            </select>
                                        </div>                 
                                    </div>                   
                                }

                                { // Способ исполнения обязательства ==1 нал +
                                (this.state.ObligationRouting[0].TransferType.Type==1) && 
                                (this.state.ObligationRouting[0].RoutedToUser.UserID==this.state.ObligationRouting[0].TransferUser.UserID) &&
                                (<div className="row mb-2">
                                        <div className="col-4">
                                            <label className="labelR">
                                                {getLangValue('HowToExecute')}:
                                            </label>
                                        </div>
                                        <div className="col-8">                                           
                                            <label className="labelR">{getLangValue('TransferCashAtAMeetingToMePersonally')}</label>
                                        </div>                 
                                </div>)                   
                                }      


                                { // Способ исполнения обязательства ==1 нал +
                                (this.state.ObligationRouting[0].TransferType.Type==1) && 
                                (this.state.ObligationRouting[0].RoutedToUser.UserID!==this.state.ObligationRouting[0].TransferUser.UserID) &&
                                (this.state.ObligationRouting[0].TransferUserCustomDetails=='') &&
                                (<div className="row mb-2">
                                        <div className="col-4">                                            
                                            <label className="labelR">{getLangValue('HowToExecute')}:</label>
                                        </div>
                                        <div className="col-8">
                                            <label className="labelR">
                                                {getLangValue('TransferCashFromExodusUser')}:                                                <br/>
                                                <h4>{this.state.ObligationRouting[0].TransferUser.UserFullName}</h4>                                                
                                            </label>                                            
                                            <img src={this.state.ObligationRouting[0].TransferUser.AvatarBig} 
                                                className="ex-transaction-page__person-avatar main-menu-close-button" 
                                                style={{width:'100px', height:'100px'}}/>                                              
                                        </div>                 
                                </div>)                   
                                }     

                                { // Способ исполнения обязательства == 1 через не пользователя Exodus
                                (this.state.ObligationRouting[0].TransferType.Type==1) && 
                                (this.state.ObligationRouting[0].TransferUser.UserID==0) &&
                                (this.state.ObligationRouting[0].TransferUserCustomDetails!=='') &&
                                
                                (<div className="row mb-2">
                                        <div className="col-4">                                            
                                            <label className="labelR">{getLangValue('Destination')}:</label>
                                        </div>
                                        <div className="col-8">
                                            <label className="labelR">
                                                    {getLangValue('ToWhomToTransferTheMoney')}:
                                                <br/>
                                                <h4>{this.state.ObligationRouting[0].TransferUserCustomDetails}</h4>
                                            </label>                                            
                                        </div>                 
                                </div>)                   
                                }         

                                { // Способ исполнения обязательства == 2 на счет Эксодус
                                (this.state.ObligationRouting[0].TransferType.Type==2) &&                                 
                                (<div className="row mb-2">
                                        <div className="col-4">                                            
                                            <label className="labelR">{getLangValue('HowToExecute')}:</label>
                                        </div>
                                        <div className="col-8">
                                            <label className="labelR">
                                                {getLangValue('TransferToAccount')}:<br/>
                                                <h4>{this.state.ObligationRouting[0].Account.AccountDetails}</h4>
                                            </label>                                                                                      
                                        </div>                 
                                </div>)                   
                                }  

                                { // Способ исполнения обязательства == 3 на указанный
                                (this.state.ObligationRouting[0].TransferType.Type==3) &&                                 
                                (<div className="row mb-2">
                                        <div className="col-4">                                            
                                            <label className="labelR">{getLangValue('HowToExecute')}:</label>
                                        </div>
                                        <div className="col-8">
                                            <label className="labelR">
                                                {getLangValue('TransferToSpecifiedAccountToAccount')}:<br/>
                                                <h4>{this.state.ObligationRouting[0].AccountCustomDetails}</h4>
                                            </label>                                                                                      
                                        </div>                 
                                </div>)                   
                                }  


                                {/*  */}
                                </div>
                                
                                <div className="text-right py-4">          
<button className="btn btn-outline-success" 
        onClick={()=>
        {
        let AccountType='';
        if (this.state.ObligationRouting[0].AccountType!=null)
        if (this.state.ObligationRouting[0].AccountType.AccountTypeName!=null) 
        AccountType=this.state.ObligationRouting[0].AccountType.AccountTypeName;

        let AccountDetail='';
        if (this.state.ObligationRouting[0].Account.AccountDetails!=null)
        if (this.state.ObligationRouting[0].Account.AccountDetails.toString()!=null) 
        AccountDetail=this.state.ObligationRouting[0].Account.AccountDetails.toString();        

        this.ExecuteObligation(
            this.state.ObligationRouting[0].TransferType.Type, // Тип передачи
            AccountType, // Тип аккаунта
            AccountDetail, // Детали аккаунта
            this.state.ObligationRouting[0].TransferUser.UserFullName, // Нал через пользователя Эксодус
            this.state.ObligationRouting[0].TransferUserCustomDetails, // Нал через другого пользователя
            number.ObligationTag.TagID //TagID
            )
        }
        }>
    {getLangValue('ExecuteObligation')}
</button>&nbsp;
                                    <button className="btn btn-outline-success" 
                                            onClick={this.CloseForm}>
                                        {getLangValue('Close')}
                                    </button>                                    
                                </div>                                
                            </div>
                            </div>
                        </div>
                        </td></tr>)}  


                    </tbody>
                    )))}
            </table>                 
        </div>
        )}  

        {page === FilterObligation.Arhiv && (
            <div>
                <table>
                    <tbody>  
                        {head}            
                    </tbody>  
                    <tbody>                               
                        {this.state.Obligations.map((number,index) =>( 
                            ((number.ObligationStatus.ObligationStatus == 1) ||
                            (number.ObligationStatus.ObligationStatus == 5)) &&
                            //!number.IsActive && 
                            (
                            <tr key={index}>
                            <td scope="row">
                                <strong>
                                    {getLang()=='en'?number.ObligationTag.NameEng:number.ObligationTag.NameRus}
                                </strong>
                                <br/>
                                <span style={{fontSize:12}}>
                                    {getLang()=='en'?number.ObligationApplication.ApplicationNameEng:number.ObligationApplication.ApplicationNameRus}
                                </span>
                            </td>
                            <td><strong>{number.ObligationHolder.UserFirstName} 
                            {number.ObligationHolder.UserLastName}</strong><br/>
                                <span style={{fontSize:12}}>
                                {getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span></td> 

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
            </div>
            )}         

                    </div>            
                </div>
            </div>
        </div>);
    }
} 
