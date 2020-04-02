import * as React from 'react';
import { Currency, Period, Term, Application } from '../../enums';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints-bootstrap4';
import * as moment from 'moment';
import {getLangValue, getApiKey, getCurrencySymbol} from '../../global';
import { notify } from '../../components/Shared/Notifications';


interface AddIntentionProps  {
    userID: Number;
    tag: any;
    onIntentionAdded: Function;
    
    editMode?: boolean;
    intentionID?: number;
    intentionAmount?: number;
    intentionCurrencyID?: number;
    intentionTerm?: number;
    intentionDurationMonths?: number;
    unlimitMaxValue?: boolean;
}

interface AddIntentionState  {
    intentionAmount: number,
    intentionCurrencyID: number,
    intentionTerm: number,
    intentionDurationMonths: number,
    loading: boolean
}


export class AddIntentionToApplication extends React.Component<AddIntentionProps, AddIntentionState> {
    form: FormWithConstraints;

    constructor(props:any) {      
        super(props);
        let tag = props.tag,
            intentionAmount = tag.MinimumIntention,
            intentionCurrencyID = tag.MinIntentionCurrencyID,
            intentionTerm = 0,
            intentionDurationMonths = 12;

        if (props.editMode == true) {
            intentionAmount = props.intentionAmount > 0 ? props.intentionAmount : intentionAmount;
            intentionCurrencyID = props.intentionAmount ? props.intentionCurrencyID : intentionCurrencyID;
            intentionTerm = props.intentionTerm ? props.intentionTerm : intentionTerm;
            intentionDurationMonths = props.intentionDurationMonths ? props.intentionDurationMonths : intentionDurationMonths;
        }

        this.state = { loading: false, intentionAmount: intentionAmount, intentionCurrencyID: intentionCurrencyID, intentionTerm: intentionTerm, intentionDurationMonths: intentionDurationMonths };
    }

    submitHandle = (evt: any) => {
        evt.preventDefault();
    }
    
