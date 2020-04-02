import * as React from 'react';
import { Currency, TransactionWay, PaymentAccountType, Application } from '../../enums';
import { PaymentAccountStore } from '../../stores/PaymentAccountStore';
import { TransactionStore } from '../../stores/TransactionStore';

import { notify } from '../../components/Shared/Notifications';
import { getLangValue, getUserID } from '../../global'

import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';
import moment = require("moment");
import { Transaction } from '../../classes/Transaction';
import { transaction } from 'mobx';

interface Props {
    paymentAccountList: PaymentAccountStore[],
    transaction: TransactionStore,
    ApplicationID: Application,
    TagID: string|undefined,
    close:Function
}

interface State {
    Currency: number
    Amount: number
    PaymentAccountID:number
    TransactionMemo:string
}

@observer
export class TransactionCreateComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { Currency: 1, Amount: 2, PaymentAccountID: 0, TransactionMemo:'' }        
        this.handleClick = this.handleClick.bind(this);
    }
    CurrencySelect=(e:any)=>{
        this.setState({Currency:e.target.value})
    }

    saveMemo=(e:any)=>{ 
        this.setState({TransactionMemo:e.target.value})
    }

    AmountSelect=(e:any)=>{
        this.setState({Amount:e.target.value})
    }
    AccountSelect=(e:any)=>{
        this.setState({PaymentAccountID:e.target.options[e.target.options.selectedIndex].getAttribute('data-key')})
    }
    handleClick =() =>{        
        fetch("/api/Transaction/Add",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
            },
            method: "post",
            body:               
            JSON.stringify({ 
                "ApplicationID": this.props.ApplicationID,
                "UserReceiver": this.props.transaction.UserReceiver.UserID,
                "UserSender": getUserID(),
                "Currency": this.state.Currency,
                "Amount": this.state.Amount,
                "TagID": this.props.TagID,
                "TransferType": 1,
                "PaymentAccountID": this.state.PaymentAccountID,
                "TransactionDate": this.props.transaction.TransactionDate,
                "TransactionMemo": this.state.TransactionMemo
             }), 
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data=>{            
            let dic = {"SenderID":getUserID(),"ReceiverID":this.props.transaction.UserReceiver.UserID, 
            "TransactionID":data.Data};
            fetch('/api/Events/Add?type=5',
            {
                headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json; charset=utf-8'
               },           
               body:                 
               JSON.stringify( dic ),
               method:'post', 
               credentials: 'include'}
            )                       
        })
        notify.success(getLangValue("Notification.SentTransaction"));
        this.props.close()       
    }
    render () {   
        return (
            <form action="" method="POST">
                <input type="hidden" name="ApplicationID" value="1"/>
                <input type="hidden" name="TagID" value={this.props.TagID}/>
                <input type="hidden" name="PaymentAccountID" value="1"/>
                <input type="hidden" name="UserReceiver" value={this.props.transaction.UserReceiver.UserID}/>
                <input type="hidden" name="TransferType" value={this.props.transaction.TransactionWay}/>
                <div className="form-group">
                    <label>{getLangValue('Amount')}</label>
                    <div className="row">
                        <div className="col-md-8">
                            <input onChange={this.AmountSelect} type="number" name="Amount" className="form-control" defaultValue="0"/>
                        </div>
                        <div className="col-md-4">
                            <select onChange={this.CurrencySelect} className="form-control" name="Currency">
                                <option value={Currency.USD}>{getLangValue('Dollars')}</option>
                                <option disabled value={Currency.UAH} style={{color:'#ccc'}}>{getLangValue('Hryvnia')}</option>
                                <option disabled value={Currency.RUB} style={{color:'#ccc'}}>{getLangValue('Rubles')}</option>
                                <option disabled value={Currency.EUR} style={{color:'#ccc'}}>{getLangValue('Euro')}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Дата транзакции</label>
                    <DatePicker
                        onChange={e=>this.props.transaction.TransactionDate=e}
                        className="form-control"
                        selected={this.props.transaction.TransactionDate}
                        name="TransactionDate"
                    />
                </div>

                { this.props.paymentAccountList!== undefined && (
                <div className="form-group">
                    <label>Способ передачи</label>
                     <select className="form-control" onChange={this.AccountSelect}>
                        <option key="Cash" value={JSON.stringify([TransactionWay.Cash, null])}>Наличные</option>
                        {this.props.paymentAccountList.map(item=> 
                            {return <option key={item.AccountID} data-key={item.AccountID}>{item.AccountTypeName}:{item.Card.CardNumber}{item.AccountDetails}</option>}
                        )} 
                        
                    </select>
                </div>
                )}

                <div className="form-group">
                    <label>Дополнительная информация</label>
                    <textarea name="TransactionMemo" defaultValue="" className="form-control" rows={3} onChange={this.saveMemo} />
                </div>
                
                <div className="btn btn-outline-danger w-100 mb-4" onClick={this.handleClick}>Создать транзакцию</div>
            </form>
        );
    }
}