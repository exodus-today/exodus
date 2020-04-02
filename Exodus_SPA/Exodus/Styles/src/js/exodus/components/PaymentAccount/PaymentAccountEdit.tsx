import * as React from 'react';
import { PaymentAccountStore } from '../../stores/PaymentAccountStore'
import { getApiKey, getUserID, getLangValue } from '../../global';

let GetNameCardNumber = ['undefined', getLangValue('CardNumber'), 'E-mail', 'WMID wallet', 'WalletID']
var AccountType = ["", "BankAccount", "PayPal", "WebMoney", "Bitcoin"];
var BankCardType = ["","Visa", "MasterCard", "AmericanExpress", "Discover", "Maestro"]
var CardTypeCaption = ["",getLangValue('CardNumber'), getLangValue('PayPalLogin'), 
                        getLangValue('WMpurse'), getLangValue('Bitcoin')];

interface Props {
    PaymentsAccounts:PaymentAccountStore;
    update:Function;
}

interface State {
    edit: boolean
    AccountDetails: string
    BankID: number
    BankName: string
    CardNumber: string;
    AdditionalInfo: string
    ValidTillMonth:number
    ValidTillYear:number
    CadrID:number
    TypeID:number
}

function to4 (x:string) {
   return x.replace(/(\d)(?=(\d\d\d\d)+([^\d]|$))/g, '$1 ')
}

