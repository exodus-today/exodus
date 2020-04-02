import * as React from 'react';
import LoadingCup from './LoadingCup';
import MonthProgressBar from './MonthProgressBar';
import {getLang, getLangValue, getUserID, getApiKey, getCurrencySymbol} from './../../global';
import { AccessType, TagRole } from '../../enums';
import {AddIntentionToApplication} from '../Shared/AddIntentionToApplication';
const moment = require('moment');
import { notify } from '../Shared/Notifications';

interface Props {
    tagID: Number;
    tagRole: TagRole;
}

interface State {
    intentions: any[];
    ownIntentions: any[];
    obligations: any[];
    tag: any;
    completedCurMonth: number;
    expectedCurMonth: number;
    expectedNextMonth: number;
    intentionEdit: boolean;
    loading: boolean;
    loadingDetails: boolean;
    showIntentions: boolean;
    showObligations: boolean;
    indicatorDataReady: number;
}

export class H2OApplication extends React.Component<Props, State> {
    userID: any;
    tagRole: TagRole;

    constructor(props: Props) {
        super(props);
        this.state = { intentions: [], ownIntentions: [], obligations: [], tag: {}, completedCurMonth: 0, expectedCurMonth: 0, expectedNextMonth: 0    , intentionEdit: false, loading: false, loadingDetails: false, showIntentions: false, showObligations: false, indicatorDataReady: 0 };
        this.userID = getUserID();
        this.tagRole = this.props.tagRole;
        moment.locale(getLang());
        this.afterIntentionAdded = this.afterIntentionAdded.bind(this);
        this.afterIntentionUpdated = this.afterIntentionUpdated.bind(this);
        this.onDeclineClick = this.onDeclineClick.bind(this);
        this.onConvertToObligationClick = this.onConvertToObligationClick.bind(this);
        this.updateFundsInfo = this.updateFundsInfo.bind(this);
        this.onIntentionsInfoClick = this.onIntentionsInfoClick.bind(this);
        this.onObligationsInfoClick = this.onObligationsInfoClick.bind(this);
    }
    componentWillMount() {
        let that = this;

        // take tag information
        fetch('/api/Tag/Get_ByID?api_key='+ getApiKey() + '&TagID=' + this.props.tagID, {credentials: 'include'})
            .then(response=>response.json())
            .then(json=> {
                that.setState({tag: json.Data}, () => {
                    that.getFundsInfo();
                });
            });
    }
    getFundsInfo() {
        // fill current and next months intentions, funds and obligations
        let that = this;

        that.setState({loading: true});
        // take info about all intentions
        fetch('/api/Intention/ByUserIssuerID_ByTagID?api_key='+ getApiKey() + '&TagID=' + this.props.tagID + '&UserID=' + this.userID, {credentials: 'include'})
            .then(response=>response.json())    
            .then(json=> {
                that.setState({ownIntentions: json.Data, intentions: []});

                // check if user has intentions in current tag
                if (that.tagRole != TagRole.None) {
                    fetch('/api/Intention/Get_ByTagID?api_key='+ getApiKey() + '&TagID=' + this.props.tagID, {credentials: 'include'})
                        .then(response=>response.json())
                        .then(json=> {
                            that.setState({intentions: json.Data, loading: false});
                        });
                } else {
                    that.setState({loading: false});
                }
            });

        // take values for indicators
        let ownerUserID = this.state.tag.Owner_UserID;
        fetch('/api/AppH2O/Obligations_ByUserID_CurrentMonth?UserID=' + ownerUserID, {credentials: 'include', method: "post"})
            .then(response=>response.json())    
            .then(json=> {
                that.setState({completedCurMonth: json.Data, indicatorDataReady: that.state.indicatorDataReady+1});
            });

        fetch('/api/AppH2O/Intentions_ByUserID_CurrentMonth?UserID=' + ownerUserID, {credentials: 'include', method: "post"})
            .then(response=>response.json())    
            .then(json=> {
                that.setState({expectedCurMonth: json.Data, indicatorDataReady: that.state.indicatorDataReady+1});
            });

        let nextMonth = moment().add(1, 'month');
        fetch('/api/AppH2O/Intentions_ByUserID_n_Month?UserID=' + ownerUserID + '&year=' + nextMonth.year() + '&month=' + nextMonth.month(), {credentials: 'include', method: "post"})
            .then(response=>response.json())    
            .then(json=> {
                that.setState({expectedNextMonth: json.Data});
            });
    }
    afterIntentionAdded() {
        this.updateFundsInfo();
    }
    afterIntentionUpdated() {
        this.setState({intentionEdit: false});
        this.updateFundsInfo();
    }
    async updateFundsInfo() {
        this.tagRole = await window.updateTagRoleInfo();
        this.getFundsInfo();
    }
    onIntentionChangeClick(intentionID: number) {
        // open intention editor
        this.setState({intentionEdit: true});
    }
    onIntentionDeclineClick(intentionID: number) {
        fetch('/api/Intention/Delete?IntentionID=' + intentionID, {method: "POST", credentials: 'include'})
            .then(response=>response.json())
            .then(json=> {
                if (json.ErrorCode == -1) {
                    notify.success(getLangValue("Notification.IntentionDeclined"));
                    this.updateFundsInfo();
                }
            });
    }
    onIntentionsInfoClick() {
        // show intentions table
        this.setState({showIntentions: true, showObligations: false});
    }
    onObligationsInfoClick() {
        let that = this;

        // show intentions table
        this.setState({showIntentions: false, showObligations: true});

        if (this.state.obligations.length == 0) {
            this.setState({loadingDetails: true});

            fetch('/api/Obligation/Get_ByTagID?TagID=' + this.props.tagID, {credentials: 'include'})
                .then(response=>response.json())
                .then(json=> {
                    that.setState({obligations: json.Data, loadingDetails: false});
                });
        }
    }
    onDeclineClick(intentionID: number) {
        this.setState({loadingDetails: true});
        fetch('/api/Intention/Delete?IntentionID=' + intentionID, {method: "POST", credentials: 'include'})
            .then(response=>response.json())
            .then(json=> {
                if (json.ErrorCode == -1) {
                    this.updateFundsInfo();
                    notify.success(getLangValue("Notification.IntentionDeclined"));
                    this.setState({loadingDetails: false});
                }
            });
    }
    onConvertToObligationClick(intentionID: number) {
        this.setState({loadingDetails: true});
        fetch('/api/Intention/ToObligation?IntentionID=' + intentionID, {credentials: 'include'})
            .then(response=>response.json())
            .then(json=> {
                if (json.ErrorCode == -1) {
                    this.getFundsInfo();
                    notify.success(getLangValue("Notification.IntentionConvertedToObligation"));
                    this.setState({loadingDetails: false});
                }
            });
    }
    render() {
        let { tag, intentions, ownIntentions, obligations, completedCurMonth, expectedCurMonth, expectedNextMonth, intentionEdit, showIntentions, showObligations, loading, loadingDetails, indicatorDataReady } = this.state;
        let { tagRole } = this;
        let monthsLeftCaption = "";

        if (ownIntentions.length > 0) {
            let intention = ownIntentions[0];
            if (intention.Period == 2) {
                monthsLeftCaption = getLangValue("Once");
            } else if (intention.Period == 4) {
                let monthsLeft = intention.IntentionDurationMonths;
                if (getLang() == 'ru') {
                    monthsLeftCaption = getLangValue("Funds.Left") + ' ' + monthsLeft + ' ';

                    if (monthsLeft == 1) {
                        monthsLeftCaption += getLangValue("Date.Month");
                    } else if ((monthsLeft > 20 && monthsLeft % 10 > 1 && monthsLeft % 10 < 5) || monthsLeft < 5) {
                        monthsLeftCaption += getLangValue("Date.OfMonths2_4");
                    } else {
                        monthsLeftCaption += getLangValue("Date.OfMonths");
                    }
                } else {
                    // english language
                    monthsLeftCaption = monthsLeft + ' ';
                    if (monthsLeft == 1) {
                        monthsLeftCaption += getLangValue("Date.Month");
                    } else {
                        monthsLeftCaption += getLangValue("Date.OfMonths");
                    }
                    monthsLeftCaption = ' ' + getLangValue("Funds.Left");
                }
            }

            monthsLeftCaption += ' ' + getLangValue("Pretext.By") + ' ' + intention.IntentionAmount + getCurrencySymbol(intention.CurrencyID);
        }

        const intentionsHead =    
                <thead>
                    <tr>
                        <th scope="col" className="shorten-w-30">{getLangValue('User')}</th>
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

        return (
            <div>
                <div className="ex-list ex-grid_0-1-0" data-loading={indicatorDataReady != 2 || loading}>
                    <div className="ex-list__header">
                        <div className="ex-list__item">
                            <div className="ex-list__item-content">
                                <label className="month-name">{moment().format("MMMM YYYY")}</label> ({getLangValue("Date.CurrentMonth")})
                            </div> 
                        </div>
                    </div>
                    <div className="ex-list__body">
                        {/*
                        <div style={{textAlign: 'center'}}>
                            <button className="btn btn-outline-success w-80"
                            style={{background: 'rgb(149, 198, 30) none repeat scroll 0% 0%', color:'white'}}
                            >Подтвердить намерение</button>
                        </div>
                        */}

                        { typeof tag.DefaultIntentionOwner !== 'undefined' && indicatorDataReady == 2 && (
                            <LoadingCup 
                                className="current-month-progress" 
                                currency="$" 
                                showLegend={true}
                                expected={expectedCurMonth} completed={completedCurMonth} full={tag.DefaultIntentionOwner.HelpDetail.UserHelpAmountRequired}
                                showCompletedIcon={tagRole != TagRole.None}
                                showExpectedIcon={tagRole != TagRole.None}
                                clickExpectedHandler={this.onIntentionsInfoClick}
                                clickCompletedHandler={this.onObligationsInfoClick}
                                 />

                        )}

                            {/*
                            <div className="circular-progress-bars" style={{height:'150px'}}>
                                <CircularProgressbar
                                    percentage={30}
                                    text={`${30} USD`}
                                    counterClockwise={true}
                                    strokeWidth={50}
                                    initialAnimation={true}
                                    styles={{
                                        background: {
                                            //fill: "#95c61e",
                                        },
                                        path: { stroke: '#95c61e', strokeLinecap: 'butt' },
                                        text: { fill: 'transparent' },
                                    }}
                                />
                                <CircularProgressbar
                                    percentage={70}
                                    text={`${70} USD`}
                                    counterClockwise={true}
                                    strokeWidth={50}
                                    initialAnimation={true}
                                    styles={{
                                        path: { stroke: '#ffc517', strokeLinecap: 'butt' },
                                        text: { fill: '#fff' },
                                    }}
                                />
                                <CircularProgressbar
                                    percentage={30}
                                    text={`${30} USD`}
                                    counterClockwise={false}
                                    strokeWidth={50}
                                    initialAnimation={true}
                                    styles={{
                                        path: { stroke: '#fd6721', strokeLinecap: 'butt' },
                                        text: { fill: '#fff' },
                                    }}
                                />
                            </div>

                            <div className="meter-progress-bars" style={{height:'70px'}}>
                                <meter value="50" max="100">Сумма сборов</meter>
                                <meter value="20" max="100">Сумма сборов</meter>
                                <meter value="10" max="100">Сумма сборов</meter>
                            </div>
                            
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', color:'#222'}}>
                                <div style={{textAlign: 'center', width: '250px'}}><small>Собрано : 1000 $</small></div>
                                <div style={{textAlign: 'center', width: '250px'}}><small>Осталось: 98999 $</small></div>
                            </div>
                            */}
                    </div>

                    <div className="ex-list__header">
                        <div className="ex-list__item">
                            <div className="ex-list__item-content">
                                <label className="month-name">{moment().add(1, 'month').format('MMMM YYYY')}</label> ({getLangValue("Date.NextMonth")})
                            </div> 
                        </div>
                    </div>

                    { typeof tag.DefaultIntentionOwner !== 'undefined' && (
                    <div className="ex-list__body">
                        <MonthProgressBar className="next-month-progress" currency="$" completed={expectedNextMonth} full={tag.DefaultIntentionOwner.HelpDetail.UserHelpAmountRequired} />
                    </div>
                    )}

                    {tag.AccessType == AccessType.Public && ownIntentions.length == 0 && tagRole == TagRole.None && (
                        <AddIntentionToApplication userID={this.userID} tag={tag} onIntentionAdded={this.afterIntentionAdded} />
                    )}

                    {ownIntentions.length > 0 && intentionEdit == false && (
                        <div>
                            <div className="ex-list__header">
                                <div className="ex-list__item">
                                    <div className="ex-list__item-content">
                                        <label>{getLangValue("YouTakePart")}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="ex-list__body">
                                <div className="h2o-user-intention">
                                    <span>{monthsLeftCaption}</span>
                                    <button className="btn btn-outline-success w-80" onClick={() => this.onIntentionChangeClick(ownIntentions[0].IntentionID)}>{getLangValue('Change')}</button>
                                    <button className="btn btn-outline-danger w-80" onClick={() => this.onIntentionDeclineClick(ownIntentions[0].IntentionID)}>{getLangValue('Decline')}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {ownIntentions.length > 0 && intentionEdit == true && (
                        <div>
                            <div className="ex-list__header">
                                <div className="ex-list__item">
                                    <div className="ex-list__item-content">
                                        <label>{getLangValue("YouTakePart")}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="ex-list__body">
                                <AddIntentionToApplication 
                                    userID={this.userID} 
                                    tag={tag} 
                                    onIntentionAdded={this.afterIntentionUpdated} 
                                    editMode={true}
                                    intentionID={ownIntentions[0].IntentionID}
                                    intentionAmount={ownIntentions[0].IntentionAmount} 
                                    intentionCurrencyID={ownIntentions[0].CurrencyID} 
                                    intentionTerm={ownIntentions[0].IntentionTerm}
                                    intentionDurationMonths={ownIntentions[0].IntentionDurationMonths} />
                            </div>
                        </div>
                    )}
                </div>
                
                <div id="ex-route-3" className="ex-grid_0-0-1" data-loading={loadingDetails}>
                    <div className="ex-grid_0-0-1">
                        {showIntentions && (
                            <div className="mt-4 table-with-actions" id="intentions-container">
                                <table>
                                    {intentionsHead} 
                                    <tbody> 
                                    {
                                        intentions.map( (x, index) => { return (
                                            <tr key={index}>
                                                <td><strong>{x.IntentionIssuer.UserFullName}</strong></td>
                                                <td className="bg-light-green"><strong>{x.IntentionAmount}{getCurrencySymbol(x.CurrencyID)}</strong></td>
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

                        {showObligations && (
                            <div className="mt-4 table-with-actions" id="obligations-container">
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
                </div>

            </div>);
    }
}
