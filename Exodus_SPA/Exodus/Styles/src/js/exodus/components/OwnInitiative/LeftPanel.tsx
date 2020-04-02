// import * as React from 'react';

// interface Props {
    
// }

// interface State {
//     width:number;
// }

// export class LeftPanel extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = { width: document.documentElement.clientWidth/3 +18};
//     }

//     componentDidMount = ()=> {
//         window.addEventListener('resize', this.resize);
//     }

//     componentWillUnmount = ()=> {
//         window.removeEventListener('resize', this.resize);
//        }

//     resize =() =>{
//         this.setState ({ width: document.documentElement.clientWidth/3 +18});
//     }

//     render() {
//         return (<div>
            
//             <div className="ex-navigation"></div>
//                 <div className="ex-list ex-grid_0-1-0">
//                     <div className="ex-list__header">
//                         <div className="ex-list__item">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-list__header-title">
//                                     <i className="icons-bell mr-2"></i>
//                                     Все уведомления:
//                                 </div>
//                                 <select className="ex-list__header-select">
//                                     <option>новые сверху</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

// <div style={{width:this.state.width-16, overflow:'hidden'}}>
// <div style={{height:'100vh' , width:this.state.width, overflowY:'scroll'}}> 

//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white ">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div> 
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div> 
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>                                                             
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>                                                                                                                        
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="ex-list__viewport">
//                         <div className="ex-list__item ex-list__item_white">
//                             <div className="ex-list__item-content">
//                                 <div className="ex-transaction-item ex-transaction-item_success">
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__from" />
//                                     <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" />
//                                     <img src="/Styles/dist/images/avatar.png" className="ex-transaction-item__to" />
//                                     <div className="ex-transaction-item__description">Требуется подтверждение транзакции 40 USD</div>
//                                     <div className="ex-transaction-item__date">15 мин</div>
//                                     <img src="/Styles/dist/images/notice-green.png" className="ex-transaction-item__notice" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>                                                                                
// </div>
// </div>                
//                 </div>
//             </div>)
//             }
//         }
