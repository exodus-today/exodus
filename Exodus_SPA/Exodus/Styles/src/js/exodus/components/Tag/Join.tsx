// import * as React from 'react';
// import { Currency, PaymentPeriod, Period } from '../../enums';
// //import { UserStore } from '../../stores/UserStore';
// //import { Moment } from 'moment';
// //import moment = require("moment");

// interface Props {
//     UserID: number,
//     TagID: number
// }

// export class Join extends React.Component<Props, any> {
//     constructor(props: Props) {
//         super(props);
//         this.state = { UserFirstName:'',

// 		               PaymPer: PaymentPeriod.Once, 
//                        WhenPaym: Period.Monthly,
//                        TagOwnerID:this.props.UserID,
//                        NameEng:'',
//                        NameRus:'',
//                        Description:'',
//                        AccessType:2,
//                        ApplicationID:'1',
//                        StartDate:null,
//                        EndDate:null,
//                        Period:1,
//                        DayOfMonth:null,
//                        DayOfWeek:null,
//                        TotalAmount:0,
//                        TotalAmountCurrencyID:1,
//                        MinIntentionAmount:0,
//                        MinIntentionCurrencyID:1 
//                     };
//     }
//     componentWillMount() {
//         fetch(`/api/Tag/Get_ByID?TagID=${this.props.TagID}`, {credentials: 'include'})
//             .then(response=>response.json())
//             .then(json=>this.setState({ NameEng:json.NameEng }))
//             .catch((error)=>console.log('Fatch Error:' + error));

//         fetch(`/User/Get_ByID?UserID=${this.props.UserID}`, {credentials: 'include'})
//             .then(response=>response.json())
//             .then(json=>this.setState({  
//                 UserFirstName:json.UserFirstName   
//             }));
//     }

//     ShowState=(event:any)=>{
//       console.log(JSON.stringify(this.state));
//       event.preventDefault()     
//     }
//     handleChange=(evt:any)=>{
//         this.setState({
//             [evt.target.name]:evt.target.value,
//         });
//     }

//     buttonClick =(event:any)=>{
//         fetch("/api/Tag/Join",
//         {
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json; charset=utf-8'
//             },
//             method: "post",
//             body:      
//             JSON.stringify({  })
//                                 ,
//             credentials: 'include',        
//         })
//         .then(res=>res.json())
//         .then(res => console.log(res));
//     }
//     render() {       
//         const { PaymPer, WhenPaym } = this.state;
//         return  <form action="/Tag/Join" method="post" >
//                     <input type="hidden" value={this.props.UserID} name="UserID"></input>
//                     <input type="hidden" value={this.props.TagID} name="TagID"></input>
//                     <div className="row">
//                      <div className="col-6">
//                          <img src="@Model.AvatarBIG" className="ex-avatar ex-avatar_medium ex-avatar_light" />
//                      </div>
//                      <div className="col-6">
//                          <h5>Пользователь:</h5>                       
//                          <h4 className="mt-4"> {this.state.UserFirstName} {this.state.UserLastName}</h4>                         
//                          <div className="text-primary" data-target="#ex-route-1" data-load="">
//                              смотреть профиль
//                          </div>
//                      </div>
//                     </div>
                  
//                     <div className="row mb-4">
//                         <div className="col-md-5">
//                             <h3>Приглашает Вас присоединится к Тэгу:</h3>
//                         </div>
//                         <div className="col-md-7">
//                             <label>{this.state.TagNameRus}</label>   
//                         </div>
//                     </div>
        
//                     <div className="row mb-4">
//                         <div className="col-md-5">
//                             <label>Периодичность:</label>
//                         </div>
//                         <div className="col-md-7">
// 		                    <label className="custom-control custom-radio" >
//         	   	            <input type="radio" name="Period" className="custom-control-input"  value="2" defaultChecked onChange={e => this.setState({ PaymPer: parseInt(e.target.value), Period:2 })}/>
// 		                    <span className="custom-control-indicator"></span>
// 		                    <span className="custom-control-description">Разовый</span>
// 		                 </label>
                         
// 		                 <label className="custom-control custom-radio">
// 		                    <input type="radio" name="Period" className="custom-control-input"  value="3" onChange={e => this.setState({ PaymPer: parseInt(e.target.value), Period:3 })} />
// 			                <span className="custom-control-indicator"></span>
// 			                <span className="custom-control-description">Регулярный</span>
// 			            </label>
// 		                </div>
//                     </div>

//                     {PaymPer === PaymentPeriod.Once && (
//                         <div className="row mb-4">
//                             <div className="col-md-5"></div>               
//                             <div className="col-md-3">
//                             <label>Конечная дата:</label>
//                         </div>
//                             <div className="col-md-4">
                            
//                             </div>
//                         </div>                
//                     )}
                    
