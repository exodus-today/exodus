import * as React from 'react';
import {getLang, getLangValue, getApiKey, getUserID, getCurrencySymbol, getOnDayOfWeek, getPeriodName} from '../../global';
import { Period, AccessType, IntentionType, Application, TagRole } from '../../enums';
import {AddIntentionToApplication} from '../Shared/AddIntentionToApplication';
import {JoinForm} from '../Tag/JoinForm';
import * as moment from 'moment';
import { notify } from '../Shared/Notifications';


enum DashboardTab {
    Intentions = 1, 
    Obligations = 2
}

interface Props {
    tagID: Number;
    tagDescription: string;
    tagRole: TagRole;
}

interface State {
    loading: boolean,
    intentions: any[],
    obligations: any[],
    intentionType: IntentionType,
    tag: any,
    fundsCollected: number,
    fundsExpected: number,
    currentTab: DashboardTab
}

export class OwnInitiativeDashboard extends React.Component<Props, State> {
    userID: any;
    tagRole: TagRole;

    constructor(props: Props) {
        super(props);
        this.state = { tag: {}, intentions: [], obligations: [], intentionType: IntentionType.None, loading: false, fundsCollected: 0, fundsExpected: 0, currentTab: DashboardTab.Intentions };
        this.userID = getUserID();
        this.tagRole = this.props.tagRole;
        this.afterIntentionAdded = this.afterIntentionAdded.bind(this);
        this.onReportEventClick = this.onReportEventClick.bind(this);
    }

    componentWillMount() {
        let that = this;

        // take tag information
        fetch('/api/Tag/Get_ByID?api_key='+ getApiKey() + '&TagID=' + this.props.tagID, {credentials: 'include'})
            .then(response=>response.json())
            .then(json=> {
                that.setState({tag: json.Data});
            });

        this.getIntentionsInfo();

        // take tag information
        fetch('/api/Application/Settings_Read?TagID=' + this.props.tagID + '&ApplicationID=' + Application.OwnInitiative, {credentials: 'include', method: 'POST'})
            .then(response=>response.json())
            .then(json=> {
                let intentionType = json.Data ? json.Data.Intention_Type : IntentionType.Regular;
                that.setState({intentionType: intentionType == IntentionType.None || intentionType == IntentionType.Regular ? IntentionType.Regular : IntentionType.OnDemand});
            });
    }
    
    getIntentionsInfo() {
        let that = this;

        // check if user joined application
        if (this.tagRole != TagRole.None) {

            fetch('/api/Intention/Get_ByTagID?api_key='+ getApiKey() + '&TagID=' + this.props.tagID, {credentials: 'include'})
                .then(response=>response.json())
                .then(json=> {
                    let intentions = json.Data,
                        grandTotalAmount = 0;
                    
                    intentions.forEach((item :any) => {
                        grandTotalAmount += item.IntentionAmount;
                    });

                    that.setState({intentions: intentions, fundsExpected: grandTotalAmount, loading: false});
                });

            fetch('/api/Obligation/Get_ByTagID?api_key='+ getApiKey() + '&TagID=' + this.props.tagID, {credentials: 'include'})
                .then(response=>response.json())
                .then(json=> {
                    let obligations = json.Data,
                        grandTotalAmount = 0;
                    
                    obligations.forEach((item :any) => {
                        grandTotalAmount += item.AmountTotal;
                    });

                    that.setState({obligations: obligations, fundsCollected: grandTotalAmount});
                });
        }
    }

    async afterIntentionAdded() {
        this.tagRole = await window.updateTagRoleInfo();
        this.getIntentionsInfo();
    }

    onReportEventClick() {
        fetch('/api/AppOwnInitiative/ReportEvent?TagId=' + this.props.tagID + '&reporterUserID=' + getUserID(), {credentials: 'include'})
            .then(response=>response.json())
            .then(json=> {
                notify.success(getLangValue("Notification.OwnInitiativeEventReported"));
            });   
    }

    onDeclineClick(intentionID: number) {
        fetch('/api/Intention/Delete?IntentionID=' + intentionID, {method: "POST", credentials: 'include'})
            .then(response=>response.json())
            .then(json=> {
                if (json.ErrorCode == -1) {
                    this.getIntentionsInfo();
                    notify.success(getLangValue("Notification.IntentionDeclined"));
                }
            });
    }

    onConvertToObligationClick(intentionID: number) {
        fetch('/api/Intention/ToObligation?IntentionID=' + intentionID, {credentials: 'include'})
            .then(response=>response.json())
            .then(json=> {
                if (json.ErrorCode == -1) {
                    this.getIntentionsInfo();
                    notify.success(getLangValue("Notification.IntentionConvertedToObligation"));
                }
            });
    }

