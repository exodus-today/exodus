// import * as React from 'react';
// import { PaymentAccounts } from '../../classes/PaymentAccounts';
// const shortid = require('shortid');
// var BankCardType = ["","Visa", "MasterCard", "AmericanExpress", "Discover", "Maestro"]

// interface Props {
//     AccountID:number;
// }

// interface State {
//     PaymentsAccount:PaymentAccounts|any;
// }

// export class PaymentAccountByID extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = { PaymentsAccount:null };
//     }

//     componentWillMount() {
//         if (this.props.AccountID > 0) 
//         fetch('/api/PaymentAccount/Get_ByID?AccountID='+this.props.AccountID.toString(), {credentials: 'include'})
//             .then( response => response.json() ) 
//             .then( json=>{ this.setState({PaymentsAccount: json.Data}) }            
//         )
//     }    

//     render() {
//         let id = shortid.generate();
//         return (<div key={id}>
//                     {this.state.PaymentsAccount==null?'':this.state.PaymentsAccount.Card.CardNumber}<br/>
//                     {this.state.PaymentsAccount==null?'':BankCardType[this.state.PaymentsAccount.Card.BankCardType]}
//                     {this.state.PaymentsAccount==null?'':this.state.PaymentsAccount.BankName}
//                 </div>
//         );
//     }
// } 