//                     {PaymPer === PaymentPeriod.Regular && (
//                         <div className="row mb-4">
//                             <div className="col-md-5"></div>               
//                             <div className="col-md-3">
//                                 <label>Период:</label>
//                             </div>
//                             <div className="col-md-4">
//                                 <select name="Period" className="form-control" onChange={e => this.setState({ WhenPaym: parseInt(e.target.value),Period:e.target.value})}>
//                                     <option value="4">Раз в месяц</option>
//                                     <option value="3">Раз в неделю</option>  
//                                 </select>                        
//                             </div>
//                         </div>                
//                     )} 

//                     { WhenPaym === Period.Monthly && PaymPer === PaymentPeriod.Regular && (
//                         <div className="row mb-4">
//                             <div className="col-md-5"></div>               
//                         <div className="col-md-3">
//                             <label>Число месяца:</label>
//                         </div>
//                         <div className="col-md-4">
//                             <input type="number" className="form-control" name="DayOfMonth" min='1' max='30' step='1' defaultValue='1'  onChange={this.handleChange}/>                  
//                         </div>
//                         </div>                       
//                     )}  

//                     { WhenPaym === Period.Weekly && PaymPer === PaymentPeriod.Regular && (
//                         <div className="row mb-4">
//                         <div className="col-md-5"></div>               
//                         <div className="col-md-3">
//                             <label>День недели:</label>
//                         </div>
//                         <div className="col-md-4">
//                         <select name="DayOfWeek" className="form-control" onChange={this.handleChange}>
//                             <option value="1">Понедельник</option>
//                             <option value="2">Вторник</option>
//                             <option value="3">Среда</option>
//                             <option value="4">Четверг</option>
//                             <option value="5">Пятница</option>
//                             <option value="6">Суббота</option>
//                             <option value="7">Воскресенье</option>
//                         </select>                      
//                         </div>
//                         </div>                       
//                     )}  

//                     <div className="row mb-4">
//                         <div className="col-md-5">
//                             <label>Приложение по умолчанию:</label>
//                         </div>
//                         <div className="col-md-7">
//                         <select name="ApplicationID" value={this.state.ApplicationID} className="form-control" onChange={this.handleChange}>
//                             <option value="1">H2O - Безвозмездная помощь</option>
//                             <option value="2">Касса взаимопомощи</option>
//                             <option value="3">Социальное страхование</option>
//                             <option value="4">Своя инициатива</option>                            
//                         </select>
//                         </div>
//                     </div>  

//                     <div className="row mb-4">
//                         <div className="col-md-5 d-flex align-items-center">                
//                             <label>Общая сумма:</label>
//                         </div>                        
//                         <div className="col-md-4">
//                             <input type="number" className="form-control" name="TotalAmount" min='0.00' step='0.01' pattern="\d+(\,\d{2})?"  defaultValue='0,00'  onChange={this.handleChange}/>
//                         </div>
//                         <div className="col-md-3" >
//                         <select className="form-control" name="TotalAmountCurrencyID" > 
//                             <option value={Currency.USD}>Доллары</option>
//                             <option value={Currency.UAH}>Гривны</option>
//                             <option value={Currency.RUB}>Рубли</option>
//                             <option value={Currency.EUR}>Евро</option>
//                         </select>
//                        </div>  
//                     </div>    

//                     <div className="row mb-4">
//                         <div className="col-md-5 d-flex align-items-center">                
//                             <label>Минимальное намерение:</label>
//                         </div>                        
//                         <div className="col-md-4">
//                             <input type="number" className="form-control" name="IntentionAmount" min='0.00' step='0.01'  pattern="\d+(\,\d{2})?" defaultValue='0,00'  onChange={this.handleChange} />
//                         </div>
//                         <div className="col-md-3" >
//                         <select className="form-control" name="IntentionCurrencyID">
//                             <option value={Currency.USD}>Доллары</option>
//                             <option value={Currency.UAH}>Гривны</option>
//                             <option value={Currency.RUB}>Рубли</option>
//                             <option value={Currency.EUR}>Евро</option>
//                         </select>
//                        </div> 
//                     </div>                                      

//                     <div className="row mb-4">
//                         <div className="col-md-5">
//                             <label>Описание:</label>
//                         </div>
//                         <div className="col-md-7">
//                             <textarea className="form-control" name="Description" defaultValue=""  onChange={this.handleChange}></textarea>
//                         </div>
//                     </div>

//                     <div className="row mb-4">
//                         <div className="col-md-5">
//                         </div>
//                         <div className="col-md-4">
//                             <button className="btn btn-outline-primary w-100" onClick={this.buttonClick}>Создать тег</button><br/>
//                         </div>
//                         <div className="col-md-3">                                       
//                         <a href="/Desktop"><div data-load="/ru/Account/View_UserProfile" data-target="#ex-route-1" className="btn btn-outline-secondary w-100">Отмена</div></a>
//                         </div>
//                     </div>                    
//                 </form>
                      
//     };
// }
