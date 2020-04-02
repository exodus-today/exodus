import * as React from 'react';
import { getLangValue, getLang, getApiKey, getUserID } from '../../global.js';
import { Intention } from '../../classes/Intention';
import * as moment from 'moment';
import { notify } from '../Shared/Notifications';
import { FilterIntentions } from '../../enums';
import { load } from '../../load.js';

interface Props {
    UserID :number;
    lang:string;
}

interface State {
    Intentions: Array<Intention>;
    page:number;
    x1:object;
    x2:object;
    x3:object;
    x4:object;
    UploadComplite:boolean;
}

export class MyIntentions extends React.Component<Props, State> {
    constructor(props: Props) {
         super(props);
         this.state = { page:1, 
                        x1:{background:"#459edb",color:"#fff"},x2:{},x3:{},x4:{},
                        Intentions:[], 
                        UploadComplite:false                                                
                    };
     }     

    load=()=>{
        this.setState({UploadComplite:false});
        fetch('/api/Intention/Get_ByIssuerID?api_key='+getApiKey()+'&UserID='+getUserID(), {credentials: 'include'})
        .then(response => response.json())
        .then( json=>{
            this.setState({ Intentions: json.Data.map((item: any)=> { return new Intention(item)})  })
            this.setState({UploadComplite:true})})       

    } 
    
    componentWillMount() {
        this.load();
    }    

    buttonClickBlijaishie =()=> {
        this.setState({
            page:FilterIntentions.Blijaishie, 
            x1:{background:"#459edb",color:"#fff"}, x2:{}, x3:{}, x4:{}})
        }    
    buttonClickNastupivshie =()=> {
        this.setState({
            page:FilterIntentions.Nastupivshie, 
            x1:{}, x2:{background:"#459edb",color:"#fff"}, x3:{}, x4:{}})
        }    
    buttonClickAll =()=> {
        this.setState({
            page:FilterIntentions.Vse, 
            x1:{}, x2:{}, x3:{background:"#459edb",color:"#fff"}, x4:{}
        })
    }
    buttonClickArhiv =()=> {
        this.setState({
            page:FilterIntentions.Arhiv, 
            x1:{}, x2:{}, x3:{}, x4:{background:"#459edb",color:"#fff"}
        })
    }       
    
