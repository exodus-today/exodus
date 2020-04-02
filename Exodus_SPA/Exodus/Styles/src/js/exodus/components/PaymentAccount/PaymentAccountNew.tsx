import * as React from 'react';
import { getApiKey, getUserID, getLangValue } from '../../global';

let GetNameCardNumber = ['undefined',getLangValue('CardNumber'),'Email','WMID wallet','WalletID']
var CardTypeCaption = ["",getLangValue('CardNumber'), getLangValue('PayPalLogin'), 
                        getLangValue('WMpurse'), getLangValue('Bitcoin')];

interface Props {
    update:Function
}

interface State {
    show:boolean
    AccountType:number
    AccountDetails:string
    AccountTypeName:string
    TypeID: number
    BankID: number
    BankName:string
    CardNumber: string;
    AdditionalInfo: string
    ValidTillMonth:number
    ValidTillYear:number
}

export class PaymentAccountNew extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { show: false, 
            AccountType:1,  // Банковская =1 ...5 Paypal
            AccountDetails:'',
            AccountTypeName:'Bank Card',
            TypeID:1,
            BankID:0,
            BankName:'',
            CardNumber:'', 
            AdditionalInfo:'',
            ValidTillMonth:1,
            ValidTillYear:2019
        }
        this.handleClick = this.handleClick.bind(this); 
        this.handleCardNumber = this.handleCardNumber.bind(this); 
        this.handleBankCardSelect = this.handleBankCardSelect.bind(this); 
    }

    validateNumeral=(evt:any)=>{
        // deny cyrillic input 
        const regExp = /[^\d\,+$]+/g;
        if (regExp.test(evt.key)) {
            evt.preventDefault();
        }
    }

    handleClick=()=>{
        this.setState({ show: !this.state.show, AccountType:1 })
    }
    handleBankCardSelect=(e:any)=>{
        this.setState( { AccountType: e.target.value } )
    }    
    handleTypeSelect=(e:any)=>{
        this.setState( { TypeID: e.target.value } )
    }      
    handleCardNumber=(evt:any)=>{
        if (evt.target.value.length>=6) {
            fetch('/api/BankCard/Get_BankNameByCardNumber?cardNumber='+
                    evt.target.value.substr(0,6), {credentials: 'include'})
            .then(response=>response.json())
            .then(json=>{ console.log(json.Data)
                this.setState({ BankName: json.Data.BankName, BankID: json.Data.BankID }) 
            })
        } else
            this.setState({ BankName: '', BankID:0 })

        this.setState({ CardNumber: evt.target.value });
    }
    selectValidTiltMonth=(evt:any)=>{        
        this.setState( {ValidTillMonth: evt.target.value})
    }
    selectValidTiltYear=(evt:any)=>{       
        this.setState( {ValidTillYear: evt.target.value})
    }
    selectNoBankCard=(e:any)=>{
        this.setState( { AccountDetails: e.target.value } )
    }        

    addNoBankCard = async (event:any)=>{   
        fetch("/api/PaymentAccount/Add",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: "post",
                body:               
                JSON.stringify({                    
                    "AccountType":this.state.AccountType,
                    "AccountDetails":this.state.AccountDetails,                    
                    "UserID":getUserID().toString()
                }), 
                credentials: 'include'
            })
            .then(res => {
                if (res.ok) {
                    this.props.update();
                } else { }
            });
        this.setState({ show: false, AccountType:1});
        event.preventDefault();
    }

    addBankCard = async (event:any)=>{
        fetch("/api/BankCard/Add?api_key="+getApiKey(),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: "post",
                body:               
                JSON.stringify({
                    "AccountType":this.state.AccountType,                    
                    "AccountDetails":this.state.AccountDetails,                    
                    "UserID":getUserID(),
                    "TypeID":this.state.TypeID,
                    "BankID": this.state.BankID,
                    "BankName": this.state.BankName,
                    "CardNumber":this.state.CardNumber,
                    "ValidTillMonth": this.state.ValidTillMonth,
                    "ValidTillYear": this.state.ValidTillYear,
                    "AdditionalInfo": ""
                    }), 
                credentials: 'include'        
            })
            .then(res => {
                if (res.ok) {
                    this.props.update();
                } else { }
            });
        this.setState({ show: false, AccountType:1});        
        event.preventDefault();
    }

    render() { 
        return (
        <div>
            { !this.state.show && 
                <div className="text-right" style={{height: '50px'}}>
                    <div className="btn btn-outline-primary if-not-expanded" onClick={this.handleClick}>
                        {getLangValue('AddPaymentDetails')}
                    </div>
                </div>
            }

            { this.state.show &&
            <div className="pt-5">
                <form action="/PaymentAccount/BankCardUpdate" method="POST" 
                        id="ex-new-payment-form" data-update="/PaymentAccount/PaymentAccountList">
                    <input type="hidden" name="CardID" value="34" />
                    <input type="hidden" name="AdditionalInfo" />

                <div className="row mb-4">
                    <div className="col-3 d-flex align-items-center">
                        {getLangValue('NewPaymentDetails')}:
                    </div>
                    <div className="col-9">
                        <select className="form-control" defaultValue="1" onChange={this.handleBankCardSelect}
                            style={{ textShadow: '0 0 0 #4f4f4f'}}>
                            <option value="1">{getLangValue('BankCard')}</option>
                            <option value="2">PayPal</option>
                            <option value="3">WebMoney</option>
                            <option value="4">Bitcoin</option>
                        </select>
                    </div>            
                </div>
                { this.state.AccountType==1 &&
                <div>
                    <div className="row mb-4">
                        <div className="col-3 d-flex align-items-center">
                            {getLangValue('CardType')}:
                        </div>
                        <div className="col-9">
                            <select className="form-control" name="TypeID" defaultValue="1" onChange={this.handleTypeSelect}
                                style={{ textShadow: '0 0 0 #4f4f4f'}}>
                                <option value="1">Visa</option>
                                <option value="2">MasterCard</option>
                                <option value="3">American Express</option>
                                <option value="4">Discover</option>
                                <option value="5">Maestro</option>
                            </select>
                        </div>
                    </div>
                                
                    <div className="row mb-4">
                        <div className="col-3 d-flex align-items-center">
                            {/* Название номер карты xxxx */}
                            {GetNameCardNumber[this.state.AccountType]}:
                        </div>
                        <div className="col-9">
                            <input type="text" 
                                    name="CardNumber" 
                                    className="form-control" 
                                    defaultValue="" 
                                    autoComplete="off" 
                                    onChange={this.handleCardNumber}
                                    onKeyPress={this.validateNumeral} />
                        </div>
                    </div>                
                    <div className="row mb-4">
                        <div className="col-3 d-flex align-items-center">
                            {getLangValue('Validity')}:
                        </div>
                            <div className="col-2">
                                <select className="form-control" id="ValidTillMonth" name="ValidTillMonth" onChange={this.selectValidTiltMonth} 
                                        style={{ textShadow: '0 0 0 #4f4f4f'}}>
                                    <option>01</option>                    
                                    <option>02</option>
                                    <option>03</option>
                                    <option>04</option>
                                    <option>05</option>
                                    <option>06</option>
                                    <option>07</option>
                                    <option>08</option>
                                    <option>09</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                </select>
                            </div>
                            <div className="col-2">
                                <select className="form-control" 
                                        style={{ textShadow: '0 0 0 #4f4f4f'}}
                                        id="ValidTillYear" 
                                        name="ValidTillYear" 
                                        onChange={this.selectValidTiltYear}>
                                    <option>2019</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                    <option>2027</option>
                                    <option>2028</option>
                                </select>
                            </div>
                        </div>                
                        <div className="row mb-4">
                            <div className="col-3 d-flex align-items-center">
                                {getLangValue('IssuedBank')}:
                            </div>               
                            <div className="col-9">{this.state.BankName}</div>
                                <input type="hidden" name="AdditionalInfo" value="" />
                                <input type="hidden" id="BankName" name="BankName" value="Visa" />
                                <input type="hidden" id="CardValidTill" name="CardValidTill" value="" />
                            </div>

                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col">
                                <button className="btn btn-outline-success w-100" onClick={this.addBankCard}>
                                    {getLangValue('SaveCard')}
                                </button>
                            </div>
                            <div className="col">
                                <div className="btn btn-outline-secondary w-100" onClick={this.handleClick}>
                                    {getLangValue('Cancel')}
                                </div>
                            </div>
                    </div>    
                    </div>

                }
                { 
                    // Не банковские карты 
                    this.state.AccountType!=1 && 
                <div>
                    <div className="row mb-4">
                        <div className="col-3 d-flex align-items-center">
                            {/* {getLangValue('CardNumber')}: */}
                            {CardTypeCaption[this.state.AccountType]}:
                        </div>
                        <div className="col-9">
                            <input type="text" 
                                    name="CardNumber" 
                                    className="form-control"
                                    defaultValue="" 
                                    onChange={this.selectNoBankCard} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col">
                            <button className="btn btn-outline-primary w-100" onClick={this.addNoBankCard}>
                                {getLangValue('SaveDetails')}
                            </button>
                        </div>
                            <div className="col">
                            <div className="btn btn-outline-secondary w-100" onClick={this.handleClick}>
                                {getLangValue('Cancel')}
                            </div>
                            </div>
                    </div>                            
                </div>                                    
                }
                
                </form>
            </div>
            }
        </div>
        )
    }
}
