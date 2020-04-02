// import * as React from 'react';

// interface Props {
//     EventsType:number
//     Active:string
// }

// interface State {
//     ActiveI:string
// }

// export class EventsRow extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = { ActiveI : this.props.Active };
//     }

//     handlerSetActive = () => {
//         this.setState ({ActiveI:'ex-list__item ex-list__item_active'})
//     }

//     render () {
//         return(
//             <div className="ex-list__viewport">
//                 <div className={this.state.ActiveI}>
//                     <div className="ex-list__item-content">
//                         <div className="ex-transaction-item ex-transaction-item_success" onClick={this.handlerSetActive}>
//                             <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                             <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                             <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                             <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                             <div className="ex-transaction-item__date">15 мин</div>
//                             <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                         </div>
//                     </div>
//                 </div>
//             </div>)
//     }
// }