    takeIntentionHandler = async (event: any) => {
        await this.form.validateFields();
        let formIsValid = this.form.isValid();
        if (formIsValid === true) {
            this.setState({loading: true});
            let tag = this.props.tag,
                intentionTerm = this.state.intentionTerm,
                intentionDurationMonths = this.state.intentionDurationMonths;

            if (this.state.intentionTerm == 0) {
                intentionTerm = Term.UserDefined;
                intentionDurationMonths = 1;
            }

            let data:any = {
                "Period": Period.Monthly,
                "IssuerUserID": this.props.userID,
                "HolderUserID": tag.DefaultIntentionOwner.UserID,
                "TagID": tag.TagID,
                "IntentionAmount": this.state.intentionAmount,
                "IntentionTerm": intentionTerm,
                "IntentionDurationMonths": intentionDurationMonths,
                "CurrencyID": this.state.intentionCurrencyID,
                "ApplicationID": Application.OwnInitiative,
                "IntentionStartDate": moment().format('YYYY-MM-DD hh:mm:ss'),
                "IntentionEndDate": moment().add(intentionDurationMonths, 'month').format('YYYY-MM-DD hh:mm:ss'),

                // default values
                "ObligationTypeID": 1,
                "ObligationKindID": 1,
                "IntentionIsActive": true,
                "IntentionDayOfWeek": 1,
                "IntentionDayOfMonth": 1,
                "IntentionMemo": ""
            };

            let method = 'Add',
                successMessage = getLangValue("Notification.IntentionAddedToApplication");

            if (this.props.editMode == true) {
                method = 'Update';
                data.intentionID = this.props.intentionID;
            }            

            fetch("/api/Intention/" + method,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: "post",
                body:               
                    JSON.stringify(data), 
                credentials: 'include'
            })
            .then(res => {
                if (res.ok) {
                    // show intention created notification
                    notify.success(successMessage);
                    this.setState({loading: false});
                    this.props.onIntentionAdded();
                } else {
                    //TODO: show error notification

                }
            });
        }        
    }

    render() {
        let { intentionAmount, intentionCurrencyID, intentionTerm, intentionDurationMonths, loading } = this.state;
        let { tag, unlimitMaxValue } = this.props;

        return (
            <div className="ex-panel__content mt-3" data-loading={loading}>
            <FormWithConstraints className="create-intention-form" onSubmit={this.submitHandle} ref={(formWithConstraints: any) => this.form = formWithConstraints} noValidate>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h3>{getLangValue("TakePartInHelp")}</h3>
                    </div>
                    {tag.MinimumIntention && (
                    <div className="col-md-12">
                        <p>{getLangValue("MinimumIntention")}: {tag.MinimumIntention} {getCurrencySymbol(tag.MinIntentionCurrencyID)}</p>
                    </div>
                    )}
                    <div className="col-md-12">
                        <input type="number" className="form-control intention-amount" name="IntentionAmount" value={intentionAmount} min={tag.MinimumIntention} max={tag.TotalAmount && unlimitMaxValue != true ? tag.TotalAmount : Infinity} step='1.00' pattern="\d+(\.\d{2})?" onChange={event => this.setState({ intentionAmount: parseInt(event.target.value) })} />

                        <select className="form-control intention-currency" name="IntentionCurrencyID" value={intentionCurrencyID} onChange={event => this.setState({ intentionCurrencyID: parseInt(event.target.value) })}>
                            <option value={Currency.USD}>{getLangValue('Dollars')}</option>
                            <option disabled value={Currency.UAH} style={{color:'#ccc'}}>{getLangValue('Hryvnia')}</option>
                            <option disabled value={Currency.RUB} style={{color:'#ccc'}}>{getLangValue('Rubles')}</option>
                            <option disabled value={Currency.EUR} style={{color:'#ccc'}}>{getLangValue('Euro')}</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <FieldFeedbacks for="IntentionAmount" stop="first">
                            <FieldFeedback when="rangeUnderflow" />
                        </FieldFeedbacks>
                    </div>
                    <div className="col-md-12 mt-3">
                        <label className="custom-control custom-radio" >
                            <input type="radio" name="IntentionTerm" className="custom-control-input"  value="0" checked={intentionTerm == 0} onChange={event => this.setState({ intentionTerm: parseInt(event.target.value) })} />
                            <span className="custom-control-indicator"></span>
                            <span className="custom-control-description">{getLangValue('Period.Once')}</span>
                        </label> 
                        <label className="custom-control custom-radio" >
                            <input type="radio" name="IntentionTerm" className="custom-control-input"  value={Term.Indefinitely} checked={intentionTerm == Term.Indefinitely} onChange={event => this.setState({ intentionTerm: parseInt(event.target.value) })} />
                            <span className="custom-control-indicator"></span>
                            <span className="custom-control-description">{getLangValue('Indefinitely')}</span>
                        </label>                        
                        <label className="custom-control custom-radio">
                            <input type="radio" name="IntentionTerm" className="custom-control-input"  value={Term.UserDefined} checked={intentionTerm == Term.UserDefined} onChange={event => this.setState({ intentionTerm: parseInt(event.target.value) })} />
                            <span className="custom-control-indicator"></span>
                            <span className="custom-control-description">{getLangValue('SetPeriod')}</span>
                        </label>
                    </div>
                    {intentionTerm == Term.UserDefined && (
                    <div className="col-md-12 mt-3">
                        <input type="number" className="form-control intention-period" name="IntentionDurationMonths" value={intentionDurationMonths} min={1} step='1.00' pattern="\d+?" onChange={event => this.setState({ intentionDurationMonths: parseInt(event.target.value) })} />
                        <label>&nbsp;{getLangValue("Date.OfMonths")}</label>
                        <FieldFeedbacks for="IntentionDurationMonths" stop="first">
                            <FieldFeedback when="rangeUnderflow" />
                        </FieldFeedbacks>
                    </div>
                    )}
                    <div className="col-md-5 mt-4">
                        <button className="btn btn-outline-primary w-100" onClick={this.takeIntentionHandler}>{getLangValue('TakeIntention')}</button><br/>
                    </div>
                </div>
            </FormWithConstraints>
        </div>
        )
    }
}

export default AddIntentionToApplication;