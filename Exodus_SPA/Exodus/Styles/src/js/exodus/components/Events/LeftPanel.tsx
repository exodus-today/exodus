// import * as React from 'react';
// import { EventsRow } from './EventsRow';

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

//                     <div style={{width:this.state.width-16, overflow:'hidden'}}>
//                         <div style={{height:'100vh' , width:this.state.width, overflowY:'scroll'}}> 
//                             <EventsRow EventsType={1} Active={'ex-list__item ex-list__item_white'} />
//                             <EventsRow EventsType={1} Active={'ex-list__item ex-list__item_active'} />
//                         </div>
//                     </div>                
//                 </div>
//             </div>)
//             }
//         }
