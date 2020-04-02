import * as React from 'react';
import { getLangValue, getUserID, getApiKey } from '../../global.js';
import { Currency } from './../../enums'
import { notify } from '../Shared/Notifications';
import moment = require("moment");
import DatePicker from 'react-datepicker';

function StatusNumreic(status:string)
    {                  
        switch(status) {
            case 'I_AM_OK': return 1;
            case 'I_AM_PARTIALLY_OK': return 2;
            case 'I_NEED_HELP': return 3;
            default:return 1;
          }
    }

function CurrencyNumreic(currency:string)
{                  
    switch(currency) {
        case 'USD': return 1;
        case 'UAH': return 2;
        case 'RUB': return 3;
        case 'EUR': return 4;
        default:return 1;
      }
}

interface Props {
    UserStatus:string
    UserHelpDetails:string
    UserHelpAmountRequired:number
    UserHelpAmountCurrency:number
    UserHelpPeriod:number
}

interface State {
    Status: string
    UserHelpDetails:string
    StartDate:any
    Deadline:any

    AmountEmergencyCurrency:number
    AmountRegularCurrency:number
    HelpSummRegular:number
    HelpSummEmergency:number
    UserHelpPeriod:number
}

export class SetStatus extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { Status: this.props.UserStatus, 
                       UserHelpDetails: this.props.UserHelpDetails,
                       AmountEmergencyCurrency:CurrencyNumreic(this.props.UserHelpAmountCurrency.toString()),
                       AmountRegularCurrency: CurrencyNumreic(this.props.UserHelpAmountCurrency.toString()),
                       HelpSummRegular:this.props.UserHelpAmountRequired,
                       HelpSummEmergency:this.props.UserHelpAmountRequired,
                       UserHelpPeriod:this.props.UserHelpPeriod,
                       StartDate:moment().add(7, 'days'),                       
                       Deadline:moment().add(7, 'days')//moment(new Date())
                     }        
        this.handleClick = this.handleClick.bind(this);      
    }

    handleChangeDate=(e:any)=>{
        this.setState({
            StartDate: e,
            Deadline: e.format("YYYY-MM-DD HH:mm:ss")
        })
    }
    // Желтый статус
    setRegSum=(e:any)=>{
        this.setState({HelpSummRegular:e.target.value, HelpSummEmergency:0})        
    }
    // Красный статус
    setEmergSum=(e:any)=>{
        this.setState({HelpSummEmergency:e.target.value, HelpSummRegular:0})
    }    
    handleClick=(e:any)=>{     

        // console.log('['+Math.trunc(this.state.HelpSummRegular)+']')
        
         if (StatusNumreic(this.state.Status)==2) 
            {
            if ( this.state.HelpSummRegular >= 1 ) {}
            else
                {
                    notify.error(getLangValue("Notification.TooSmallAmount"));
                    return;
                }
           }
        if (StatusNumreic(this.state.Status)==3)
        {
            if (this.state.HelpSummEmergency >= 1) {}
            else
            {
                notify.error(getLangValue("Notification.TooSmallAmount"));
                return;
            }
        }
        
        document.body.style.cursor = "wait";
        fetch("/api/User/Update_UserStatus",
        {
            
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
            },
            method: "post",
            body:               
            JSON.stringify({ 
                "UserStatusMessage": this.state.UserHelpDetails,
                "UserCurrentStatus": StatusNumreic(this.state.Status),
                "AmountEmergencyCurrency": this.state.AmountEmergencyCurrency,
                "AmountRegularCurrency": this.state.AmountRegularCurrency,
                "HelpSummRegular": this.state.HelpSummRegular.toString().replace(/,/g, "."),
                "HelpSummEmergency": this.state.HelpSummEmergency.toString().replace(/,/g, "."),
                "UserHelpPeriod": this.state.UserHelpPeriod,
                "UserID": getUserID(),
                "Deadline":this.state.Deadline               
             }), 
            credentials: 'include',        
        })
        .then(res => {
            if (res.ok) {               
                        let x = document.getElementById('indicator');
                        if (x!==null)
                        {
                            if (this.state.Status=='I_AM_OK') 
                                x.className = "ex-header__person-status ex-header__person-status_success";
                            if (this.state.Status=='I_AM_PARTIALLY_OK') 
                                x.className = "ex-header__person-status ex-header__person-status_warning";
                            if (this.state.Status=='I_NEED_HELP') 
                                x.className = "ex-header__person-status ex-header__person-status_danger";
                        }
                        x = document.getElementById('indicatorNav');
                        if (x!==null)
                        {
                            if (this.state.Status=='I_AM_OK') 
                                x.className = "icons-status text-success ex-navigation__icon";
                            if (this.state.Status=='I_AM_PARTIALLY_OK') 
                                x.className = "icons-status text-warning ex-navigation__icon";
                            if (this.state.Status=='I_NEED_HELP') 
                                x.className = "icons-status text-danger ex-navigation__icon";
                        }
            notify.success(getLangValue("Notification.SuccessfullySetStatus"));                        
                   
            } else {
                notify.error(getLangValue("Error"));
            }
            document.body.style.cursor = "default";
        })
    }

    render() {
        return (
<form action=""   
      method="POST" 
      data-update="">
        <div className="ex-status-form">
            {/* Зеленый статус */}
            <label className="row ex-status-form__status">
            <input type="radio" 
                    name="Status" 
                    checked={this.state.Status=='I_AM_OK'}
                    onChange={() => {this.setState({ Status:'I_AM_OK' })}}
            />
            <div className="col-6 text-success">
                <i></i>
                <div className="ex-status-form__name">
                    {getLangValue('IAmOk')}
                </div>
            </div>
            <div className="col-6 d-flex align-items-center">
                <div className="btn btn-outline-success w-100" onClick={this.handleClick}>{getLangValue('WithNoHelp')}</div>
            </div>
            </label>
            <hr/>
             {/* Желтый статус */}
            <label className="row ex-status-form__status">
            <input type="radio" id="user-current-status-regular-help" name="Status" 
                    checked={this.state.Status=='I_AM_PARTIALLY_OK'}
                    onChange={() => {this.setState({ Status:'I_AM_PARTIALLY_OK' })}}
                    value="I_AM_PARTIALLY_OK"/>
            <div className="col-xl-4 mb-4 text-warning">
            <i></i>
            <div className="ex-status-form__name">{getLangValue('RegularHelp')}</div>
            </div>           
                { // Регулярная помощь Сумма
                (this.state.Status=='I_AM_PARTIALLY_OK') &&  
                    ( <div className="col-xl-8 ex-status-form__extra-fields">
                    <div className="row mb-4" >
                        <div className="col-4 d-flex align-items-center">{getLangValue('Summ')}</div>
                        <div className="col-4">
                            <input type="text" 
                                name="Regular_Sum" 
                                className="form-control"                            
                                defaultValue={this.state.HelpSummRegular.toString()}                                
                                onChange={this.setRegSum}/>
                        </div>
                        <div className="col-4">
                            <select name="Regular_Currency" 
                                    className="form-control"
                                    value={this.state.AmountRegularCurrency}
                                    onChange={e => this.setState({ AmountRegularCurrency: parseInt(e.target.value)}) }                                
                                    >                            
                                <option value={Currency.USD}>{getLangValue('Currency.Symbol.USD')}</option>
                                <option value={Currency.EUR}>{getLangValue('Currency.Symbol.EUR')}</option>
                                <option value={Currency.UAH}>{getLangValue('Currency.Symbol.GRN')}</option>
                                <option value={Currency.RUB}>{getLangValue('Currency.Symbol.RUB')}</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4 d-flex align-items-center">{getLangValue('Period')}</div>
                            <div className="col-8">
                                <select className="form-control" 
                                        name="HelpPeriod" 
                                        onChange={e => this.setState({ UserHelpPeriod: parseInt(e.target.value)})} >
                                        <option value="4">{getLangValue('Monthly')}</option>
                                        {/* <option value="3">{getLangValue('Weekly')}</option> */}
                                </select>
                        </div>
                    </div>
                    </div>
                    )
                }
            </label>        
            <hr/>
             {/* Красный статус */}
            <label className="row ex-status-form__status">
            <input type="radio" 
                    name="Status"
                    value="I_NEED_HELP" checked={this.state.Status=='I_NEED_HELP'} 
                    onChange={() => {this.setState({ Status:'I_NEED_HELP', UserHelpPeriod:2 })}} 
            />
            <div className="col-xl-4 mb-4 text-danger">
                <i></i>
            <div className="ex-status-form__name">{getLangValue('UrgentHelp')}</div>
            </div>
                { // Скрытый Красный
                (this.state.Status=='I_NEED_HELP') &&  
                ( <div className="col-xl-8 ex-status-form__extra-fields">
                <div className="row mb-4" >
                    <div className="col-4 d-flex align-items-center">{getLangValue('Summ')}</div>
                    <div className="col-4">
                        <input type="text" 
                                name="Emergency_Sum" 
                                className="form-control"                            
                                defaultValue={this.state.HelpSummEmergency.toString()}
                                onChange={this.setEmergSum}
                        />
                    </div>
                    <div className="col-4">
                        <select name="Emergency_Currency" 
                                className="form-control"  
                                onChange={e => this.setState({ AmountEmergencyCurrency: parseInt(e.target.value)})}
                                value={this.state.AmountEmergencyCurrency}>                                                   
                            <option value={Currency.USD}>{getLangValue('Currency.Symbol.USD')}</option>
                            <option value={Currency.EUR}>{getLangValue('Currency.Symbol.EUR')}</option>
                            <option value={Currency.UAH}>{getLangValue('Currency.Symbol.GRN')}</option>
                            <option value={Currency.RUB}>{getLangValue('Currency.Symbol.RUB')}</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 d-flex align-items-center">{getLangValue('Description')}</div>
                    <div className="col-8">
                        <textarea className="form-control"
                                    onChange={e => this.setState({ UserHelpDetails: e.target.value})}
                                    defaultValue={this.state.UserHelpDetails}
                                    name="Message"></textarea>
                    </div>
                </div>

                <div className="row my-4" >
                    <div className="col-4 d-flex align-items-center">{getLangValue('Deadline')}:</div>
                    <div className="col-4">

                    <DatePicker className="form-control"
                                autoComplete="off"
                                required
                                name="Deadline" 
                                dateFormat="DD.MM.YYYY"
                                onChange={this.handleChangeDate}                                
                                selected={this.state.StartDate}
                                minDate= {moment()}
                            />
                    </div>
                </div>
                </div>)
                }
            </label>
            <hr/>

            <div className="text-right">
                <div className="btn btn-outline-success" onClick={this.handleClick}>
                    {getLangValue('Save')}
                </div>                
            </div>
    </div>
</form>
)}}