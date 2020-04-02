// import * as React from 'react';
// import { Obligation } from '../../classes/Obligation';
// import { getLangValue } from '../../global.js';
// import { Currency } from '../../enums';

// interface Props {
//     ObligationID: number;
//     FulFillOrTransfer: number;  // Вид 1 = Исполнить / 2 = Передать    RoutingTypeID

//     KakPerechislit: number; // Как перечислить 1 Наличкой / 2 На счет в Эксодус / 3 на другой аккаунт TransferTypeID         
//         CardNumber: string; // Описанный в эксодус номер карты 
//         CardType: number;   // Описанный в эксодус тип карты
//         AccountCustomDetails: string; // Кастомный аккаунт (номер карты)

//     KomuPerechislit: number; // Кому перечислить 1 = Мне лично / 2 Пользователю эксодус / 3 левому чуваку
//         UserID: number; // код пользователя кому перечислить
//         fio: string; // ФИО кому из Эксодус
//         TransferUserCustomDetails: string; // Кастомный юзер = текст
    
//     AmountTotal: number; // Платеж
//     ObligationCurrency: number; // Валюта 1 = $ ...    
//     EndDate:string;   
//     Close: Function;
// }

// interface State {
//     Obligations: Array<Obligation>;
// }

// export class Dashboard extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = { Obligations:[] };
//     }

//     componentWillMount() {
              
//         fetch('/api/Obligation/Routing_ByObligationID?ObligationID='+this.props.ObligationID, {credentials: 'include'})
//             .then(response => response.json()) 
//             .then( json=>{ 
//                 this.setState({ Obligations: json.Data.map((item: any)=> { return new Obligation(item) }) })
//             }
//         )
//     }    

//     render() {
//         const currency = [  getLangValue('Undefined'),
//                             getLangValue('Currency.Symbol.USD'),
//                             getLangValue('Currency.Symbol.GRN'),
//                             getLangValue('Currency.Symbol.RUB'),
//                             getLangValue('Currency.Symbol.EUR')];
//         return (
// <div style={{width:"100%", height:"100%",background:'#ccc'}}>                      
// <div className="ex-panel__content" style={{borderBottom:"1px solid #e0e0e0"}}>
//         <div className="col-3 text-center"></div>
//             <div className="col-3 text-center"></div>
//             <div className="row mb-4" style={{background:'#eee'}}>
//                 { // Раздел исполнить обязательство
//                 (this.props.FulFillOrTransfer == 1) && 
//                 (<div style={{height:500, padding:'20px', width:'100%'}}>
//                     <div className="row mb-4" >
//                         <div className="col-md-5">
//                             <label className="labelR">{getLangValue('MethodOfPerformanceObligations')}:</label>                                                
//                         </div>
//                         <div className="col-md-7">
//                         {/* Как перечислить 1 Наличкой / 2 На счет в Эксодус / 3 на другой аккаунт */}
//                         <select name="" 
//                             defaultValue={this.props.KakPerechislit.toString()} 
//                             className="form-control"
//                             style={{ textShadow: '0 0 0 #4f4f4f' }}>
//                             <option value="1">{getLangValue('CashAtTheMeeting')}</option>
//                             <option value="2">{getLangValue('ToMyPaymentAccountIsListedInExodus')}</option>
//                             <option value="3">{getLangValue('SpecifyAnotherAccount')}</option>
//                         </select>
//                         </div>
//                     </div>

//                     { // Передать наличными
//                     (this.props.KakPerechislit == 1) && 
//                     (<div>
//                     <div className="row mb-4" >
//                         <div className="col-md-5">
//                             <label className="labelR">{getLangValue('ThroughWhomToPass')}:</label>
//                         </div>
//                         <div className="col-md-7">
//                         <select 
//                             name="" 
//                             defaultValue={this.props.KomuPerechislit.toString()} 
//                             className="form-control" 
//                             // onChange={this.whomTransferFunds}
//                             style={{ textShadow: '0 0 0 #4f4f4f' }} >
//                             <option value="1">{getLangValue('ToMePersonally')}</option> {/* Лично мне */}
//                             <option value="2">{getLangValue('ThroughAnotherExodusUser')}</option> {/* Через другого пользователя Exodus*/}
//                             <option value="3">{getLangValue('SpecifyAnotherPerson')}</option> {/* Другого человека */}
//                         </select>                                            
//                         </div>
//                     </div>             