    DeleteIntention = (IntentionID:number) => {        
        fetch("/api/Intention/Delete?IntentionID="+IntentionID,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: "POST",
            body:'',
            credentials: 'include'
        })
        .then(res => {
            if (res.ok) {
                notify.success(getLangValue("Notification.SuccessfullyDeleted"));

                this.load();
                //this.state.Intentions[0]
                // let dic = { '':'' }
                // fetch('/api/Events/Add?type=XXX',
                // {
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json; charset=utf-8'
                //     },           
                //     body:                 
                //     JSON.stringify( dic ),
                //     method:'post', 
                //     credentials: 'include'}
                // )                


            } else {
                notify.error(getLangValue("Error"));
            }
        });        
    }

    IntentionToObligation = (IntentionID:number) => {        
        fetch(`api/Intention/ToObligation?IntentionID=`+IntentionID, {credentials: 'include'})        
        .then(res => {
            if (res.ok) {                
                notify.success(getLangValue("Notification.SuccessfullyСonverted"));
                this.load();
            } else {
                notify.error(getLangValue("Error"));
            }
        });        
    }  
    
    handleClick = (event:any) => {
        alert(event.id);
    }
     
    render() {
        var now = moment().format("DD.MM.YYYY");
        var segodnya = new Date(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0])
        const { page } = this.state;
        const dayOfWeek = [ getLangValue('Undefined'), 
                            getLangValue('Mondey'),
                            getLangValue('Tuesday'),
                            getLangValue('Wednesday'),
                            getLangValue('Thursday'),
                            getLangValue('Friday'),
                            getLangValue('Saturday'),
                            getLangValue('Sunday')];

        const period =  [   getLangValue('Undefined'),     //0 
                            getLangValue('Undefined'),     //1
                            getLangValue('Period.Once'),   //2                                                  
                            getLangValue('Period.Weekly'), //3                            
                            getLangValue('Period.Monthly'), //4
                            getLangValue('Period.Weekly'),
                            getLangValue('Period.Quarterly'),
                            getLangValue('Period.Yearly')];

        const currency = [  getLangValue('Undefined'),
                            getLangValue('Currency.Symbol.USD'),
                            getLangValue('Currency.Symbol.GRN'),
                            getLangValue('Currency.Symbol.RUB'),
                            getLangValue('Currency.Symbol.EUR')];

        const head =    <tr>
                              <th scope="col">{getLangValue('Tag')}:<br/><p style={{fontSize:12, fontWeight:'normal'}}>{getLangValue('Application')}</p></th>
                              <th scope="col">{getLangValue('Recipient')}<br/><p style={{fontSize:12, fontWeight:'normal'}}>{getLangValue('TypeOfIntention')}</p></th>                    
                              <th scope="col">{getLangValue('Periodicity')}<br/>{getLangValue('DatePeriod')}</th>                              
                              <th scope="col" style={{minWidth:'60px'}}>{getLangValue('Amount')}</th>
                              { page != FilterIntentions.Arhiv && (<th scope="col">{getLangValue('Action')}</th>)}
                            </tr>;
        return (
        <div id="ex-route-2"> 
            <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space" >
                <div className="ex-panel">
                    <div className="ex-panel__header" style={{lineHeight:"50px"}}>
                        <i className="ex-panel__icon">#</i>
                        {getLangValue('MyIntentions')} : {now}
                    </div>
                    <div className="ex-panel__content_big">
                        <button onClick={this.buttonClickBlijaishie} 
                            className="btn btn-outline-primary w-80" 
                            style={this.state.x1}> {getLangValue('Upcoming')} 
                        </button>&nbsp;

                        <button onClick={this.buttonClickNastupivshie}                 
                            className="btn btn-outline-primary w-80"
                            style={this.state.x2} >{getLangValue('Current')}
                        </button>&nbsp;

                        <button onClick={this.buttonClickAll} 
                            className="btn btn-outline-primary w-80"
                            style={this.state.x3} >{getLangValue('All')} 
                        </button>&nbsp;

                        <button onClick={this.buttonClickArhiv} 
                            className="btn btn-outline-primary w-80"
                            style={this.state.x4} >{getLangValue('Archive')} 
                        </button>                        


        {   // Мои Ближайшие намерения
            page === FilterIntentions.Blijaishie && (
            <div>              
            <table className='compact-table'>
                <tbody>
                    {head} 
                </tbody>
                <tbody> 
                {!this.state.UploadComplite && 
                    (<tr>
                        <td colSpan={6}>
                        <div style={{position:"relative",marginLeft:'50%',marginTop:'2%',marginBottom:'2%'}}> 
                            <img src="styles/dist/images/loading.svg" alt="" />
                        </div>
                        </td>
                    </tr>)
                }

                {this.state.Intentions.map((number,index) =>
                    (number.IntentionIsActive && (new Date(number.IntentionEndDate) > segodnya) && (
                        <tr key={index}>
                            <td scope="row" style={{maxWidth:'200px'}}><strong>{getLang()=='en'?number.IntentionTag.NameEng:number.IntentionTag.NameRus}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?
                                number.IntentionApplication.ApplicationNameEng:
                                number.IntentionApplication.ApplicationNameRus}</span>
                            </td>
                            <td><strong>{number.IntentionHolder.UserFirstName} {number.IntentionHolder.UserLastName}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span>
                            </td>
                            <td>                                
                                <span style={{fontSize:12}}>{period[number.Period]}</span><br/>
                                <strong>{(number.Period==2) &&  (moment((number.IntentionEndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY")) }</strong>
                                {(number.Period==3) && ( dayOfWeek[number.IntentionDayOfWeek] )} 
                                {(number.Period==4) && (number.IntentionDayOfMonth + ' '+getLangValue('DayOfMonth'))}
                            </td>

                            <td style={{width:'100px', background:'#e5fcb9'}} >
                                <b>{number.IntentionAmount}</b>&nbsp;{currency[number.CurrencyID]}
                            </td>                             
                            
                            <td style={{width:'100px', padding:5,margin:0}}> 
                                <div className="dropdown"> 
                                    <button className="dropdown" style={{width:"150px"}}>{getLangValue('Choose')}</button>
                                    <div className="dropdown-content">
                                        { (number.Period==1 || number.Period==2) &&
                                            (<button className="dropdown-content-button" 
                                                    onClick={()=>this.IntentionToObligation(number.IntentionID)}>
                                                    {getLangValue('ConvertToObligation')}
                                            </button>)
                                        }
                                        <button className="dropdown-content-button" onClick={()=>this.DeleteIntention(number.IntentionID)}>
                                        {getLangValue('CencelIntention')}</button>
                                    </div>
                                </div>                                      
                            </td>
                        </tr>
                    )))}
                </tbody>                    
            </table>                  
            </div>                     
        )}

        {page === FilterIntentions.Nastupivshie && (
            <div>
            <table>
                <tbody>
                    {head}
                </tbody>
                <tbody>
                    {this.state.Intentions.map((number,index) =>
                    (number.IntentionIsActive && (new Date(number.IntentionEndDate) <= segodnya) && ( 
                    <tr key={index}>
                        <td scope="row" style={{maxWidth:'200px'}}>
                            <strong>{getLang()=='en'?number.IntentionTag.NameEng:number.IntentionTag.NameRus}</strong><br/>
                            <span style={{fontSize:12}}>{getLang()=='en'?
                            number.IntentionApplication.ApplicationNameEng:
                            number.IntentionApplication.ApplicationNameRus}</span>
                        </td>
                        <td>
                            <strong>{number.IntentionHolder.UserFirstName} {number.IntentionHolder.UserLastName}</strong><br/>
                            <span style={{fontSize:12}}>{getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span></td>  
                        <td>
                            <span style={{fontSize:12}}>{period[number.Period]}</span><br/>
                            <strong>{(number.Period==2) &&  (moment((number.IntentionEndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY")) }</strong>
                            {(number.Period==3) && ( dayOfWeek[number.IntentionDayOfWeek] )}
                            {(number.Period==4) && (number.IntentionDayOfMonth + ' '+getLangValue('DayOfMonth'))}                        
                        </td>
                        <td style={{width:'100px', background:'#e5fcb9'}}>
                            <b>{number.IntentionAmount}</b>&nbsp;{currency[number.CurrencyID]}
                        </td>

                        <td style={{width:'100px', padding:5,margin:0}}>
                                    <div className="dropdown"> 
                                        <button className="dropdown" style={{width:"150px"}}>{getLangValue('Choose')}</button>
                                        <div className="dropdown-content">
                                        <button className="dropdown-content-button" onClick={()=>this.IntentionToObligation(number.IntentionID)}>{getLangValue('ConvertToObligation')}</button>
                                            <button className="dropdown-content-button" onClick={()=>this.DeleteIntention(number.IntentionID)}>{getLangValue('CencelIntention')}</button>                                    </div>
                                    </div>   
                        </td>
                    </tr>
                    )))}
                </tbody>
            </table>                  
            </div>
        )}  

        {page === FilterIntentions.Vse && (
            <div>              
                <table>
                    <tbody>
                        {head}            
                    </tbody>
                    <tbody>   
                        {this.state.Intentions.map((number,index) =>(number.IntentionIsActive && (                       
                        <tr key={index}>
                        <td scope="row" style={{maxWidth:'200px'}}>
                            <strong>{getLang()=='en'?number.IntentionTag.NameEng:number.IntentionTag.NameRus}</strong><br/>
                            <span style={{fontSize:12}}>{getLang()=='en'?number.IntentionApplication.ApplicationNameEng:number.IntentionApplication.ApplicationNameRus}</span>
                        </td>
                        <td>
                            <strong>{number.IntentionHolder.UserFirstName} {number.IntentionHolder.UserLastName}</strong><br/>
                            <span style={{fontSize:12}}>{getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span></td>
                        <td>
                            <span style={{fontSize:12}}>{period[number.Period]}</span><br/>
                            <strong>{(number.Period==2) &&  (moment((number.IntentionEndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY")) }</strong>
                            {(number.Period==3) && ( dayOfWeek[number.IntentionDayOfWeek] )}
                            {(number.Period==4) && (number.IntentionDayOfMonth + ' '+getLangValue('DayOfMonth'))}                            
                        </td>
                        <td style={{width:'100px', background:'#e5fcb9'}}>
                            <b>{number.IntentionAmount}</b>&nbsp;{currency[number.CurrencyID]}
                        </td>
                        {/* <td style={{width:'100px', padding:0,margin:0}}>{!number.IntentionIsActive?(
                                // Действия для активного намерения
                                <div className="dropdown">
                                    <button className="dropdown" style={{width:"150px"}}>Действия</button>
                                    <div className="dropdown-content">                       
                                        <button className="dropdown-content-button" onClick={()=>this.IntentionToObligation(number.IntentionID)}>Преобразовать в обязательство</button>
                                        <button className="dropdown-content-button" onClick={()=>alert('Ожидаю функцию IntentionCancel?IntentionID='+number.IntentionID)}>Отменить намерение</button>                                        
                                    </div>
                                </div> )
                                :( //Для архива
                                <div className="dropdown" style={{background:'#ccc'}}> 
                                    <button className="dropdown" style={{background:'#ccc', width:'150px'}}>{getLangValue('Select')}</button>
                                    <div className="dropdown-content">
                                        <button className="dropdown-content-button" onClick={()=>this.IntentionToObligation(number.IntentionID)} style={{ width:'160px' }} >Действия архива</button>                                    
                                    </div>
                                </div>)
                        }</td> */}
                        <td style={{width:'100px', padding:5,margin:0}}>
                                <div className="dropdown"> 
                                    <button className="dropdown" style={{width:"150px"}}>{getLangValue('Choose')}</button>
                                    <div className="dropdown-content">
                                        <button className="dropdown-content-button" onClick={()=>this.IntentionToObligation(number.IntentionID)}>{getLangValue('ConvertToObligation')}</button>
                                        <button className="dropdown-content-button" onClick={()=>this.DeleteIntention(number.IntentionID)}>{getLangValue('CencelIntention')}</button>                                    </div>
                                    </div> 
                        </td>
                    </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        )}
        {page === FilterIntentions.Arhiv && (
            <div>              
                <table>
                    <tbody>
                        {head}
                    </tbody>            
                    <tbody>   
                        {this.state.Intentions.map((number,index) =>(!number.IntentionIsActive && (
                        <tr key={index}>
                            <td scope="row" style={{maxWidth:'200px'}}>
                                <strong>{getLang()=='en'?number.IntentionTag.NameEng:number.IntentionTag.NameRus}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.IntentionApplication.ApplicationNameEng:number.IntentionApplication.ApplicationNameRus}</span>
                            </td>
                            <td><strong>{number.IntentionHolder.UserFirstName} {number.IntentionHolder.UserLastName}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span></td>  
                            <td>
                                <span style={{fontSize:12}}>{period[number.Period]}</span><br/>
                                <strong>{(number.Period==2) &&  (moment((number.IntentionEndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY")) }</strong>
                                {(number.Period==3) && ( dayOfWeek[number.IntentionDayOfWeek] )}
                                {(number.Period==4) && (number.IntentionDayOfMonth + ' '+getLangValue('DayOfMonth'))}
                            </td>    
                            <td style={{width:'100px', background:'#e5fcb9'}}>
                                <b>{number.IntentionAmount}</b>&nbsp;{currency[number.CurrencyID]}
                            </td>
                        </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        )}


                    </div>            
                </div>
            </div>
        </div>);
    }
} 