    render() {
        const intentionsHead =    
                <thead>
                    <tr>
                        <th scope="col">{getLangValue('User')}</th>
                        <th scope="col">{getLangValue('Summ')}</th>
                        {/*
                        <th scope="col">{getLangValue('Periodicity')}</th>
                        <th scope="col">{getLangValue('DatePeriod')}</th>  
                        */}               
                        <th scope="col">{getLangValue('Actions')}</th>
                    </tr>
                </thead>,
            obligationsHead =    
                <thead>
                    <tr>
                        <th scope="col">{getLangValue('User')}</th>
                        <th scope="col">{getLangValue('Summ')}</th>
                    </tr>
                </thead>
        

        
        let { tag, intentions, obligations, intentionType, fundsCollected, fundsExpected, currentTab } = this.state;
        let { tagRole } = this;

        return (
            <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space">
                <div className="ex-panel">
                    <div className="ex-panel__content">

                        <div className="row">
                            <div className="col-md-12">
                                <p>{getLangValue('TotalAmount')}: {tag.TotalAmount}{getCurrencySymbol(tag.TotalAmountCurrencyID)}</p>
                            </div>
                        </div>   

                        <div className="row">
                            <div className="col-md-12">
                                <p>{getLangValue('Funds.Collected')}: {fundsCollected}{getCurrencySymbol(tag.TotalAmountCurrencyID)}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <p>{getLangValue('Funds.Expected')}: {fundsExpected}{getCurrencySymbol(tag.TotalAmountCurrencyID)}</p>
                            </div>
                        </div>        

                        {intentionType == IntentionType.Regular && (
                        <div className="row">
                            <div className="col-md-12">
                                <p>{getLangValue('Periodicity')}:&nbsp;
                                    <span className="lowercase">{ getPeriodName(tag.Period) }&nbsp; 
                                        <strong>{(tag.Period == Period.Once) && (moment((tag.EndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY")) }</strong>
                                        {(tag.Period == Period.Weekly) && (getOnDayOfWeek(tag.DayOfWeek))}
                                        {(tag.Period == Period.Monthly) && (tag.DayOfMonth + ' ' + getLangValue('ShortDayOfMonth'))}
                                    </span>
                                </p>
                            </div>
                        </div>
                        )}

                        {intentionType == IntentionType.OnDemand && (
                        <div className="row">
                            <div className="col-md-12">
                                <p>{getLangValue('Periodicity')}: <span className="lowercase">{ getLangValue('OnEvent') }</span></p>
                            </div>
                            {tagRole != TagRole.None && (
                            <div className="col-md-5">
                                <button className="btn btn-outline-primary w-100" onClick={this.onReportEventClick}>{getLangValue("NotifyAboutEvent")}</button>
                            </div>
                            )}
                        </div>
                        )}

                        <div className="row">
                            <div className="col-md-12 mt-1">
                                <p>{getLangValue('Description')}: {this.props.tagDescription}</p>
                            </div>
                        </div>
                    </div>

                    {tag.AccessType == AccessType.Public && tagRole == TagRole.None && (
                        <div className="ex-panel__content">
                            <div className="row">
                                <div className="col-md-12 mb-4">
                                    <h3>{getLangValue("Join")}</h3>
                                </div>
                                <JoinForm tag={tag} afterSubmitHandler={this.afterIntentionAdded} className="col-md-12 mb-4" />
                            </div>
                        </div>
                    )}

                    {tagRole != TagRole.None && (
                    <div className="ex-panel__content">
                        <button 
                            onClick={() => this.setState({currentTab: DashboardTab.Intentions})}
                            className="btn btn-outline-primary w-80" data-selected={currentTab == DashboardTab.Intentions}
                            >{getLangValue('Intentions')} 
                        </button>&nbsp;

                        <button 
                            onClick={() => this.setState({currentTab: DashboardTab.Obligations})}
                            className="btn btn-outline-primary w-80" data-selected={currentTab == DashboardTab.Obligations}
                            >{getLangValue('Obligations')}
                        </button>&nbsp;

                        { currentTab == DashboardTab.Intentions && (
                        <div id="intentions-container" className="table-with-actions">
                            <table>
                                {intentionsHead} 
                                <tbody> 
                                {
                                    intentions.map( (x, index) => { return (
                                        <tr key={index}>
                                            <td><strong>{x.IntentionIssuer.UserFullName}</strong></td>
                                            <td className="bg-light-green"><strong>{x.IntentionAmount}{getCurrencySymbol(x.CurrencyID)}</strong></td>
                                            {/*
                                            <td>{ period[x.Period] }</td>
                                            <td>
                                                <strong>{(x.Period==2) &&  (moment((x.IntentionEndDate.toString().substr(0,10).replace('/-/g',''))).format("DD.MM.YYYY")) }</strong>
                                                {(x.Period==3) && (x.IntentionDayOfMonth + ' день месяца')}
                                                {(x.Period==4) && ( dayOfWeek[x.IntentionDayOfWeek] )}
                                            </td>
                                            */}
                                            { x.IntentionIssuer.UserID == this.userID && (
                                            <td>
                                                <button className="btn btn-outline-success w-80" onClick={() => this.onConvertToObligationClick(x.IntentionID)}>{getLangValue('ConvertToObligation')}</button>
                                                <button className="btn btn-outline-danger w-80" onClick={() => this.onDeclineClick(x.IntentionID)}>{getLangValue('Decline')}</button>
                                            </td>
                                            )}
                                            { x.IntentionIssuer.UserID != this.userID && (
                                                <td key={"btn-col" + index}></td>
                                            )}
                                        </tr>
                                    )}
                                )}
                                </tbody>                    
                            </table>
                        </div>
                        )}

                        { currentTab == DashboardTab.Obligations && (
                        <div id="obligations-container" className="table-with-actions">
                            <table>
                                    {obligationsHead} 
                                    <tbody> 
                                    {
                                        obligations.map( (x, index) => { return (
                                            <tr key={index}>
                                                <td><strong>{x.ObligationIssuerFirstName} {x.ObligationIssuerLastName}</strong></td>
                                                <td className="bg-light-green"><strong>{x.AmountTotal}{getCurrencySymbol(x.ObligationCurrency)}</strong></td>
                                            </tr>
                                        )}
                                    )}
                                    </tbody>                    
                                </table>
                        </div>
                        )}
                    </div>
                    )} 

                </div>
            </div>    
            );
    }
}
