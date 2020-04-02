import * as React from 'react';
import { Currency, Period, ObligationType, Application, Term } from '../../enums';
import { getLangValue, getUserID } from '../../global';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints-bootstrap4';
import { notify } from '../../components/Shared/Notifications';
import * as moment from 'moment';


interface Props {
    tag: any,
    afterSubmitHandler?: Function,
    className?: string
}

interface State {
    intentionAmount: number,
    intentionCurrencyID: number,
    loading: boolean
}

export class JoinForm extends React.Component<Props, State> {
    form: FormWithConstraints;
    userID: number;

    constructor(props: Props) {
        super(props);

        let tag = props.tag;

        this.userID = tag.Owner_UserID;

        this.state = { 
            intentionCurrencyID: tag.MinIntentionCurrencyID,
            intentionAmount: tag.MinIntentionAmount,
            loading: false
        };

        this.buttonClick = this.buttonClick.bind(this);
        this.onIntentionAmountChange = this.onIntentionAmountChange.bind(this);
    }

    onIntentionAmountChange = (evt:any) => {
        this.form.validateFields();

        this.setState({
            intentionAmount: evt.target.value,
        });
    }

    submitHandle = (evt: any) => {
        evt.preventDefault();
    }

    buttonClick = async (event:any) => {
        await this.form.validateFields();
        let formIsValid = this.form.isValid();
        if (formIsValid === true) {

            this.setState({loading: true});

            fetch("/api/Intention/Add",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                },
                method: "post",
                body:               
                    JSON.stringify({
                        "Period": Period.Monthly,
                        "IssuerUserID": getUserID(),
                        "HolderUserID": this.props.tag.DefaultIntentionOwner.UserID,
                        "TagID": this.props.tag.TagID,
                        "IntentionAmount": this.state.intentionAmount,
                        "IntentionTerm": Term.UserDefined,
                        "IntentionDurationMonths": 1,
                        "CurrencyID": this.state.intentionCurrencyID,
                        "ApplicationID": Application.OwnInitiative,
                        "IntentionStartDate": moment().format('YYYY-MM-DD hh:mm:ss'),
                        "IntentionEndDate": moment().add(1, 'month').format('YYYY-MM-DD hh:mm:ss'),

                        // default values
                        "ObligationTypeID": 1,
                        "ObligationKindID": 1,
                        "IntentionIsActive": true,
                        "IntentionDayOfWeek": 1,
                        "IntentionDayOfMonth": 1,
                        "IntentionMemo": ""
                    }), 
                credentials: 'include'
            })
            .then(res => {
                this.setState({loading: false});
                
                if (res.ok) {
                    // show intention created notification
                    notify.success(getLangValue("Notification.IntentionAddedToApplication"));

                    let callback = this.props.afterSubmitHandler;

                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    //TODO: show error notification

                }
            });
        }
    }

    render() {       
        const { intentionCurrencyID, intentionAmount, loading } = this.state;
        const { tag } = this.props;

        return  <FormWithConstraints className={this.props.className} onSubmit={this.submitHandle} ref={(formWithConstraints: any) => this.form = formWithConstraints} noValidate data-loading={loading}>
                    <input type="hidden" value={tag.Owner_UserID} name="UserID"></input>
                    <input type="hidden" value={tag.TagID} name="TagID"></input>
                    <input type="hidden" name="IntentionKindID" value={ObligationType.H2OUserHelp}></input>
                    
                    <div className="row mb-4">
                        <div className="col-md-5">
                            <label>{getLangValue("AppByDefault")}:</label>
                        </div>
                        <div className="col-md-7">
                            <select name="ApplicationID" disabled value={tag.ApplicationID} className="form-control">
                                <option value="1">{getLangValue("H2OFreeHelp")}</option>
                                <option value="2">{getLangValue("CashDeskOfMutualAid")}</option>
                                <option value="3">{getLangValue("SocialInsurance")}</option>
                                <option value="4">{getLangValue("OwnInitiative")}</option>                            
                            </select>
                        </div>
                    </div>  

                    <div className="row mb-4">
                        <div className="col-md-5 d-flex align-items-center">                
                            <label>{getLangValue("MinimumIntention")}:</label>
                        </div>                        
                        <div className="col-md-4">
                            <label>{tag.MinIntentionAmount}</label>
                        </div>
                        <div className="col-md-3" >
                            <select className="form-control" disabled name="MinIntentionCurrencyID" value={tag.MinIntentionCurrencyID}>
                                <option value={Currency.USD}>{getLangValue("Dollars")}</option>
                                <option value={Currency.UAH}>{getLangValue("Hryvnia")}</option>
                                <option disabled value={Currency.RUB} style={{color:'#ccc'}}>{getLangValue("Rubles")}</option>
                                <option disabled value={Currency.EUR} style={{color:'#ccc'}}>{getLangValue("Euro")}</option>
                            </select>
                       </div> 
                    </div> 
        
                    <div className="row mb-4">
                        <div className="col-md-5">
                            <label>{getLangValue("Periodicity")}:</label>
                        </div>
                        <div className="col-md-7">
                            <select className="form-control" disabled name="Period" value={tag.Period}>
                                <option value={Period.Undefined}>{getLangValue("Undefined")}</option>
                                <option value={Period.Once}>{getLangValue("Period.Once")}</option>
                                <option value={Period.Weekly}>{getLangValue("Period.Weekly")}</option>
                                <option value={Period.Monthly}>{getLangValue("Period.Monthly")}</option>
                            </select>
		                </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-5 d-flex align-items-center">
                            <label>{getLangValue("TakeIntention")}:</label>
                        </div>
                        <div className="col-md-4">
                            <input type="number" className="form-control" id="IntentionAmount" name="IntentionAmount" value={intentionAmount} min={tag.MinIntentionAmount} step='1' pattern="\d+(\,\d{2})?" onChange={this.onIntentionAmountChange} />
                        </div>
                        <div className="col-md-3">
                            <select className="form-control" name="IntentionCurrencyID" value={intentionCurrencyID} disabled>
                                <option value={Currency.USD}>{getLangValue("Dollars")}</option>
                                <option value={Currency.UAH}>{getLangValue("Hryvnia")}</option>
                                <option disabled value={Currency.RUB} style={{color:'#ccc'}}>{getLangValue("Rubles")}</option>
                                <option disabled value={Currency.EUR} style={{color:'#ccc'}}>{getLangValue("Euro")}</option>
                            </select>
                        </div>
                        <div className="offset-5 col-md-7">
                            <FieldFeedbacks for="IntentionAmount" stop="first">
                                <FieldFeedback when="rangeUnderflow" />
                            </FieldFeedbacks>
                        </div>
                    </div>

                    <button className="btn btn-success w-150" onClick={this.buttonClick}>{getLangValue("TakeIntentionJoin")}</button>

                </FormWithConstraints>
                      
    };
}
