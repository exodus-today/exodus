// import * as React from 'react';
// import { PaymentAccountStore } from '../../stores/PaymentAccountStore';
// import { TransactionCreateComponent } from '../../components/Transaction/TransactionCreateComponent';
// import { TransactionStore } from '../../stores/TransactionStore';
// import { observer } from 'mobx-react';
// import { UserStore } from '../../stores/UserStore';
// import { Application, PaymentAccountType } from '../../enums';
// import * as moment from 'moment';

// interface Props {
//     UserID: number;
// }

// interface State {
//     paymentAccountList: PaymentAccountStore[],
//     transaction: TransactionStore,
// }

// @observer
// export class PaymentAccountListContainer extends React.Component<Props, State> {
//     componentWillMount() {
//         //fetch(`/PaymentAccount/PaymentAccountList_JS?UserID=${this.props.UserID}`, {credentials: 'include'})
//         fetch(`api/PaymentAccount/PaymentAccountGet_List?UserID=${this.props.UserID}`, {credentials: 'include'})
//             .then(response=>response.json())
//             .then(json=>{
//                 const paymentAccountList = json.PaymentAccounts.map((item: any)=>new PaymentAccountStore(item));

//                 const transaction = new TransactionStore({
//                     PaymentAccount: paymentAccountList[0],
//                     UserReceiver: new UserStore(json.User),
//                     TransactionDate: moment(),
//                 });

//                 this.setState({ paymentAccountList, transaction })
//             })
//             .then(_=>alert())
//             //.then(_=>console.log('PaymentAccountListContainer'))
//     }
//     render() {
//         if (this.state === null) return 'Loading...';

//         const { paymentAccountList, transaction } = this.state;        
//         return (
//             <React.Fragment>
//             <div className="row">
//                {/* <div className="col-md-6">
//                     {paymentAccountList.map(item=>(<React.Fragment key={item.AccountID}>
//                     <div onClick={e=>transaction.PaymentAccount=item} className="row">
//                         <div className="col">
//                             <img src={`/Styles/dist/images/payment/${item.AccountTypeName}.svg`} height="30" />
//                             <br />
//                             {item.AccountType === PaymentAccountType.BankCard ? item.Card.CardNumber : item.AccountDetails}
//                         </div>
//                         <div className="col d-flex align-items-center justify-content-end">
//                             <div className="custom-control custom-radio">
//                                 <input type="radio" className="custom-control-input" checked={transaction.PaymentAccount===item} readOnly />
//                                 <span className="custom-control-indicator" />
//                             </div>
//                         </div>
//                     </div>
//                     <hr />
//                     </React.Fragment>))}
//                 </div>
//                 <div className="col-md-6">
//                     <TransactionCreateComponent
//                         transaction={transaction}
//                         ApplicationID={Application.Direct}
//                     />
//                     </div>*/}
//             </div>
//             </React.Fragment>
//         );
//     }
// }
