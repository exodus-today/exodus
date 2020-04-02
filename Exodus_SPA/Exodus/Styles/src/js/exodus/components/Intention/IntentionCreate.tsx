// import * as React from 'react';
// import { Currency, Period, Term } from '../../enums';
// import { UserStore } from '../../stores/UserStore';

// interface Props {
//     user: UserStore
// }

// interface State {
//     term: Term
// }

// export class IntentionCreate extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = { term: Term.Indefinitely };
//     }
//     render() {
//         const { term } = this.state;

//         return (
//             <form action="">
//                 <div className="row mb-4">
//                     <div className="col-md-3 d-flex align-items-center">
//                         <label>Сумма</label>
//                     </div>
//                     <div className="col-md-6">
//                         <input type="number" className="form-control" />
//                     </div>
//                     <div className="col-md-3">
//                         <select className="form-control">
//                             <option value={Currency.USD}>$</option>
//                             <option value={Currency.UAH}>грн.</option>
//                             <option value={Currency.RUB}>руб.</option>
//                             <option value={Currency.EUR}>€</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="row mb-4">
//                     <div className="col-md-3 d-flex align-items-center">
//                         <label>Период</label>
//                     </div>
//                     <div className="col-md-9">
//                         <select className="form-control">
//                             <option value={Period.Monthly}>Каждый месяц</option>
//                             <option value={Period.Weekly}>Раз в неделю</option>
//                         </select>
//                     </div>
//                 </div>
                
//                 <div className="row mb-4">
//                     <div className="col-md-3 d-flex align-items-center">
//                         <label>Срок</label>
//                     </div>
//                     <div className="col-md-9">
//                         <select className="form-control" onChange={e => this.setState({ term: parseInt(e.target.value) })}>
//                             <option value={Term.Indefinitely}>Бессрочно</option>
//                             <option value={Term.UserDefined}>Задать</option>
//                         </select>
//                     </div>
//                 </div>
//                 {term === Term.UserDefined && (
//                 <div className="row mb-4">
//                     <div className="col-md-3 d-flex align-items-center">
//                         <label>Месяцев</label>
//                     </div>
//                     <div className="col-md-9">
//                         <input type="number" className="form-control" min="1" step="1" />
//                     </div>
//                 </div>
//                 )}
//                 <button className="btn btn-outline-warning w-100 mb-4">Взять намерение</button>
//             </form>
//         );
//     }
// }