export class PaymentAccountEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);        
        this.state = { edit: false, 
                        AccountDetails: '',
                        BankID:0,//this.props.PaymentsAccounts.Card.BankID,
                        BankName:this.props.PaymentsAccounts.Card.BankName,
                        CardNumber:this.props.PaymentsAccounts.Card.CardNumber,
                        AdditionalInfo:this.props.PaymentsAccounts.Card.AdditionalInfo,
                        CadrID:this.props.PaymentsAccounts.Card.CardID,
                        TypeID:this.props.PaymentsAccounts.Card.TypeID,
                        ValidTillMonth: Number(this.props.PaymentsAccounts.Card.CardValidTill.toString().substr(5,2)),
                        ValidTillYear: Number(this.props.PaymentsAccounts.Card.CardValidTill.toString().substr(0,4))
        };
        this.accountDetails = this.accountDetails.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.updateNoBankCard = this.updateNoBankCard.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    validateNumeral=(evt:any)=>{
        // deny cyrillic input 
        const regExp = /[^\d\,+$]+/g;
        if (regExp.test(evt.key)) {
            evt.preventDefault();
        }
    }    

    handleEdit=()=>{
        this.setState ({ edit: !this.state.edit })
    }
    
    accountDetails=(e:any)=>{ this.setState ({AccountDetails: e.target.value}) }
    tillMonth=(e:any)=>{ this.setState ({ValidTillMonth: e.target.value}) }
    tillYear=(e:any)=>{ this.setState ({ValidTillYear: e.target.value}) }    
    typeID=(e:any)=>{ this.setState ({TypeID: e.target.value}) }

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

    updateBankCard = async (event:any)=>{
        fetch("/api/BankCard/Update?api_key="+getApiKey(),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: "post",
                body:               
                JSON.stringify({ 
                     "CadrID": this.state.CadrID,
                     "TypeID": this.state.TypeID,
                     "BankID": this.state.BankID,
                     "BankName": this.state.BankName,
                     "CardNumber": this.state.CardNumber,
                     "ValidTillMonth": this.state.ValidTillMonth,
                     "ValidTillYear": this.state.ValidTillYear,
                     "AdditionalInfo": this.state.AdditionalInfo,
                     "AccountDetails":this.state.AccountDetails,
                     "UserID":getUserID()
                    }), 
                credentials: 'include',        
            })
            .then(res => {
                if (res.ok) {
                    this.props.update();
                } else {
                }
            });            
        event.preventDefault();
    }

    updateNoBankCard = async (event:any)=>{        
        fetch("/api/PaymentAccount/Update?api_key="+getApiKey(),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: "post",
                body:               
                JSON.stringify({ 
                    "AccountID":this.props.PaymentsAccounts.AccountID,
                    "AccountType":"1",
                    "AccountDetails":this.state.AccountDetails,
                    "UserID":getUserID()
                    }), 
                credentials: 'include',        
            })
            .then(res => {
                if (res.ok) {
                    this.props.update();
                } else {
                }
            });
        event.preventDefault();
    }

    handleDelete = async (event:any)=>{                
        fetch('/api/PaymentAccount/Delete?AccountID='+this.props.PaymentsAccounts.AccountID, 
        { method: "post", credentials: 'include'})        
        .then(res => {
            if (res.ok) {
                this.props.update()
            } else { }
        });
        event.preventDefault();
    }

    render() { 
        return (<div>
            <div className="py-3">
                <div className="row">
                    <div className="col-4">
                            <img src={(this.props.PaymentsAccounts.AccountType === 1)?
                                "/Styles/dist/images/payment/"+BankCardType[this.props.PaymentsAccounts.Card.TypeID]+".png":
                                "/Styles/dist/images/payment/"+AccountType[this.props.PaymentsAccounts.AccountType]+".svg"} style={{height: '30px'}} />
                    </div>
                    <div className="col-4">
                        { this.props.PaymentsAccounts.AccountType==1 ? 
                            to4(this.props.PaymentsAccounts.Card.CardNumber) : 
                            (this.props.PaymentsAccounts.AccountDetails)} 
                        <br/>
                        <p style={{fontSize: '12px', fontWeight: 'normal'}}>
                            { this.props.PaymentsAccounts.Card.BankName }
                            <br/>
                            { (this.props.PaymentsAccounts.AccountType==1) && (this.props.PaymentsAccounts.Card.CardValidTill.toString().substr(5,2)) } 
                            { (this.props.PaymentsAccounts.AccountType==1) && (' / ') }
                            { (this.props.PaymentsAccounts.AccountType==1) && this.props.PaymentsAccounts.Card.CardValidTill.toString().substr(2,2) }
                        </p>
                    </div>
                    <div className="col-4">
                        <div className="text-right text-primary w-100">
                            { this.state.edit ?                                
                                <span className="if-expanded" style={{cursor:'pointer'}} onClick={this.handleEdit}>{getLangValue('Cancel')}</span>:
                                <span className="if-not-expanded" style={{cursor:'pointer'}} onClick={this.handleEdit}>{getLangValue('Edit')}</span>
                            }
                            <i className="ml-4 small icons-edit"></i>
                        </div>
                    </div>
                </div>
            
        { this.state.edit && 

        <form action="" method="POST" id="ex-new-payment-form" data-update="">
                <input type="hidden" name="CardID" value="34" />
                <input type="hidden" name="AdditionalInfo" />
                {/* ВИЗА */}
                { this.props.PaymentsAccounts.AccountType==1 &&
                    <div>
                        <div className="row mt-5 mb-4">
                            <div className="col-3 d-flex align-items-center">
                                {getLangValue('CardType')}:
                            </div>
                            <div className="col-9">
                                <select className="form-control" name="TypeID" 
                                        style={{ textShadow: '0 0 0 #4f4f4f' }}
                                        defaultValue={this.state.TypeID.toString()} onChange={this.typeID}>
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
                                {getLangValue('CardNumber')}: 
                            </div>
                            <div className="col-9">
                                <input type="text" 
                                        name="CardNumber" 
                                        className="form-control" 
                                        defaultValue={this.props.PaymentsAccounts.Card.CardNumber} 
                                        autoComplete="off"
                                        onChange={this.handleCardNumber}
                                        onKeyPress={this.validateNumeral}/>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-3 d-flex align-items-center">
                                {getLangValue('Validity')}:
                            </div>
                            <div className="col-2">                                                        {/* 01-05-19*/}
                                <select className="form-control" 
                                        style={{ textShadow: '0 0 0 #4f4f4f' }}
                                        name="ValidTillMonth" 
                                        defaultValue={this.props.PaymentsAccounts.Card.CardValidTill.toString().substr(5,2)} 
                                        onChange={this.tillMonth} >
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
                                        defaultValue={this.props.PaymentsAccounts.Card.CardValidTill.toString().substr(0,4)} 
                                        onChange={this.tillYear}>
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
                            <div className="col-9">
                               {this.state.BankName}
                            </div>
                            <input type="hidden" name="AdditionalInfo" value="" />
                            <input type="hidden" id="BankName" name="BankName" value="Visa" />
                            <input type="hidden" id="CardValidTill" name="CardValidTill" value="" />
                        </div>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col">
                                <button className="btn btn-outline-success w-100" onClick={this.updateBankCard}>
                                    {getLangValue('SaveCard')}
                                </button>
                            </div>
                            <div className="col">
                            <div className="btn btn-outline-secondary w-100" onClick={this.handleDelete}>
                                {getLangValue('Delete')}
                            </div>
                            </div>
                        </div>                                               
                    </div>                   
                }

                { this.props.PaymentsAccounts.AccountType!=1 &&
                    <div>
                        <div className="row mt-5 mb-4">
                            <div className="col-3 d-flex align-items-center">
                                {CardTypeCaption[this.props.PaymentsAccounts.AccountType]}:
                            </div>
                            <div className="col-9">
                                <input type="text" name="AccountDetails" className="form-control" defaultValue={this.props.PaymentsAccounts.AccountDetails}  onChange={this.accountDetails} autoComplete="off" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col">
                                <button className="btn btn-outline-primary w-100" onClick={this.updateNoBankCard}>
                                    {getLangValue('SaveDetails')}
                                </button>
                            </div>
                            <div className="col">
                            <div className="btn btn-outline-secondary w-100" onClick={this.handleDelete}>
                                    {getLangValue('Delete')}
                            </div>
                            </div>
                        </div>                        
                </div>                    
                }              
            </form>}
            </div>
            <hr />
            </div>    
        )
    }
}
