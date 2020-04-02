import * as React from 'react';
import { getUserID, getLangValue } from '../../global';
import { EventsListData } from '../../classes/EventsListData';
import { EventsListDetail } from './EventsListDetail';
const shortid = require('shortid');
import { LightJson } from '../../classes/LightJson';
import { bindToElement } from '../../load';

let treugolnik = ['notice-green','notice-green','notice-green','notice-green','notice-yellow','notice-red'];
// let vagno = ['нет данных','не важно','не важно','важно','чрезвычайно','чрезвычайно'];

interface Props {
    
}

interface State {
    seconds:number
    width:number
    intervalId:number
    EventsList:EventsListData[]
    ActiveEvent:EventsListData
    showEvents:boolean 
    leftDetails:string
    closeButton:boolean
    event: LightJson |null
    hidden: boolean
    unreadEventsActive: boolean
    unreadEventsCount: number
}

export class EventsList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { width: document.documentElement.clientWidth/3 +18,
                       seconds: 0,
                       intervalId:0,
                       EventsList:[],
                       ActiveEvent: new EventsListData(1),
                       showEvents:false,
                       leftDetails:'66.66%',
                       closeButton:false,
                       event: null,
                       hidden: true,
                       unreadEventsActive: true,
                       unreadEventsCount: 0
                    };
                    this.handleSelectRow = this.handleSelectRow.bind(this);
                    this.tick = this.tick.bind(this);
                    this.resize = this.resize.bind(this);
                    this.close = this.close.bind(this);
                    this.getEvent = this.getEvent.bind(this);
                    this.load = this.load.bind(this);

    }
    getEvent=(EventID:number)=>{
        if (this.state.ActiveEvent!==null)
        {
        this.setState ({hidden:true})
        fetch('/api/Events/GetByID?EventID='+EventID,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body:                 
            JSON.stringify( { }),
            method:'post', 
            credentials: 'include'} )
        .then(response=>response.json())                    
        .then(json=> { this.setState({ event: json.Data.LightJson, hidden: false }) })
        .then(() =>bindToElement(".ex-right-panel"));
        }
    }

    tick=()=>{ //this.setState({seconds: this.state.seconds+1}) 
    }

    close=()=>{ this.setState({leftDetails: '100%'}) }



    handleSelectRow=(id:any)=>{
        this.getEvent(id);
        let events2 = [...this.state.EventsList];        
            console.log(events2)
        // Зануление
        events2.map(x=> 
            { x.className!=='ex-list__item ex-list__item'? 
              x.className='ex-list__item ex-list__item':
              null 
            })
        // Поиск ключа  IndexOf / findIndex
        let key = events2.findIndex(obj=>obj.EventID===id)
            //console.log("key:"+key+", id="+id)
        events2[key].className='ex-list__item ex-list__item_active';

        this.setState({ ActiveEvent: this.state.EventsList[key], EventsList: events2});        
        this.resize()
    }
    //.then(() => bindToElement(".ex-right-panel"));

    load=()=>{
        //console.log('Load()=>GetEventList')
        this.setState({
            EventsList:[],
            unreadEventsActive: true
        });
    fetch('/api/Events/GetEventList?UserID='+getUserID(), 
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body:                 
        JSON.stringify( getUserID() ),
        method:'post', 
        credentials: 'include'}
    )
    .then(response=>response.json())                    
    .then(json=>
            {
            if (json.Data.length!=0) {
                let events = json.Data.map((item: EventsListData)=>{ 
                    item.className='ex-list__item ex-list__item'; 
                    return new EventsListData(item) });

                this.setState({ 
                    EventsList: events,
                    unreadEventsCount: events.length
                    });

                var data = [...this.state.EventsList];
                if (data[0])
                    data[0].className='ex-list__item ex-list__item_active';

                this.setState({ ActiveEvent : data[0], EventsList : data });
                // Загрузка первого события
                this.getEvent(this.state.ActiveEvent.EventID);                
            }
        })   
    }


    componentWillMount() {
        this.load()
    }

    componentDidMount = ()=> {
        this.resize()
        window.addEventListener('resize', this.resize);
        this.setState({intervalId: window.setInterval(this.tick, 1000)});
    }

    componentWillUnmount = ()=> {
        window.removeEventListener('resize', this.resize);
        clearInterval(this.state.intervalId);
    }

    resize =() =>{
        
        if (document.documentElement.clientWidth<1200)            
            { this.setState ({ width: document.documentElement.clientWidth/2 +18, 
                showEvents:false, leftDetails:'50%', closeButton:true}); }
        else
            this.setState ({ width: document.documentElement.clientWidth/3 +18, 
                showEvents:false, leftDetails:'66.66%', closeButton:false});
    }

    showReadEvents = ()=> {
        this.setState({ unreadEventsActive: false });

        // show loading
        fetch('/api/Events/EventList_Read_ByUserID?UserID='+getUserID(), 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body:                 
            JSON.stringify( getUserID() ),
            method:'post', 
            credentials: 'include'}
        )
        .then(response=>response.json())                    
        .then(json=>
            {
                if (json.Data && json.Data.length!=0) {
                    this.setState({ 
                        EventsList: json.Data.map((item: any)=>{
                            let lightJson = item["LightJson"];
                            lightJson.className='ex-list__item ex-list__item'; 
                            return new EventsListData(lightJson) }),
                        });

                    var data = [...this.state.EventsList];
                    if (data[0]) {
                        data[0].className='ex-list__item ex-list__item_active';
                        this.setState({ ActiveEvent : data[0], EventsList : data });
                        // Загрузка первого события
                        this.getEvent(this.state.ActiveEvent.EventID); 
                    }               
                }
            }
        )  
    }

    showUnreadEvents = ()=> {
        this.load();
    }

    render()    
    {        
        if (this.state === null) return (<div><img src="styles/dist/images/loading.svg" alt="" /></div>)
        return (
        <div>
            <div className="ex-navigation"></div>
                <div className="ex-list ex-grid_0-1-0">
                    <div className="ex-list__header">
                        <div className="ex-list__item">
                            <div className="ex-list__item-content">
                                <div className="ex-list__header-title">
                                    <i className="icons-bell mr-2"></i>
                                        {getLangValue('AllNotifications')}:
                                </div>

                                <a className={ (this.state.unreadEventsActive == false ? "active " : "") + "ex-list__events-read"} onClick={this.showReadEvents}>
                                    {getLangValue('Notification.ReadLabel')}
                                </a>
                                <div className="ex-list__events-separator">
                                    |
                                </div>
                                <a className={ (this.state.unreadEventsActive == true ? "active " : "") + "ex-list__events-unread"} onClick={this.showUnreadEvents}>
                                    {getLangValue('Notification.UnreadLabel')} ({this.state.unreadEventsCount})
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <div  style={{width:this.state.width-18, overflow:'hidden'}}>
                        <div style={{height:'100%', overflowY:'scroll'}}> 
                        { 
                            this.state.EventsList.map( events => { 
                                 var amount=''
                                 var val
                                 if (events.Amount) 
                                 {
                                    amount = events.Amount
                                    amount = amount.replace(/,/g, '.') 
                                    val = +amount                                    
                                 } else val = 0; 
                                return (                            
                                <div className="ex-list__viewport" key={shortid.generate()}>
                                    <div className={events.className} onClick={()=>this.handleSelectRow(events.EventID)}>
                                        <div className="ex-list__item-content">
                                            
                                                {(events.Type==1) && ( // Приглашение в тег +++
                                                    <div className="ex-transaction-item ex-transaction-item_success" >
                                                    <img src={events.InviterUserAvatarSMALL}  className="ex-transaction-item__from" />
                                                    <img src="/Styles/dist/images/invite.png" className="ex-transaction-item__chine" />
                                                <img src={"/Styles/dist/images/tags/"+events.ApplicationID+".svg"} className="ex-transaction-item__application"/> {/* Пригласил Вас присоединиться к тегу */}
                                                    <div className="ex-transaction-item__description"><b>{events.InviterUserFullName}</b> {getLangValue('InvitedYouToJoinTag')}:<b>{events.TagName}</b></div>
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}

                                                {(events.Type==2) && ( // Пользователь присоединился к тегу +++
                                                    <div className="ex-transaction-item ex-transaction-item_success" >
                                                    <img src={events.InvitedUserAvatarSMALL}  className="ex-transaction-item__from" />
                                                    <img src="/Styles/dist/images/chine.png" className="ex-transaction-item__chine"/>
                                                    <img src={"/Styles/dist/images/tags/"+events.ApplicationID+".svg"} className="ex-transaction-item__application"/> 
                                                    <div className="ex-transaction-item__description" style={{width:'205px'}}>
                                                        {getLangValue('UserHasJoinedToTag')}: 
                                                        <b>{events.TagName.substr(0,50)}...</b> 
                                                        {getLangValue('AtYourInvitation')}</div> {/* По Вашему приглашению */}
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}    

                                                {(events.Type==3) && ( // Пользователь отключился от тега +++
                                                    <div className="ex-transaction-item ex-transaction-item_success" >                                                                                             
                                                    <img src={events.UserAvatarSMALL} className="ex-transaction-item__from" />
                                                    <img src="/Styles/dist/images/chinecrash.png" className="ex-transaction-item__chinecrash" /> 
                                                    <img src={"/Styles/dist/images/tags/"+events.ApplicationID+".svg"} className="ex-transaction-item__application"/>
                                                    <div className="ex-transaction-item__description">
                                                        {getLangValue('UserDisconnectedFromTag')}: {/*Пользователь отключился от тега*/}
                                                        <b>{events.TagName}</b></div>
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}    

                                                {(events.Type==4) && ( // Пользователь отключен от тега системой ---
                                                    <div className="ex-transaction-item ex-transaction-item_success" >                                                                                             
                                                    <img src={events.UserAvatarSMALL} className="ex-transaction-item__from" />
                                                    <img src="/Styles/dist/images/chinecrash.png" className="ex-transaction-item__chinecrash" /> 
                                                    {/* <img src={"/Styles/dist/images/tags/"+events.ApplicationID+".svg"} className="ex-transaction-item__application"/> */}
                                                    <div className="ex-transaction-item__description">
                                                        {getLangValue('UserDisconnectedFromTagBySystem')}: {/*Пользователь отключен от тега системой*/}
                                                        <b>{events.TagName}</b></div>
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}    

                                                {(events.Type==5) && (this.state.event!==null) && (this.state.event) && ( // Новая транзакция ---
                                                    <div className="ex-transaction-item ex-transaction-item_success" >
                                                    <img src={events.SenderAvatarSMALL}  className="ex-transaction-item__from" style={{width:'100px'}} />
                                                    <img src="/Styles/dist/images/triangle-right-green.png" className="ex-transaction-item__triangle" style={{margin:'20px',width:'30px'}}/>
                                                    <img src={events.ReceiverAvatarSMALL} className="ex-transaction-item__from" style={{width:'100px'}} />
                                                    <div className="ex-transaction-item__description" style={{width:'350px', paddingLeft:'5%'}}>
                                                        {(events.SenderID!==getUserID())?getLangValue('TransactionFrom'):
                                                            getLangValue('TransactionFor')}:
                                                            <br/><b>{(events.SenderID!==getUserID())?events.SenderFullName:events.ReceiverFullName}</b></div>
                                                    <div className="ex-transaction-item__description" 
                                                    // style={{textAlign:'center', color:((events.SenderID!==getUserID())?'#67971a':'#fd6721') }}><b><span style={{fontSize:'16px'}}>{val.toFixed(2)}</span><br/>USD</b></div>     
                                                    style={{textAlign:'center', color:'#67971a'}}><b><span style={{fontSize:'16px'}}>{val.toFixed(2)}</span><br/>USD</b></div>     
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" style={{width:'58px'}}/>
                                                    </div>
                                                )}    

                                                {(events.Type==6) && ( // Транзакция подтверждена получателем +++
                                                    <div className="ex-transaction-item ex-transaction-item_success" >
                                                        
                                                    <img src={events.ReceiverAvatarSMALL}  className="ex-transaction-item__from" style={{width:'16%'}} />                                                   
                                                    <img src="/Styles/dist/images/plus.png" className="ex-transaction-item__triangle" 
                                                         style={{marginLeft:'30px', marginRight:'20px', background:'#7ad281', width:'8%', maxWidth:'20px'}}/>
                                                    <div className="ex-transaction-item__description" style={{width:'60%'}} >
                                                        {getLangValue('TransactionConfirmedByRecipient')}: {/*Транзакция подтверждена получателем*/}
                                                        <br/><b>{events.ReceiverFullName}</b></div>
                                                    <div className="ex-transaction-item__description" ><b><span style={{fontSize:'16px'}}>{val.toFixed(2)}</span><br/>USD</b></div>     
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} 
                                                         className="ex-transaction-item__notice" 
                                                         style={{width:'10%'}} />
                                                    </div>
                                                )}                                                                                              

                                                {(events.Type==7) && ( // Смена статуса красный ++-
                                                    <div className="ex-transaction-item ex-transaction-item_success" >
                                                    <img src={events.UserAvatarSMALL} className="ex-transaction-item__from" />                                                
                                                    <img src="/Styles/dist/images/circle-red.png" className="ex-transaction-item__circle" />
                                                    <div className="ex-transaction-item__description">
                                                        {getLangValue('AttentionEmergency')}! {/*Внимание чрезвычайная ситуация*/}
                                                        </div>
                                                    <div className="ex-transaction-item__date"></div>
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}  

                                                {(events.Type==8) && ( // Смена статуса на зеленый +++
                                                    <div className="ex-transaction-item ex-transaction-item_success" >    
                                                    <img src={events.UserAvatarSMALL} className="ex-transaction-item__from" />                                                
                                                    <img src="/Styles/dist/images/circle-green.png" className="ex-transaction-item__circle" />
                                                    <div className="ex-transaction-item__description">
                                                        {getLangValue('NewStatusAllIsWell')}!</div> {/*Новый статус. Все хорошо*/}
                                                    <div className="ex-transaction-item__date"></div>
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}  

                                                {(events.Type==9) && ( // Смена статуса на желтый ++-
                                                    <div className="ex-transaction-item ex-transaction-item_success" >    
                                                    <img src={events.UserAvatarSMALL} className="ex-transaction-item__from" />                                                
                                                    <img src="/Styles/dist/images/circle-yellow.png" className="ex-transaction-item__circle" />
                                                    <div className="ex-transaction-item__description">
                                                        {getLangValue('RegularHelpRequired')}!</div>{/*Требуется регулярная помощь*/}
                                                    <div className="ex-transaction-item__date"></div>
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}

                                                {   // Запрос на исполнение обязательства
                                                    (events.Type==10) && (  
                                                    <div className="ex-transaction-item ex-transaction-item_success" >    
                                                    <img src={events.HolderAvatarSMALL} className="ex-transaction-item__from" />
                                                    <div className="ex-transaction-item__description" style={{textAlign:'center', marginRight:10, marginLeft:10}}>
                                                        {getLangValue('RequestForPerformanceOfAnObligationOnATag')}:{/*Запрос на исполнение обязательства по тегу*/}
                                                        <b>{events.TagName}</b></div>
                                                    <img src={events.IssuerAvatarSMALL} className="ex-transaction-item__from" />                                                    
                                                    {/* <div className="ex-transaction-item__description" style={{width:'50px',textAlign:'center'}}><b>
                                                        <span style={{fontSize:'16px'}}>{events.Amount}</span><br/>USD</b></div> */}
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}    

                                                {   // Запрос на преобразование намерения в обязательство
                                                    (events.Type==11) && (
                                                    <div className="ex-transaction-item ex-transaction-item_success" >    
                                                    <img src={events.HolderAvatarSMALL} className="ex-transaction-item__from" />
                                                    <div className="ex-transaction-item__description">
                                                        {getLangValue('RequestToConvertIntentionToObligation')}</div> {/*Запрос на преобразование намерения в обязательство*/}
                                                    <img src={events.IssuerAvatarSMALL} className="ex-transaction-item__from" />
                                                    <div className="ex-transaction-item__date"></div>
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}    
                                                {   // Произошло ключевое событие тега
                                                    (events.Type==12) && (this.state.event!==null) && (this.state.event) && ( 
                                                    <div className="ex-transaction-item ex-transaction-item_success" >
                                                    <img src={events.ReportedUserAvatarSMALL}  className="ex-transaction-item__from" />
                                                    <img src="/Styles/dist/images/icons/gear.svg" className="ex-transaction-item__chine" />
                                                    <img src={"/Styles/dist/images/tags/4.svg"} className="ex-transaction-item__application"/>
                                                    <div className="ex-transaction-item__description" style={{color:'#3778ad'}}>
                                                        {getLangValue('User')} {events.HolderAvatarSMALL} 
                                                        {getLangValue('ReportsTheOccurrenceOfAKeyTagEvent')}:{/*сообщает о наступлении ключевого события тега*/}
                                                        <b>{events.TagName}</b></div>
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}  
                                                {   // Тэг собственной инициативы достиг бюджета учитывая намерения
                                                    (events.Type==13) && (this.state.event!==null) && (this.state.event) && ( 
                                                    <div className="ex-transaction-item ex-transaction-item_success" >
                                                    {/* <img src={events.ReportedUserAvatarSMALL}  className="ex-transaction-item__from" /> */}
                                                    {/* <img src="/Styles/dist/images/icons/gear.svg" className="ex-transaction-item__chine" /> */}
                                                    <img src={"/Styles/dist/images/tags/4.svg"} className="ex-transaction-item__application_big"/>
                                                    <div className="ex-transaction-item__description60" style={{color:'#3778ad'}}>
                                                        {getLangValue('TagReachedBudgetGivenIntentions')}: 
                                                        <br/><b>{events.TagName}</b>
                                                        {/*Тэг достиг бюджета учитывая намерения*/}
                                                    </div>
                                                    <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}   
                                                {   // Тэг собственной инициативы достиг требуемого бюджета
                                                    (events.Type==14) && (this.state.event!==null) && (this.state.event) && ( 
                                                    <div className="ex-transaction-item ex-transaction-item_success" >
                                                        <img src={"/Styles/dist/images/tags/4.svg"} className="ex-transaction-item__application_big_blue"/>
                                                        <div className="ex-transaction-item__description60" style={{color:'#3778ad'}}>
                                                           {getLangValue('TagReachedBudget')}: {/*Тэг достиг требуемого бюджета*/}
                                                           <br/><b>{events.TagName}</b></div>
                                                        <img src={"/Styles/dist/images/"+treugolnik[events.ImportanLevel]+".png"} className="ex-transaction-item__notice" />
                                                    </div>
                                                )}                                                   


                                        </div>
                                    </div>
                                </div>
                            ) })                             
                        }
                        </div>
                    </div>                
                </div>                        
                {
                    (this.state.event!==null) && (this.state.ActiveEvent!==undefined) && (this.state.ActiveEvent!==null) && (
                    <EventsListDetail
                        ActiveEvent={this.state.ActiveEvent} 
                        closeButton={this.state.closeButton} 
                        leftDetails={this.state.leftDetails} 
                        close={()=>this.setState({leftDetails:'100%'})}
                        event={ this.state.event } 
                        reload={()=>this.load()}
                        hidden = {this.state.hidden}
                        EVENTLISTSUM = {this.state.EventsList.length}
                        showMarkBtn = {this.state.unreadEventsActive == true}
                        />)
                }                    
        </div>
        )
    }
}