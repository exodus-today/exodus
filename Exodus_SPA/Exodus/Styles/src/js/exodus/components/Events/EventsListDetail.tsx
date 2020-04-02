import * as React from 'react';
import { EventsListData } from '../../classes/EventsListData';
import { LightJson } from '../../classes/LightJson';
import { getLangValue, getUserID } from '../../global';
import { notify } from '../Shared/Notifications';
import * as moment from 'moment';

function GetTime(Data:string){
    return(<p>    
        {Data.substr(8,2)+'-'+Data.substr(5,2)+'-'+Data.substr(0,4)}<br/>
        {Data.substr(11,2)+':'+Data.substr(14,2)+':'+Data.substr(17,2)}
    </p>)
}
                           

const Application = [ '','AppH2O','','','AppOwnIniciative' ];
//const TransferType = [ '', getLangValue('Cash'), getLangValue('PaymentAccount') ];
const Period = ['','','',getLangValue('Period.Weekly'),getLangValue('Period.Monthly')]


function isEmpty(obj:object) {
    for (var key in obj) {
      return false;
    }
    return true;
  }

interface Props {
    ActiveEvent:EventsListData|null
    closeButton:boolean
    leftDetails:string
    close:Function
    reload:Function
    event: LightJson|null  
    hidden: boolean  
    EVENTLISTSUM:number
    showMarkBtn: boolean|null
}

interface State {
    ActiveI:string
    closeButton:boolean
}


const Row = ( text2:string ) => 
( <div>{text2!==null?text2:''}</div> )

export class EventsListDetail extends React.Component<Props, State> {
    constructor(props: Props) {        
        super(props);
        this.state = { ActiveI:'ex-list__item ex-list__item_active', closeButton:false };
        this.handlerSetActive=this.handlerSetActive.bind(this); 
        this.ConfirmTransaction=this.ConfirmTransaction.bind(this); 
        this.markETU=this.markETU.bind(this);         
    }