//                     { // Лично мне:
//                         (this.props.KakPerechislit == 1) && (this.props.KomuPerechislit==1) &&
//                         <div>Лично мне</div>                                                
//                     }
//                     { // Получатель из эксодус список:
//                         (this.props.KakPerechislit == 1) && (this.props.KomuPerechislit==2) &&
//                         (<div style={{paddingBottom:10}}>
//                             <div className="row mb-4">
//                                 <div className="col-md-5">
//                                     <label>{getLangValue('Recipient')}:</label>
//                                 </div>
//                                 <div className="col-md-7">
//                                     {this.props.fio}
//                                 </div>
//                             </div>                          
//                           </div>
//                         )                            
//                     }

//                     {(this.props.KakPerechislit == 1) && (this.props.KomuPerechislit==3) &&
//                     <div className="row mb-4">
//                         <div className="col-md-5">
//                             <label>{getLangValue('SpecifyTheRecipient')}:</label>
//                         </div>
//                         <div className="col-md-7">
//                             <textarea className="form-control" name="TransferUserCustomDetails" defaultValue={this.props.TransferUserCustomDetails}></textarea>
//                         </div>
//                     </div>                                                
//                     }
//                 </div>)}

//                     {   // Перечислить на карту описанную в Эксодус
//                         (this.props.KakPerechislit == 2) && 
//                         <div>
//                             Описание карты
//                             {this.props.CardNumber} {this.props.CardType}
//                             {/* <SelectPaymentCard name={"MyCard"} 
//                             CardNumbers={this.state.CardNumbers} 
//                             AccountTypes={this.state.AccountTypes} 
//                             TypeID={this.state.TypeID} 
//                             CardID={this.state.CardID}
//                             onSelectAccountID={this.handleAccount} />*/}
//                         </div>
//                     }

//                     {   // Перечислить на указанный счет
//                         (this.props.KakPerechislit == 3) && (<div>
//                         <div className="row mb-4">
//                             <div className="col-md-5">                            
//                                 <label>
//                                     {getLangValue('DescriptionOfThePaymentSystemAndAccount')}:
//                                 </label> {/* Описание платежной системы и счета */}
//                             </div>
//                             <div className="col-md-7">
//                                 <textarea className="form-control" 
//                                         name="AccountCustomDetails">
//                                 </textarea>
//                             </div>
//                         </div>
//                     </div>) }

//                     <div className="row mb-4">
//                         <div className="col-md-5">
//                             <label className="labelR">
//                                 {getLangValue('AmountRange')}
//                             </label>
//                         </div>                        
//                         <div className="col-md-4">
//                             <input type="number" 
//                                 disabled
//                                 className="form-control" 
//                                 name="TotalAmount" 
//                                 min="1" 
//                                 defaultValue={this.props.AmountTotal.toFixed(2)} 
//                                 pattern="\d+(\,\d{2})?" 
//                                 />
//                         </div>
//                             <div className="col-md-3" >
//                             <select className="form-control" 
//                                     style={{ textShadow: '0 0 0 #4f4f4f' }}
//                                     name="TotalAmountCurrencyID" 
//                                     disabled value={this.props.ObligationCurrency}> {/*onChange={this.selectCurrency}*/}
//                                 <option value={Currency.USD}>{currency[Currency.USD]}</option>
//                                 <option disabled value={Currency.UAH}>{currency[Currency.UAH]}</option>
//                                 <option disabled value={Currency.RUB}>{currency[Currency.RUB]}</option>
//                                 <option disabled value={Currency.EUR}>{currency[Currency.EUR]}</option>
//                             </select>
//                         </div>  
//                     </div>

//                     <div className="row mb-4">                                            
//                         <div className="col-md-5">
//                         <label className="labelR">{getLangValue('DesiredFinalDateOfPerformance')}:</label>
//                     </div>
//                         <div className="col-md-3">
//                         <input type="number" 
//                             disabled
//                             className="form-control" 
//                             name="Date" 
//                             defaultValue={this.props.EndDate.toString()}
//                             />
//                         </div>
//                     </div>                                            
//                  </div>
//                 )
//             }
//         </div>                      

//         <div className="text-right">           
//             <button className="btn btn-outline-success" onClick={this.props.Close()}>
//                 {getLangValue('Close')}
//             </button>
//         </div>
//     </div>  
// </div>
//         );
//     }
// } 
