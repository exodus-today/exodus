import * as React from 'react';
import { Intention } from '../../classes/Intention';
import { getLangValue, getApiKey, getUserID,getLang } from '../../global.js';
import * as moment from 'moment';
import { FilterIntentions } from '../../enums';

interface Props {
    UserID :number
}

interface State {
    Intentions: Array<Intention>;
    page:number;
    x1:object;
    x2:object;
    x3:object;
    x4:object;
    UploadComplite:boolean
}

export class FriendIntentions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { page:1, 
                        x1:{background:"#459edb",color:"#fff"}, x2:{}, x3:{}, x4:{},
                        UploadComplite:false,
                        Intentions:[],  };
    }

    componentWillMount() {    
        this.setState({UploadComplite:false});    
        fetch('/api/Intention/Get_ByHolderID?api_key='+getApiKey()+'&UserID='+getUserID(), {credentials: 'include'})
            .then(response => response.json())
            .then( 
                json=>{
                    this.setState({ Intentions: json.Data.map((item: any)=> { return new Intention(item) })}) 
                    this.setState({UploadComplite:true})}                
                )
            
    }        

    buttonClickBlijaishie =()=> {
        this.setState({page:FilterIntentions.Blijaishie, x1:{background:"#459edb",color:"#fff"},x2:{},x3:{},x4:{}})
    }    
    buttonClickNastupivshie =()=> {
        this.setState({page:FilterIntentions.Nastupivshie, x1:{},x2:{background:"#459edb",color:"#fff"},x3:{},x4:{}})
    }    
    buttonClickAll =()=> {
        this.setState({page:FilterIntentions.Vse, x1:{},x2:{},x3:{background:"#459edb",color:"#fff"},x4:{}})
    }      
    buttonClickArhiv =()=> {
        this.setState({
            page:FilterIntentions.Arhiv, 
            x1:{}, x2:{}, x3:{}, x4:{background:"#459edb",color:"#fff"}
        })
    }         
                                   

    render() {
        //if (this.state === null) return <div><img src="styles/dist/images/loading.svg" alt="" /></div>
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
                            getLangValue('Period.Monthly'),  //4
                            getLangValue('Period.Quarterly'),
                            getLangValue('Period.Yearly')];

        const currency = [  getLangValue('Undefined'),
                            getLangValue('Currency.Symbol.USD'),
                            getLangValue('Currency.Symbol.GRN'),
                            getLangValue('Currency.Symbol.RUB'),
                            getLangValue('Currency.Symbol.EUR')];
        const head = <tr><th scope="col">{getLangValue('Tag')}:<br/><p style={{fontSize:12, fontWeight:'normal'}}>{getLangValue('Application')}</p></th>
                            <th scope="col">{getLangValue('Sender')}<br/><p style={{fontSize:12, fontWeight:'normal'}}>{getLangValue('TypeOfIntention')}</p></th>
                            <th scope="col">{getLangValue('Periodicity')}<br/>{getLangValue('DatePeriod')}</th>
                            <th scope="col">{getLangValue('Amount')}</th>
                            {page!=FilterIntentions.Arhiv && (<th scope="col">{getLangValue('Action')}</th>)}
                        </tr>;
        return (
<div id="ex-route-2"> 
           <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space" >
           <div className="ex-panel">
             <div className="ex-panel__header" style={{lineHeight:"50px"}}>
               <i className="ex-panel__icon">#</i>
               {getLangValue('FriendIntentions')} : {now}
            </div>
            <div className="ex-panel__content_big">
                <button onClick={this.buttonClickBlijaishie} 
                    className="btn btn-outline-primary w-80" 
                    style={this.state.x1}>{getLangValue('Upcoming')}
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

        {page === FilterIntentions.Blijaishie && (
            <div>
                <table>
                    <tbody>
                        {head}
                    
                    { !this.state.UploadComplite && 
                        (<tr>
                            <td colSpan={5}>
                            <div style={{position:"relative",marginLeft:'50%',marginTop:'2%',marginBottom:'2%'}}> 
                                <img src="styles/dist/images/loading.svg" alt="" />  
                                </div>
                            </td>
                        </tr>)}                    
                    </tbody>
                    <tbody>          
                        {this.state.Intentions.map((number,index) =>
                        (number.IntentionIsActive && (new Date(number.IntentionEndDate) > segodnya) && (
                        <tr key={index}>
                            <td scope="row" style={{maxWidth:'200px'}}>
                                <strong>{getLang()=='en'?number.IntentionTag.NameEng:number.IntentionTag.NameRus}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.IntentionApplication.ApplicationNameEng:number.IntentionApplication.ApplicationNameRus}</span>
                            </td>
                            <td>
                                <strong>{number.IntentionIssuer.UserFirstName} {number.IntentionIssuer.UserLastName}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span></td>
                            <td>
                                <span style={{fontSize:12}}>
                                    {period[number.Period]}
                                </span><br/>
                                <strong>{(number.Period==2) && (moment((number.IntentionEndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY")) }</strong>
                                {(number.Period==3) && ( dayOfWeek[number.IntentionDayOfWeek] )}
                                {(number.Period==4) && (number.IntentionDayOfMonth + ' '+getLangValue('DayOfMonth'))}
                            </td>
                            <td style={{width:'100px', background:'#e5fcb9'}}>
                                {number.IntentionAmount}&nbsp;{currency[number.CurrencyID]}
                            </td>
                            <td style={{width:'100px', padding:5,margin:0}}>
                                    <div className="dropdown"> 
                                        <button className="dropdown" style={{width:"150px"}}>{getLangValue('Choose')}</button>
                                        <div className="dropdown-content">
                                            <button className="dropdown-content-button" style={{width:"150px",height:'75px'}}>{getLangValue('RequestToConvertToCommitment')}</button>
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
                                <span style={{fontSize:12}}>{getLang()=='en'?number.IntentionApplication.ApplicationNameEng:number.IntentionApplication.ApplicationNameRus}</span>
                            </td>
                            <td>
                                <strong>{number.IntentionIssuer.UserFirstName} {number.IntentionIssuer.UserLastName}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span></td>  
                            <td>
                                <span style={{fontSize:12}}>{period[number.Period]}</span><br/>
                                <strong>{(number.Period==2) && (moment((number.IntentionEndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY")) }</strong>
                                {(number.Period==3) && ( dayOfWeek[number.IntentionDayOfWeek] )}
                                {(number.Period==4) && (number.IntentionDayOfMonth + ' '+getLangValue('DayOfMonth'))}                           
                            </td>
                            <td style={{width:'100px', background:'#e5fcb9'}}>
                                {number.IntentionAmount}&nbsp;{currency[number.CurrencyID]}
                            </td>
                            <td style={{width:'100px', padding:5,margin:0}}>
                                <div className="dropdown"> 
                                    {/* <button className="dropdown" style={{width:"150px"}}>{getLangValue('Choose')}</button>
                                    <div className="dropdown-content">
                                        {/* <button className="dropdown-content-button" onClick={_=>null}>Действие 1</button>
                                        <button className="dropdown-content-button" onClick={_=>null}>Действие 2</button> }
                                    </div> */}
                                    <div className="dropdown"> 
                                        <button className="dropdown" style={{width:"150px"}}>{getLangValue('Choose')}</button>
                                        <div className="dropdown-content">
                                            <button className="dropdown-content-button" style={{width:"150px",height:'75px'}}>{getLangValue('RequestToConvertToCommitment')}</button>
                                        </div> 
                                    </div>                                       
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
                        {this.state.Intentions.map((number,index) =>( number.IntentionIsActive && (
                        <tr key={index}>
                            <td scope="row" style={{maxWidth:'200px'}}>
                                <strong>{getLang()=='en'?number.IntentionTag.NameEng:number.IntentionTag.NameRus}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.IntentionApplication.ApplicationNameEng:number.IntentionApplication.ApplicationNameRus}</span>
                            </td>
                            <td><strong>{number.IntentionIssuer.UserFirstName} {number.IntentionIssuer.UserLastName}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span></td>  
                            <td>
                                <span style={{fontSize:12}}>{period[number.Period]}</span><br/>
                                <strong>{(number.Period==2) && (moment((number.IntentionEndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY"))}</strong>
                                {(number.Period==3) && ( dayOfWeek[number.IntentionDayOfWeek] )}
                                {(number.Period==4) && (number.IntentionDayOfMonth + ' '+getLangValue('DayOfMonth'))}                           
                            </td>
                            <td style={{width:'100px', background:'#e5fcb9'}}>
                                {number.IntentionAmount}&nbsp;{currency[number.CurrencyID]}
                            </td>
                            <td style={{width:'100px', padding:5,margin:0}}>
                            <div className="dropdown"> 
                                        <button className="dropdown" style={{width:"150px"}}>{getLangValue('Choose')}</button>
                                        <div className="dropdown-content">
                                            <button className="dropdown-content-button" style={{width:"150px",height:'75px'}}>{getLangValue("RequestToConvertToCommitment")}</button>
                                        </div> 
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
                    <tbody>{head}</tbody>
                    <tbody>
                        {this.state.Intentions.map((number,index) =>(!number.IntentionIsActive && (
                        <tr key={index}>
                            <td scope="row" style={{maxWidth:'200px'}}>
                                <strong>{getLang()=='en'?number.IntentionTag.NameEng:number.IntentionTag.NameRus}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.IntentionApplication.ApplicationNameEng:number.IntentionApplication.ApplicationNameRus}</span>
                            </td>
                            <td><strong>{number.IntentionIssuer.UserFirstName} {number.IntentionIssuer.UserLastName}</strong><br/>
                                <span style={{fontSize:12}}>{getLang()=='en'?number.ObligationKind.ObligationNameEng:number.ObligationKind.ObligationNameRus}</span><br/>
                            </td>
                            <td>
                            <span style={{fontSize:12}}>{period[number.Period]}</span><br/>
                            <strong>{(number.Period==2) && (moment((number.IntentionEndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY"))}</strong>
                                {(number.Period==3) && ( dayOfWeek[number.IntentionDayOfWeek] )}
                                {(number.Period==4) && (number.IntentionDayOfMonth + ' '+getLangValue('DayOfMonth'))}
                            </td>                            
                            <td style={{width:'100px', background:'#e5fcb9'}}>
                                {number.IntentionAmount}&nbsp;{currency[number.CurrencyID]}
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
        </div>
        );
    }
} 