    ConfirmTransaction=()=>{
        if ((this.props.event!==null) && (this.props.event.TransactionID!==null))
        fetch('/api/Transaction/ConfirmByReciver?TransactionID='+this.props.event.TransactionID+'&ReciverID='+getUserID()+'&IsConfirmedByReceiver=true', 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },           
            body:              
            //{"TransactionID": this.props.event.TransactionID, "ReciverID": getUserID(), "IsConfirmedByReceiver": true}
            
            JSON.stringify({ }),
            method:'POST', 
            credentials: 'include'}
        )   
        .then(res=>{ if(res.ok) notify.success(getLangValue("ConfirmationSent")) });
    }
    
    markETU=(reload:boolean)=>{  
        if (this.props.ActiveEvent!==null)
        fetch('/api/Events/MarkETU_Processed?EventID='+this.props.ActiveEvent.EventID+'&UserID='+getUserID(),
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body:                 
            JSON.stringify( { }),
            method:'post', 
            credentials: 'include'})
        .then(res=>
            {if (res.ok) 
                {          
                    if (reload)          
                    this.props.reload()                  
                }
                else
                notify.error(getLangValue("Error"));
            })                              
    }

    handlerSetActive = () => {
        this.setState ({ActiveI:'ex-list__item ex-list__item_active'})
    }   

    render () {      
        var segodnya = moment().add(7, 'days').format("DD.MM.YYYY");
        if (this.props.ActiveEvent!=null)
            if (isEmpty(this.props.ActiveEvent)!=true) ''
        const dayOfWeek = [ getLangValue('Undefined'), 
            getLangValue('Mondey'),
            getLangValue('Tuesday'),
            getLangValue('Wednesday'),
            getLangValue('Thursday'),
            getLangValue('Friday'),
            getLangValue('Saturday'),
            getLangValue('Sunday')];
        
        let showMarkBtn = this.props.showMarkBtn === true;

    return(
    <div className="ex-right-panel" >  
        <div className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
         <div>
                <div className="event-details-container" hidden={!this.props.hidden}>
                    <div className="event-details-row my-4">
                        <span className="event-details-item" >
                            <img src="styles/dist/images/loading.svg" style={{paddingTop:250}} />
                        </span>
                    </div>
                </div>         
            </div>
    </div>
        <div hidden={this.props.hidden}>

        { // Приглашение присоединится к тегу
            (this.props.event!==null) && (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==1) && ( 
            <div className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon my-4">                    
                            {/* <img src={"/Styles/dist/images/tags/"+this.props.ActiveEvent.ApplicationID+".svg"}/> */}
                            <img src="/Styles/dist/images/invite.png" />
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8 text-left">
                            <h5 className="text-primary mb-2">
                                {getLangValue('TagInvitation')}
                            </h5>
                            { // Дата получения сообщения
                                ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                GetTime(this.props.ActiveEvent.Added.toString()):''
                            } {/* Дата получения сообщения */}
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {/* Как должно быть */}
                <div className="event-details-container">
                    <div className="event-details-row my-2">
                        <span className="event-details-item ">
                            <img src={this.props.event.InviterUserAvatarBIG}
                                className="ex-transaction-page__person-avatar" 
                                style={{width:'30%'}}/> 
                        </span>            
                        <span className="event-details-item" >
                            <img src="/Styles/dist/images/invite.png" style={{width:'10%'}}/>
                        </span>       
                        <span className="event-details-item ">                    
                            <img src={"/Styles/dist/images/tags/"+
                                this.props.ActiveEvent.ApplicationID+".svg"} 
                                style={{width:'22%'}}/>
                        </span>
                    </div>
                </div> 
                {/* Профиль - Тег */}
                <div className="row my-2 text-center my-4">
                    <div className="col-7">
                        { (this.props.event!==null) &&
                        (<div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/PublicProfile/UserDetail?UserID="+this.props.ActiveEvent.InviterUserID+"&TagID=0"}>
                                {this.props.ActiveEvent.InviterUserFullName}
                        </div>)}
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3">
                    { (this.props.ActiveEvent!==null) &&
                        (<div className="text-primary main-menu-close-button" 
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/Application/"+Application[this.props.ActiveEvent.ApplicationID]+"?TagID="+this.props.ActiveEvent.TagID}>
                                {getLangValue('Tag')}
                        </div>                              
                        )}     
                    </div>               
                </div>         

                <div className="row my-2 text-center">
                    <div className="col-12">
                        <div className="ex-transaction-page__person-name">
                            {getLangValue('User')} &nbsp; 
                            {getLangValue('InvitesYouToJoinTag')}: <br/><h2>#{this.props.ActiveEvent.TagName}</h2>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    {// Минимальное намерение                       
                        (this.props.ActiveEvent.MinIntentionAmount)?
                        (getLangValue('MinimalIntention')+': '+
                        (parseFloat(this.props.ActiveEvent.MinIntentionAmount.toString()).toFixed(2))+' $')
                        :''}
                </div>
                <div className="text-center">
                    {   // Коли ежемесячно то показать день месяца
                        (this.props.ActiveEvent.Period=='Mountly')?
                        (getLangValue('Periodicity')+':'+getLangValue('Period.Monthly')+' '+this.props.ActiveEvent.DayOfMonth):''
                    }
                    {   // Коли еженедельно то показать день недели
                        (this.props.ActiveEvent.Period=='Weekly')?
                        (getLangValue('Periodicity')+':'+getLangValue('Period.Weekly')+' '+dayOfWeek[this.props.ActiveEvent.DayOfWeek]):''
                    }
                    {   // Коли одноразово
                        (this.props.ActiveEvent.Period=='Once')?
                        getLangValue('Periodicity')+':'+getLangValue('Period.Once'):''
                    }
                </div>
                <div className="text-center">
                    {// TotalAmount если своя инициатива                          
                        (this.props.ActiveEvent.TotalAmount && this.props.ActiveEvent.ApplicationID==4)?
                        (getLangValue('TotalAmount')+': '):''}
                    {// TotalAmount если своя инициатива                          
                        (this.props.ActiveEvent.TotalAmount && this.props.ActiveEvent.ApplicationID==4)?
                        (parseFloat(this.props.ActiveEvent.TotalAmount.toString()).toFixed(2))+' $'
                        :''}
                </div>
                <div className="text-center">
                    {// Дата окончания если своя инициатива                          
                        (this.props.ActiveEvent.EndDate && this.props.ActiveEvent.ApplicationID==4)?
                        (getLangValue('EndDate')+': '+this.props.ActiveEvent.EndDate.toString().substr(0,10))
                        :''}
                </div>                     

                {getLangValue('Description')}<br/>        
                <textarea   className="form-control mb-4" 
                            readOnly
                            defaultValue = { this.props.event.TagDescription } >
                </textarea>
                <div className="row text-secondary">  
                { (this.props.ActiveEvent!==null) && (
                    <div className="btn btn-outline-success w-100 mb-4"
                        data-load={"/Tag/JoinToTag?TagID="+
                        this.props.ActiveEvent.TagID+
                        "&UserID="+this.props.ActiveEvent.InviterUserID+"&EventID="+this.props.ActiveEvent.EventID}
                        data-target="#ex-route-1">
                        {getLangValue('GoToInvitation')}
                    </div>
                )}
                { (showMarkBtn == true) && (
                    <div className="btn btn-outline-light w-100" 
                        onClick={()=>{
                                    if (this.props.EVENTLISTSUM==1) location.reload()
                                    this.markETU(true)
                                }
                        }>
                        {getLangValue('Ok')}
                    </div>
                )}
                </div>
            </div>
        )}

        {  // Пользователь присоединился к вашему тегу
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==2) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">
                            <img src={"/Styles/dist/images/tags/"+
                            (this.props.event==null?0:this.props.event.ApplicationID)
                            +".svg"} />                                  
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8 text-left">
                            <h5 className="text-primary mb-2">
                                {getLangValue('UserHasJoinedYourTag')}
                            </h5>
                            { // Дата получения сообщения
                                ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                GetTime(this.props.ActiveEvent.Added.toString()):''
                            } {/* Дата получения сообщения */}                          
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

        {/* Как должно быть */}
                <div className="event-details-container">
                    <div className="event-details-row my-4">
                        <span className="event-details-item ">
                            <img 
                                src={this.props.ActiveEvent.InvitedUserAvatarBIG}
                                className="ex-transaction-page__person-avatar" 
                                style={{width:'30%'}}/> 
                        </span>            
                        <span className="event-details-item">
                            <img src="/Styles/dist/images/chine.png" style={{width:'15%'}}/>
                        </span>       
                        <span className="event-details-item ">                    
                            <img src={"/Styles/dist/images/tags/"+
                            (this.props.event==null?0:this.props.event.ApplicationID)
                            +".svg"} style={{width:'22%'}}/>
                        </span>
                    </div>
                </div>

                {/* Профиль - Тег */}
                <div className="row my-2 text-center">
                    <div className="col-7">
                        { (this.props.event!==null) &&
                        (<div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/PublicProfile/UserDetail?UserID="+this.props.ActiveEvent.InvitedUserID+"&TagID=0"}>
                                {getLangValue('ViewProfile')}
                        </div>                              
                        )}
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3">
                    { (this.props.ActiveEvent!==null) &&
                        (<div className="text-primary main-menu-close-button" 
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/Application/"+Application[this.props.ActiveEvent.ApplicationID]+"?TagID="+this.props.ActiveEvent.TagID+"&TagID=0"}>
                                {getLangValue('Tag')}                            
                        </div>                              
                        )}     
                    </div>
                </div>  
                {/* Данные */}
                <div className="text-center">
                        {getLangValue('User')}<br/> 
                        <h4>{ this.props.ActiveEvent.InvitedUserFullName }</h4>
                        {getLangValue('HasJoinedYourTag')}
                        <h4>{'#'+this.props.ActiveEvent.TagName}</h4>
                        {getLangValue('AtYourInvitation')}<br/>
                </div>
                <hr/>
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
                <div className="text-center">{this.props.ActiveEvent.Title}</div>
            </div>
        )}   

        {   // Пользователь отключился от тега
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==3) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">
                            <img src="/Styles/dist/images/chinecrash.png" />                                    
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8 text-left">
                            <h5 className="text-primary mb-2">
                                {getLangValue('TheUserHasLeftTheTagOnTheirOwnInitiative')}
                            </h5>
                            { // Дата получения сообщения
                                ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                GetTime(this.props.ActiveEvent.Added.toString()):''
                            } {/* Дата получения сообщения */}                           
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {/* Как должно быть */}
                <div className="event-details-container">
                    <div className="event-details-row">
                        <span className="event-details-item ">
                            <img 
                                src={this.props.ActiveEvent.UserAvatarBIG} 
                                className="ex-transaction-page__person-avatar" 
                                style={{width:'30%'}}/> 
                        </span>            
                        <span className="event-details-item ">
                            <img src="/Styles/dist/images/chinecrash.png" style={{width:'15%'}}/>
                        </span>       
                        <span className="event-details-item ">                    
                            <img src={"/Styles/dist/images/tags/"+
                            (this.props.event==null?0:this.props.event.ApplicationID)
                            +".svg"} style={{width:'22%'}}/>
                        </span>
                    </div>
                </div> 

                {/* Профиль - Тег */}
                <div className="row my-2 text-center my-4">
                    <div className="col-6">
                        { (this.props.event!==null) &&
                        (<div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/PublicProfile/UserDetail?UserID="+this.props.ActiveEvent.UserID+"&TagID=0"}>
                                {getLangValue('ViewProfile')}
                        </div>                              
                        )}
                    </div>
                    <div className="col-2"></div>
                    <div className="col-3">
                    { (this.props.ActiveEvent!==null) &&
                        (<div className="text-primary main-menu-close-button" 
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/Application/"+Application[(this.props.event==null?0:this.props.event.ApplicationID)]+"?TagID="+this.props.ActiveEvent.TagID.toString()}>
                                {getLangValue('Tag')}
                        </div>                              
                        )}     
                    </div>
                    <div className="col-1"></div>                    
                </div>                      
                
                <div className="text-center">                    
                    {getLangValue('User')} <h3>{this.props.ActiveEvent.UserFullName}</h3>&nbsp; 
                    {getLangValue('LeftTag')}: <br/><h2>#{this.props.ActiveEvent.TagName}</h2><br/>  
                    {getLangValue('OnTheirOwnInitiative')}                 
                </div>    

                <hr/>
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}

        {   // Пользователь отключён от тэга системой 
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==4) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">
                                   
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8 text-left">
                            <h5 className="text-primary mb-2">
                                {getLangValue('TheUserHasLeftTheTagOnTheirOwnInitiative')}
                            </h5>
                            { // Дата получения сообщения
                                ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                GetTime(this.props.ActiveEvent.Added.toString()):''
                            } {/* Дата получения сообщения */}                          
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {/* Как должно быть */}
                <div className="event-details-container">
                    <div className="event-details-row">
                        <span className="event-details-item ">
                            <img 
                                src={this.props.ActiveEvent.UserAvatarBIG} 
                                className="ex-transaction-page__person-avatar" 
                                style={{width:'30%'}}/> 
                        </span>            
                        <span className="event-details-item ">
                            <img src="/Styles/dist/images/chinecrash.png" style={{width:'15%'}}/>
                        </span>       
                        <span className="event-details-item ">                    
                            <img src={"/Styles/dist/images/tags/"+
                            (this.props.event==null?0:this.props.event.ApplicationID)
                            +".svg"} style={{width:'22%'}}/>
                        </span>
                    </div>
                </div> 

                {/* Профиль - Тег */}
                <div className="row my-2 text-center my-4">
                    <div className="col-6">
                        { (this.props.event!==null) &&
                        (<div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/PublicProfile/UserDetail?UserID="+this.props.ActiveEvent.UserID+"&TagID=0"}>
                                {getLangValue('ViewProfile')}                        
                        </div>                              
                        )}
                    </div>
                    <div className="col-2"></div>
                    <div className="col-3">
                    { (this.props.ActiveEvent!==null) &&
                        (<div className="text-primary main-menu-close-button" 
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/Application/"+Application[(this.props.event==null?0:this.props.event.ApplicationID)]+"?TagID="+this.props.ActiveEvent.TagID.toString()}>
                                {getLangValue('Tag')}
                        </div>                              
                        )}     
                    </div>
                    <div className="col-1"></div>                    
                </div>                      
                
                <div className="text-center">                    
                    {getLangValue('User')} <h3>{this.props.ActiveEvent.UserFullName}</h3>&nbsp; 
                    {getLangValue('LeftTag')}: <br/><h2>#{this.props.ActiveEvent.TagName}</h2><br/>  
                    {getLangValue('OnTheirOwnInitiative')}                 
                </div>    

                <hr/>
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}

        {  // Новая транзакция Sender ? я = исходящая / sender != Я? = входящая  
            (this.props.event!==null) && (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==5) && (                 
                <div className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div id='exod' className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">                                
                        <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" style={{marginLeft:'5px', width:'30%'}}/>
                        </div>                                                      
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5  className="text-primary mb-2">
                                    {getLangValue('Transaction')}                            
                                </h5>                               
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                } {/* Дата получения сообщения */}                             
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

                {/* Как должно быть */}
                <div className="event-details-container">
                    <div className="event-details-row my-4">
                        <span className="event-details-item ">
                            <img src={this.props.ActiveEvent.SenderAvatarBIG}
                                className="ex-transaction-page__person-avatar" 
                                style={{width:'30%'}}/> 
                        </span>            
                        <span className="event-details-item" >
                            <img src="/Styles/dist/images/triangle-right-green.png" style={{width:''}}/>
                        </span>       
                        <span className="event-details-item ">
                            <img src={this.props.ActiveEvent.ReceiverAvatarBIG}
                                className="ex-transaction-page__person-avatar" 
                                style={{width:'30%'}}/> 
                        </span>  
                    </div>
                </div>          

                {/* Профиль - Профиль */}
                <div className="row my-2 text-center my-4">
                    <div className="col-1"></div>
                    <div className="col-5">
                        <div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/PublicProfile/UserDetail?UserID="+this.props.event.SenderID}>
                                {this.props.ActiveEvent.SenderFullName}
                        </div>
                    </div>                    
                    <div className="col-5">
                        <div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/PublicProfile/UserDetail?UserID="+this.props.event.ReceiverID}>
                                {this.props.ActiveEvent.ReceiverFullName}                           
                        </div>                                               
                    </div>        
                    <div className="col-1"></div>                                               
                </div>    

                <div className="text-center"><h4>
                    {/* Сумма транзакции */}
                    {(this.props.ActiveEvent.Amount)?(getLangValue('Amount')+': '):''}<b>
                    { (this.props.ActiveEvent.Amount) && (this.props.event.SenderID!==undefined) &&                                      
                        (                             
                            parseFloat(this.props.ActiveEvent.Amount.toString()).toFixed(2)+' $'                            
                        )
                    }      
                    </b>                    
                    </h4>
                </div>
                <div className="text-center">                           
                        {(this.props.ActiveEvent.TransferType=='Cash')?(getLangValue('Cash')):''}
                        {(this.props.ActiveEvent.TransferType=='Account')?(getLangValue('PaymentAccount')):''}
                </div>
                <hr/>
                {(this.props.event.SenderID!==getUserID()) && (
                <div className="btn btn-outline-success w-100 mb-4"
                        onClick={()=>this.ConfirmTransaction()}>
                        {getLangValue('ConfirmReceipt')}
                </div>
                )}
               { (showMarkBtn == true) && (
               <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
               )}
            </div>
        )}

        {  // Транзакция подтверждена пользователем
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==6) && ( 
            <div className="ex-transaction-page ex-grid_0-0-1" 
                 style={{left:this.props.leftDetails,background:'#fff'}}>
                <div id='exod' className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">                                
                        <img src="/Styles/dist/images/triangle-right-green.png" 
                            className="ex-transaction-item__triangle" 
                            style={{marginLeft:'5px', width:'30%'}}/>
                        </div>                                                      
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5  className="text-primary mb-2">
                                    {getLangValue('TransactionConfirmedByUser')}
                                </h5>                               
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                 } {/* Дата получения сообщения */}                                
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" 
                                    onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

                {/* Как должно быть */}
                <div className="event-details-container">
                    <div className="event-details-row my-2">
                        <span className="event-details-item ">
                            <img src={this.props.ActiveEvent.ReceiverAvatarBIG}
                                className="ex-transaction-page__person-avatar" 
                                style={{width:'30%'}}/> 
                        </span>  
                    </div>
                </div> 

                {/* Профиль - Профиль */}
                <div className="row my-2 text-center my-4">                
                    <div className="col-12">
                    { (this.props.event!==null) &&
                        (<div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/PublicProfile/UserDetail?UserID="+
                                this.props.event.ReceiverID+"&TagID=0"}>
                                {getLangValue('ViewProfile')}
                        </div>                              
                        )}  
                    </div>               
                </div>    
                {/* Ссылка на диспетчер */}
                <div className="row my-2 text-center my-4">                
                    <div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/Intentions/Dispatcher?UserID="+getUserID()+"&menuItem=5&ItemID="+
                                (this.props.event==null?0:this.props.event.TransactionID)}>
                                {getLangValue('GoToTransaction')} {/*Перейти к транзакции*/}
                    </div>                            
                </div> 
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}

        {   // Смена статуса Красный
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==7) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" 
                style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">                                
                            <img src="/Styles/dist/images/circle-red.png" /> 
                        </div>                                                      
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5 className="text-primary mb-2">
                                {getLangValue('StatusChange')}<br/>
                                <b>{getLangValue('Emergency')}</b>  
                                </h5>                              
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                } {/* Дата получения сообщения */}                                    
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row my-4 text-center">
                    <div className="col-4"></div>                    
                    <div className="col-4">
                        <img src={this.props.ActiveEvent.UserAvatarBIG} 
                        className="ex-transaction-page__person-avatar main-menu-close-button" />                 
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="text-center">{this.props.ActiveEvent.Title}</div>

                {/* Профиль */}
                <div className="row my-2 text-center">
                    <div className="col-3">
                    </div>
                    <div className="col-6">
                        { (this.props.event!==null) &&
                            (<div className="text-primary main-menu-close-button"  
                                    style={{cursor:'pointer'}}
                                    data-target="#ex-route-1" 
                                    data-load={"/PublicProfile/UserDetail?UserID="+
                                    this.props.event.UserID+"&TagID=0"}>
                                    {this.props.ActiveEvent.UserFullName}
                            </div>                              
                        )}
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="text-center">         
                    <h4>
                        { (this.props.ActiveEvent!==null) && 
                            (this.props.ActiveEvent.HelpDetail.UserHelpAmountRequired!==null) &&
                            (parseFloat(this.props.ActiveEvent.HelpDetail.UserHelpAmountRequired.toString()).toFixed(2))
                        } $
                    </h4>
                </div>

                <div className="text-center">         
                    <p>
                        { getLangValue('Deadline') } : {segodnya}
                    </p>
                </div>

                
                { (this.props.ActiveEvent)?console.log(this.props.ActiveEvent):''} 
                { (this.props.ActiveEvent!==null) &&
                    (<textarea 
                        readOnly
                        className="form-control mb-2"
                     defaultValue={this.props.ActiveEvent.HelpDetail.UserHelpDetails}></textarea>
                    ) 
                }
                <br/>
                { (this.props.event!==null) && (
                    <div className="btn btn-outline-danger w-100 mb-4 main-menu-close-button"  
                                    style={{cursor:'pointer'}}
                                    data-target="#ex-route-1" 
                                    data-load={"/PublicProfile/UserDetail?UserID="+
                                    this.props.event.UserID+"&TagID=0"}>
                        {getLangValue('ToHelp')}
                    </div>      
                ) }   
                { (showMarkBtn == true) && (                         
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}

        {   // Смена статуса Зеленый
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==8) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">                                
                            <img src="/Styles/dist/images/circle-green.png" /> 
                        </div>                                                      
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5 className="text-primary mb-2">
                                    {getLangValue('StatusChange')}<br/>
                                    <b>{getLangValue('DontNeedHelp')}</b> &nbsp;<br/>
                                </h5>
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                } {/* Дата получения сообщения */}                              
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row text-center my-5">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <img src={this.props.ActiveEvent.UserAvatarBIG} className="ex-transaction-page__person-avatar" /> 
                    </div>
                    <div className="col-4"></div>
                </div>

                {/* Профиль */}
                <div className="row my-2 text-center">
                    <div className="col-3">
                    </div>
                    <div className="col-6">
                        { (this.props.event!==null) &&
                            (<div className="text-primary main-menu-close-button"  
                                    style={{cursor:'pointer'}}
                                    data-target="#ex-route-1" 
                                    data-load={"/PublicProfile/UserDetail?UserID="+this.props.event.UserID+"&TagID=0"}>
                                    {this.props.ActiveEvent.UserFullName}
                            </div>
                        )}
                    </div>
                    <div className="col-3"></div>
                </div>

                <br/>

                <div className="text-center">{this.props.ActiveEvent.Title}</div>
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}

        {   // Смена статуса Желтый
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==9) && (
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" 
            style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">                                
                            <img src="/Styles/dist/images/circle-yellow.png" /> 
                        </div>                                                      
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5 className="text-primary mb-2">
                                {getLangValue('StatusChange')}<br/>
                                <b>{getLangValue('NeedRegularHelp')}</b>  
                                </h5>                              
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                } {/* Дата получения сообщения */}                                 
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row my-4 text-center">
                    <div className="col-4"></div>                    
                    <div className="col-4">
                        <img src={this.props.ActiveEvent.UserAvatarBIG} 
                        className="ex-transaction-page__person-avatar main-menu-close-button" />                 
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="text-center">{this.props.ActiveEvent.Title}</div>

                {/* Профиль */}
                <div className="row my-2 text-center">
                    <div className="col-3">
                    </div>
                    <div className="col-6">
                        { (this.props.event!==null) &&
                            (<div className="text-primary main-menu-close-button"  
                                    style={{cursor:'pointer'}}
                                    data-target="#ex-route-1" 
                                    data-load={"/PublicProfile/UserDetail?UserID="+
                                    this.props.event.UserID+"&TagID=0"}>
                                    {this.props.ActiveEvent.UserFullName}
                            </div>                              
                        )}
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="text-center">         
                    <h4>
                        { (this.props.ActiveEvent!==null) && 
                            (this.props.ActiveEvent.HelpDetail.UserHelpAmountRequired!==null) &&
                            (parseFloat(this.props.ActiveEvent.HelpDetail.UserHelpAmountRequired.toString()).toFixed(2))
                        } $
                    </h4>
                </div>
                <div className="text-center">         
                    <h4>
                { (this.props.ActiveEvent)?console.log(this.props.ActiveEvent):''} 
                { (this.props.ActiveEvent!==null) &&
                    (Period[this.props.ActiveEvent.HelpDetail.UserHelpPeriod])
                }
                    </h4>
                </div>
                
                { (this.props.event!==null) && (
                    <div className="btn btn-outline-warning w-100 main-menu-close-button"  
                                    style={{cursor:'pointer'}}
                                    data-target="#ex-route-1" 
                                    data-load={"/PublicProfile/UserDetail?UserID="+
                                    this.props.event.UserID+"&TagID=0"}>
                        {getLangValue('ToHelp')}
                    </div>      
                ) }
                <br />
                <br />
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }> 
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}

        {   // Запрос на исполнение обязательства
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==10) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">    
                            <img src="/Styles/dist/images/icons/exchange.svg" style={{width:'60%'}}/>
                        </div>                                                   
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5 className="text-primary mb-2">
                                    {getLangValue('RequestForObligation')} {/*Запрос на исполнение обязательства*/}
                                  
                                </h5>
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                } {/* Дата получения сообщения */}                            
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row text-center my-5">
                    <div className="col-4"></div>
                    <div className="col-4">
                        
                    </div>
                    <div className="col-4"></div>
                </div>

                {/* Профиль */}
                <div className="row my-2 text-center">
                    <div className="col-3">
                    </div>
                    <div className="col-6">
                        { (this.props.event!==null) &&
                            (<div className="text-primary main-menu-close-button"  
                                    style={{cursor:'pointer'}}
                                    data-target="#ex-route-1" 
                                    data-load={"/PublicProfile/UserDetail?UserID="+this.props.event.UserID+"&TagID=0"}>
                                    
                            </div>
                        )}
                    </div>
                    <div className="col-3"></div>
                </div>
                <div className="text-center">
                    {getLangValue('TagName')}: {this.props.ActiveEvent.TagName}<br/><br/>
                    {getLangValue('Description')}: {this.props.ActiveEvent.TagDescription}<br/><br/>
                </div>
                <br/>

                {/* Ссылка на диспетчер */}
                <div className="row my-2 text-center my-4">                
                    <div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/Intentions/Dispatcher?UserID="+getUserID()+"&menuItem=3&ItemID="+
                                (this.props.event==null?0:this.props.event.ObligationID)}>
                                {getLangValue('GoToObligation')} {/*Перейти к обязательству*/}
                    </div>                            
                </div>                 

                <div className="text-center">{this.props.ActiveEvent.Title}</div>
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}

        {   // Запрос на преобразование намерения в обязательство
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==11) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">                                
                            
                        </div>                                                      
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5 className="text-primary mb-2">
                                    {getLangValue('RequestToConvertIntentionToObligation')} 
                                    {/*Запрос на преобразование намерения в обязательство*/}                                
                                </h5>
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                } {/* Дата получения сообщения */}                               
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row text-center my-5">
                    <div className="col-4"></div>
                    <div className="col-4">                        
                    </div>
                    <div className="col-4"></div>
                </div>

                {/* Профиль */}
                <div className="row my-2 text-center">
                    <div className="col-3">
                    </div>
                    <div className="col-6">
                        { (this.props.event!==null) &&
                            (<div className="text-primary main-menu-close-button"  
                                    style={{cursor:'pointer'}}
                                    data-target="#ex-route-1" 
                                    data-load={"/PublicProfile/UserDetail?UserID="+this.props.event.UserID+"&TagID=0"}>
                                    
                            </div>
                        )}
                    </div>
                    <div className="col-3"></div>
                </div>
                <br/>
                <div className="text-center">{this.props.ActiveEvent.Title}</div>
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}

        {   // Произошло ключевое событие тега
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==12) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon">    
                            <img src="/Styles/dist/images/icons/gear.svg" style={{width:'60%'}}/>
                        </div>                                                      
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5 className="text-primary mb-2">
                                    {getLangValue('TagKeyEventOccurred')}  
                                    {/*Произошло ключевое событие тега */}                                
                                </h5>
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                } {/* Дата получения сообщения */}                           
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row text-center my-5">
                    <div className="col-4"></div>
                    <div className="col-4">
                       
                    </div>
                    <div className="col-4"></div>
                </div>

                {/* Как должно быть ********************************/}
                <div className="event-details-container">
                    <div className="event-details-row my-2">
                        <span className="event-details-item ">
                            <img src={this.props.ActiveEvent.ReportedUserAvatarBIG}
                                className="ex-transaction-page__person-avatar" 
                                style={{width:'30%'}}/> 
                        </span>            
                        <span className="event-details-item" >
                            <img src="/Styles/dist/images/icons/gear.svg" style={{width:'10%'}}/>
                        </span>       
                        <span className="event-details-item ">                    
                            { (this.props.event!==null) && (<img src={"/Styles/dist/images/tags/"+
                                this.props.event.ApplicationID+".svg"} 
                                style={{width:'22%'}}/>)}
                        </span>
                    </div>
                </div> 

                {/* Профиль - Тег */}
                <div className="row my-2 text-center my-4">
                    <div className="col-7">
                        { (this.props.event!==null) &&
                        (<div className="text-primary main-menu-close-button"  
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/PublicProfile/UserDetail?UserID="+
                                this.props.ActiveEvent.ReportedUserID+"&TagID=0"}>
                                {this.props.ActiveEvent.ReportedUserFullName}
                        </div>)}
                    </div>                    
                    <div className="col-4">
                    { (this.props.ActiveEvent!==null) &&
                        (<div className="text-primary main-menu-close-button" 
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/Application/AppOwnIniciative?TagID="+this.props.ActiveEvent.TagID}>
                                {getLangValue('Tag')}
                        </div>                              
                        )}     
                    </div>                    
                </div>   

                <div className="row my-2 text-center">
                    <div className="col-12">
                        <div className="ex-transaction-page__person-name">
                            {getLangValue('TagKeyEventOccurred')}:<br/>
                            {/*Произошло ключевое событие тега */}
                            <h2>#{this.props.ActiveEvent.TagName}</h2>
                        </div>
                    </div>
                </div>
                {/**************************************************************** */}                              
                <br/>                
                <div className="text-center">{this.props.ActiveEvent.Title}</div>
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}

        {   // Тэг собственной инициативы достиг бюджета учитывая намерения
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==13) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" 
            style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon2">    
                            <img src={"/Styles/dist/images/tags/4.svg"} className="ex-transaction-item__application_big"/>
                        </div>                                                      
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5 className="text-primary mb-2">
                                    {getLangValue('OwnInitiativeTagReachedBudgetGivenIntentions')}
                                    {/*Тэг собственной инициативы достиг бюджета учитывая намерения*/}                                 
                                </h5>
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                } {/* Дата получения сообщения */}                           
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon2" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row text-center my-5">
                    <div className="col-4"></div>
                    <div className="col-4">
                       
                    </div>
                    <div className="col-4"></div>
                </div>

                {/* Как должно быть ********************************/}
                <div className="event-details-container">
                    <div className="event-details-row my-2">
                        <span className="event-details-item ">                    
                            { (this.props.event!==null) && (<img src={"/Styles/dist/images/tags/"+
                                this.props.event.ApplicationID+".svg"} 
                                style={{width:'22%'}}/>)}
                        </span>
                    </div>
                </div> 

                {/* Профиль - Тег */}
                <div className="row my-2 text-center my-4">
                    <div className="col-12">
                    { (this.props.ActiveEvent!==null) &&
                        (<div className="text-primary main-menu-close-button" 
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/Application/AppOwnIniciative?TagID="+this.props.ActiveEvent.TagID}>
                                {getLangValue('Tag')}
                        </div>                              
                        )}     
                    </div>                    
                </div>   

                <div className="row my-2 text-center">
                    <div className="col-12">
                        <div className="ex-transaction-page__person-name">
                            {getLangValue('OwnInitiativeTagReachedBudgetGivenIntentions')}:<br/>
                            {/*Тэг собственной инициативы достиг бюджета учитывая намерения*/}
                            <h2>#{this.props.ActiveEvent.TagName}</h2>
                        </div>
                    </div>
                </div>
                {/**************************************************************** */}                              
                <br/>                
                <div className="text-center">{this.props.ActiveEvent.Title}</div>
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}


        {   // Тэг собственной инициативы достиг требуемого бюджета
            (this.props.ActiveEvent!==null) && ( this.props.ActiveEvent.Type==14) && ( 
            <div id='exod' className="ex-transaction-page ex-grid_0-0-1" style={{left:this.props.leftDetails,background:'#fff'}}>
                <div className="row">
                    <div className="col-3">
                        <div className="ex-transaction-page__tag-icon2">    
                            <img src={"/Styles/dist/images/tags/4.svg"} className="ex-transaction-item__application_big_blue"/>
                        </div>                                                      
                    </div>
                    <div className="col-9">
                        <div className="row text-secondary">
                            <div className="col-8">
                                <h5 className="text-primary mb-2">
                                    {getLangValue('OwnInitiativeTagReachedBudget')}
                                    {/*Тэг собственной инициативы достиг требуемого бюджета*/}
                                </h5>
                                { // Дата получения сообщения
                                    ((this.props.ActiveEvent!)&&(this.props.ActiveEvent.Added!==null))?
                                    GetTime(this.props.ActiveEvent.Added.toString()):''
                                } {/* Дата получения сообщения */}                           
                            </div>
                            <div className="col-4">
                                { this.props.closeButton && (                                
                                    <div className="ex-transaction-page__close-icon" onClick={_=>this.props.close()}></div>
                                )}                                       
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row text-center my-5">
                    <div className="col-4"></div>
                    <div className="col-4">
                       
                    </div>
                    <div className="col-4"></div>
                </div>

                {/* Как должно быть ********************************/}
                <div className="event-details-container">
                    <div className="event-details-row my-2">
                        <span className="event-details-item ">                    
                            { (this.props.event!==null) && (<img src={"/Styles/dist/images/tags/"+
                                this.props.event.ApplicationID+".svg"} 
                                style={{width:'22%'}}/>)}
                        </span>
                    </div>
                </div> 

                {/* Профиль - Тег */}
                <div className="row my-2 text-center my-4">
                    <div className="col-12">
                    { (this.props.ActiveEvent!==null) &&
                        (<div className="text-primary main-menu-close-button" 
                                style={{cursor:'pointer'}}
                                data-target="#ex-route-1" 
                                data-load={"/Application/AppOwnIniciative?TagID="+this.props.ActiveEvent.TagID}>
                                {getLangValue('Tag')}
                        </div>                              
                        )}     
                    </div>                    
                </div>   

                <div className="row my-2 text-center">
                    <div className="col-12">
                        <div className="ex-transaction-page__person-name">
                            {getLangValue('OwnInitiativeTagReachedBudget')}:<br/>
                            {/*Тэг собственной инициативы достиг требуемого бюджета*/}
                            <h2>#{this.props.ActiveEvent.TagName}</h2>
                        </div>
                    </div>
                </div>
                {/**************************************************************** */}                              
                <br/>                
                <div className="text-center">{this.props.ActiveEvent.Title}</div>
                { (showMarkBtn == true) && (
                <div className="btn btn-outline-light w-100" 
                    onClick={()=>{
                                if (this.props.EVENTLISTSUM==1) location.reload()
                                this.markETU(true)
                            }
                    }>
                    {getLangValue('Ok')}
                </div>
                )}
            </div>
        )}        
        </div>
    </div>
        )
    }
}


