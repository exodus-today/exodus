import * as React from 'react';
import { Currency, PaymentPeriod, Period, Application, AccessType } from '../../enums';
import DatePicker from 'react-datepicker';
import moment = require("moment");
import { getLangValue, loadMainMenu, getUserID, getUserName } from '../../global.js';
import { FormWithConstraints, FieldFeedbacks, FieldFeedback } from 'react-form-with-constraints-bootstrap4';
import { UserSelect } from '../User/UserSelect';

interface Props {
    UserID: number;
    lang:string;
    UserDef: string;
}

export class TagCreate extends React.Component<Props, any> {
    form: FormWithConstraints;

    constructor(props: Props) {
        super(props);
        this.state = {      PaymPer: PaymentPeriod.Regular, 
                            WhenPaym: Period.Monthly,
                            TagOwnerID:this.props.UserID,
                            StartDate:null,
                            Otpravlen:false,
                            
                       NameEng:'',
                       NameRus:'',
                       Description:'',
                       AccessType:1,
                       ApplicationID:1,
                       EndDate:moment(new Date()),
                       Period:Period.Monthly,
                       DayOfMonth:1,
                       DayOfWeek:null,
                       TotalAmount:0.00,
                       TotalAmountCurrencyID:1,
                       MinIntentionAmount:0.00,
                       MinIntentionCurrencyID:1,
                       DefaultIntentionOwnerID:getUserID(),
                       fio:getUserName(),
                       ShowUsers:false
                    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleApplicationChange = this.handleApplicationChange.bind(this);    
    this.handleTotalAmountChange = this.handleTotalAmountChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    }

    submitHandle=(evt:any)=>{
        evt.preventDefault();
    }
    validateEngKeyPress=(evt:any)=>{
        // deny cyrillic input
        const regExp = /[а-яА-Я]+/g;
        if (regExp.test(evt.key)) {
            evt.preventDefault();
        }
    }
    validateRusKeyPress=(evt:any)=>{
        // deny cyrillic input
        const regExp = /[a-zA-Z]+/g;
        if (regExp.test(evt.key)) {
            evt.preventDefault();
        }
    }
    validateNumeral=(evt:any)=>{
        // deny cyrillic input 
        const regExp = /[^\d\,+$]+/g;
        if (regExp.test(evt.key)) {
            evt.preventDefault();
        }
    }

    validateDateKeyDown=(evt:any)=>{
        // deny all except date symbols
        const regExp = /[0-9\.]+/g;
        if (regExp.test(evt.key) === false) {
            evt.preventDefault();
        }
    }
    handleChange=(evt:any)=>{
        this.form.validateFields(evt.target);

        this.setState({
            [evt.target.name]:evt.target.value,
        });
    }
    handleNameChange=(evt:any)=>{
        let that = this;
        let val = evt.target.value.trim();

        this.setState({
            [evt.target.name]:val,
        }, function () {
            that.form.validateFields("NameEng");
            that.form.validateFields("NameRus");
        });
    }
    handleChangeDate=(e:any)=>{
        let that = this;

        this.setState({
            StartDate: e,
            EndDate: e.format("YYYY-MM-DD HH:mm:ss"),
        }, function () {
            that.form.validateFields("EndDate");
        });
    }
    // Component isn't firing onChange when manually keying in a time
    onChangeRaw= (e:any) => {
        let momentE = moment(e.target.value, "DD.MM.YYYY");
        if (momentE.isValid()) {
            this.handleChangeDate(momentE);
        } else {
            this.form.validateFields(e.target);
        }
    }
    handleApplicationChange=(evt:any)=>{
        let that = this;       

        if (evt.target.value==1) {this.setState({PaymPer:PaymentPeriod.Regular,
                                                WhenPaym:Period.Monthly,
                                                Period:3})}
        if (evt.target.value==4) {this.setState({PaymPer:PaymentPeriod.Once,
                                                WhenPaym:Period.Monthly,
                                                Period:2})}

        //alert(evt.target.value)

        this.setState({
            [evt.target.name]:evt.target.value,
        }, function () {
            that.form.validateFields("MinIntentionAmount");
        });
    }
    handleTotalAmountChange=(evt:any)=>{
        let that = this;

        this.setState({
            [evt.target.name]:evt.target.value,
        }, function () {
            that.form.validateFields("MinIntentionAmount");
        });
    }

    showUser=()=>{       
        if (this.state.ShowUsers) this.setState({DefaultIntentionOwnerID:getUserID(), fio:getUserName()}); 
        this.setState({ShowUsers:!this.state.ShowUsers}); 

     }

    buttonClick = async (event:any) => {
        // alert ("Отправляю post запрос на /api/Tag/Add \n"+
        //        "TagOwnerID"+this.state.TagOwnerID+'\n'+
        //        'NameEng:'+this.state.NameEng+'\n'+
        //        'NameRus:'+this.state.NameRus+'\n'+
        //        'Description:'+this.state.Description+'\n'+
        //        'AccessType:'+this.state.AccessType+'\n'+
        //        'Period:'+this.state.Period+'\n'+
        //        'ApplicationID:'+this.state.ApplicationID+'\n'+
        //        'EndDate:'+this.state.EndDate+'\n'+
        //        'DayOfMonth:'+this.state.DayOfMonth+'\n'+
        //        'DayOfWeek:'+this.state.DayOfWeek+'\n'+
        //        'TotalAmount:'+this.state.TotalAmount+'\n'+
        //        'TotalAmountCurrencyID:'+this.state.TotalAmountCurrencyID+'\n'+
        //        'MinIntentionAmount:'+this.state.MinIntentionAmount+'\n'+
        //        'MinIntentionCurrencyID:'+this.state.MinIntentionCurrencyID+'\n'+
        //        'DefaultIntentionOwnerID:'+this.state.DefaultIntentionOwnerID
        //        );

        await this.form.validateFields();
        const formIsValid = this.form.isValid();
        if (formIsValid === true && this.state.Otpravlen === false) {
            this.setState({Otpravlen:true});

            fetch("/api/Tag/Add",
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
                },
                method: "post",
                body:               
                JSON.stringify({ "TagOwnerID": this.state.TagOwnerID,
                                "NameEng": this.state.NameEng,
                                "NameRus": this.state.NameRus,
                                "Description": this.state.Description,
                                "AccessType": this.state.AccessType,                  
                                "Period":this.state.Period,
                                "ApplicationID": this.state.ApplicationID,
                                "EndDate":this.state.EndDate,
                                "DayOfMonth":this.state.DayOfMonth,
                                "DayOfWeek":this.state.DayOfWeek,
                                "TotalAmount":this.state.TotalAmount,
                                "TotalAmountCurrencyID":this.state.TotalAmountCurrencyID,
                                "MinIntentionAmount":this.state.MinIntentionAmount,
                                "MinIntentionCurrencyID":this.state.MinIntentionCurrencyID,
                                "DefaultIntentionOwnerID": this.state.DefaultIntentionOwnerID
                }), 
                credentials: 'include',        
            })
            .then(res => {
                if (res.ok) {
                    location.reload()
                    // server responses not valid json => we don't use .json function
                    // res.json()
                } else {
                    //TODO: show error notification
                }
            });
        }        
    }

    render() {     

        const { PaymPer, WhenPaym, ApplicationID  } = this.state;
        return  (
            <FormWithConstraints onSubmit={this.submitHandle} ref={(formWithConstraints: any) => this.form = formWithConstraints} noValidate>
                <input name="TagOwnerID" type="hidden" value={this.props.UserID}></input>
                <div className="row mb-4">
                    <div className="col-md-5">
                        <label>{getLangValue('TagAvailability')}:</label>
                    </div>
                    <div className="col-md-7">
                        <label className="custom-control custom-radio" >
                            <input type="radio" 
                                    name="AccessType" 
                                    className="custom-control-input"  
                                    value={AccessType.Private}                                     
                                    onChange={this.handleChange} 
                                    />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">{getLangValue('Private')}</span>
                        </label>                        
                        <label className="custom-control custom-radio">
                            <input type="radio" 
                                    name="AccessType" 
                                    className="custom-control-input" 
                                    value={AccessType.Public} 
                                    onChange={this.handleChange}
                                    defaultChecked
                                    />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">{getLangValue('Public')}</span>
                        </label>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-5">
                        <label>{getLangValue('TagName')}: <small>({getLangValue('InEnglish')})</small></label>
                    </div>
                    <div className="col-md-7">
                        <input type="text" className="form-control" name="NameEng" onChange={this.handleNameChange} onKeyPress={this.validateEngKeyPress} />
                        <FieldFeedbacks for="NameEng" stop="first">
                            <FieldFeedback when={value => value.trim() == "" && this.state.NameRus.trim() == ""}>{getLangValue('Validation.OneOfTagNamesIsRequired')}</FieldFeedback>                              
                        </FieldFeedbacks>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-5">
                        <label>{getLangValue('TagName')}: <small>({getLangValue('InRussian')})</small></label>
                    </div>
                    <div className="col-md-7">
                        <input type="text" className="form-control" name="NameRus" onChange={this.handleNameChange} />
                        <FieldFeedbacks for="NameRus" stop="first">
                            <FieldFeedback when={value => value.trim() == "" && this.state.NameEng.trim() == ""}>{getLangValue('Validation.OneOfTagNamesIsRequired')}</FieldFeedback>                                
                        </FieldFeedbacks>
                    </div>
                </div>            

                <div className="row mb-4">
                    <div className="col-md-5">
                        <label>{getLangValue('DefaultApplication')}:</label>
                    </div>
                    <div className="col-md-7">
                    <select name="ApplicationID" 
                        value={this.state.ApplicationID} 
                        className="form-control" 
                        onChange={this.handleApplicationChange} 
                        style={{backgroundColor:'#e5fcb9', textShadow: '0 0 0 #4f4f4f'}}>
                        <option value={Application.H2O}>{getLangValue('H2OFreeHelp')}</option>
                        {/*<option value="2">{slovar.cashierMutualAid}</option>
                        <option value="3">Социальное страхование</option>*/}
                        <option value={Application.OwnInitiative}>{getLangValue('OwnInitiative')}</option>
                    </select>
                    </div>
                </div>                      

                { // H20 - payment period
                ApplicationID==1 && (
                <div className="row mb-4">
                    <div className="col-md-5">
                        <label>{getLangValue('Periodicity')}:</label>
                    </div>
                    <div className="col-md-7">                       
                        <label className="custom-control custom-radio">
                        <input type="radio" name="PaymPer" className="custom-control-input"  
                            defaultChecked
                            value={PaymentPeriod.Regular} 
                            onChange={e => 
                                {
                                this.setState({ PaymPer: parseInt(e.target.value), 
                                Period: Period.Monthly })
                                //alert();
                                }} 
                        />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">{getLangValue('Regular')}</span>
                    </label>
                    </div>
                </div>)
                }

                { // Own Initiative 
                ApplicationID==4 && (
                <div className="row mb-4">
                    <div className="col-md-5">
                        <label>{getLangValue('Periodicity')}:</label>
                    </div>
                    <div className="col-md-7">
                        <label className="custom-control custom-radio" >
                        <input type="radio" 
                            name="PaymPer" 
                            className="custom-control-input"  
                            value={PaymentPeriod.Once} 
                            defaultChecked 
                            onChange={e => this.setState({ PaymPer: parseInt(e.target.value), 
                                                           Period: Period.Once,
                                                           WhenPaym: Period.Monthly })}/>
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">{getLangValue('OneTime')}</span>
                        </label>
                        
                        <label className="custom-control custom-radio">
                        <input type="radio" name="PaymPer" className="custom-control-input"  
                            value={PaymentPeriod.Regular} 
                            onChange={e => 
                                {
                                this.setState({ PaymPer: parseInt(e.target.value), 
                                                Period: Period.Monthly })
                                //alert();
                                }
                            } 
                        />
                        <span className="custom-control-indicator"></span>
                        <span className="custom-control-description">{getLangValue('Regular')}</span>
                    </label>
                    </div>
                </div>)
                }                

                {PaymPer === PaymentPeriod.Once && ApplicationID==4 && (
                    <div className="row mb-4">
                        <div className="col-md-5"></div>               
                        <div className="col-md-3">
                        <label>{getLangValue('EndDate')}:</label>
                    </div>
                        <div className="col-md-4">
                        
                            <DatePicker className="form-control"
                                autoComplete="off"
                                required
                                name="EndDate" 
                                dateFormat="DD.MM.YYYY"
                                onChange={this.handleChangeDate}
                                onChangeRaw={this.onChangeRaw}
                                onKeyDown={this.validateDateKeyDown}
                                selected={this.state.StartDate}
                                minDate= {moment()}
                            />
                            <FieldFeedbacks for="EndDate" stop="first">
                                <FieldFeedback when={value => moment(value, "DD.MM.YYYY").isValid() == false && this.state.PaymPer === PaymentPeriod.Once}>{getLangValue('Validation.TagEndDateTypeMismatch')}</FieldFeedback>
                                <FieldFeedback when={value => moment(value, "DD.MM.YYYY").isSameOrBefore()}>{getLangValue('Validation.TagEndDateIsBeforeNow')}</FieldFeedback>
                            </FieldFeedbacks>
                        </div>
                    </div>                
                )}
               
                {   // ПЕРИОДИЧНОСТЬ H20
                   ApplicationID==1 && PaymPer === PaymentPeriod.Regular && (
                    <div className="row mb-4">
                        <div className="col-md-5"></div>               
                        <div className="col-md-3">
                            <label>{getLangValue('Period')}:</label>
                        </div>
                        <div className="col-md-4">
                            <select 
                                name="Period" 
                                className="form-control" 
                                style={{ textShadow: '0 0 0 #4f4f4f' }}
                                onChange={e => this.setState({ WhenPaym: parseInt(e.target.value), Period:e.target.value})}>
                                <option value={Period.Monthly}>{getLangValue('Monthly')}</option>                                
                            </select>                        
                        </div>
                    </div>                
                )} 

                {   // Периодичность OWN
                    ApplicationID==4 &&
                    PaymPer === PaymentPeriod.Regular && (
                    <div className="row mb-4">
                        <div className="col-md-5"></div>               
                        <div className="col-md-3">
                            <label>{getLangValue('Period')}:</label>
                        </div>
                        <div className="col-md-4">
                            <select 
                                name="Period" 
                                style={{ textShadow: '0 0 0 #4f4f4f' }}
                                className="form-control" 
                                onChange={e => this.setState({ WhenPaym: parseInt(e.target.value), Period:e.target.value})}>
                                <option value={Period.Monthly}>{getLangValue('Monthly')}</option>
                                <option value={Period.Weekly}>{getLangValue('Weekly')}</option>  
                            </select>                        
                        </div>
                    </div>                
                )}                 

                {   // к-во дней месяца в H20
                    ApplicationID==1 && WhenPaym === Period.Monthly && PaymPer === PaymentPeriod.Regular && (
                    <div className="row mb-4">
                        <div className="col-md-5"></div>               
                        <div className="col-md-3">
                            <label>{getLangValue('DayOfMonth')}:</label>
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-control" 
                                name="DayOfMonth" 
                                defaultValue='1'  
                                style={{ textShadow: '0 0 0 #4f4f4f' }}
                                onChange={this.handleChange}>
                                <option value="1" key="1">1</option>  
                            </select>
                        </div>
                    </div>                       
                )} 


                {   // к-во дней месяца в своей инициативе
                    ApplicationID==4 && WhenPaym === Period.Monthly && PaymPer === PaymentPeriod.Regular && (
                    <div className="row mb-4">
                        <div className="col-md-5"></div>               
                        <div className="col-md-3">
                            <label>{getLangValue('DayOfMonth')}:</label>
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-control" 
                                name="DayOfMonth" 
                                defaultValue='1'  
                                style={{ textShadow: '0 0 0 #4f4f4f' }}
                                onChange={this.handleChange}>
                                {(() => {
                                    let options = [];
                                    for (let i = 1; i <= 31; i++) {
                                        options.push(<option value={i} key={i}>{i}</option>);
                                    }
                                    return options;
                                })()}
                            </select>
                        </div>
                    </div>                       
                )}  

                { WhenPaym === Period.Weekly && PaymPer === PaymentPeriod.Regular && (
                    <div className="row mb-4">
                        <div className="col-md-5"></div>               
                        <div className="col-md-3">
                            <label>{getLangValue('DayOfTheWeek')}:</label>
                        </div>
                        <div className="col-md-4">
                        <select 
                            name="DayOfWeek" 
                            className="form-control" 
                            style={{ textShadow: '0 0 0 #4f4f4f' }}
                            onChange={this.handleChange}>
                            <option value="1">{getLangValue('Monday')}</option>
                            <option value="2">{getLangValue('Tuesday')}</option>
                            <option value="3">{getLangValue('Wednesday')}</option>
                            <option value="4">{getLangValue('Thursday')}</option>
                            <option value="5">{getLangValue('Friday')}</option>
                            <option value="6">{getLangValue('Saturday')}</option>
                            <option value="7">{getLangValue('Sunday')}</option>
                        </select>                      
                        </div>
                    </div>                       
                )}  


                {   // TotalAmount
                    ApplicationID == Application.OwnInitiative && (
                <div className="row mb-4">
                    <div className="col-md-5 d-flex align-items-center">                
                        <label>{getLangValue('TotalAmount')}:</label>
                    </div>                        
                    <div className="col-md-4">
                        <input type="number" 
                                className="form-control" 
                                name="TotalAmount" 
                                min='0.00' 
                                step='1.00' 
                                pattern="\d+(\.\d{2})?" 
                                onKeyPress={this.validateNumeral} 
                                defaultValue='0.00'  
                                onChange={this.handleTotalAmountChange}/>
                        <FieldFeedbacks for="TotalAmount" stop="first">
                            <FieldFeedback when="rangeUnderflow" />                                
                        </FieldFeedbacks>
                    </div>
                    <div className="col-md-3" >
                    <select 
                        className="form-control" 
                        name="TotalAmountCurrencyID" 
                        style={{ textShadow: '0 0 0 #4f4f4f' }}
                        onChange={this.handleChange}> 
                        <option value={Currency.USD}>{getLangValue('Dollars')}</option>
                        <option value={Currency.UAH}>{getLangValue('Hryvnia')}</option>
                        <option disabled value={Currency.RUB} style={{color:'#ccc'}}>{getLangValue('Rubles')}</option>
                        <option disabled value={Currency.EUR} style={{color:'#ccc'}}>{getLangValue('Euro')}</option>
                    </select>
                    </div>  
                </div>    
                )}
                {/* Min Intention */}
                <div className="row mb-4">
                    <div className="col-md-5 d-flex align-items-center">                
                        <label>{getLangValue('MinimumIntention')}:</label>
                    </div>                        
                    <div className="col-md-4">
                        <input type="number" 
                            className="form-control" 
                            name="MinIntentionAmount" 
                            min='0.00' 
                            step='1.00'  
                            pattern="\d+(\.\d{2})?" 
                            defaultValue='0.00'  
                            onChange={this.handleChange} 
                            onKeyPress={this.validateNumeral}
                        />
                        <FieldFeedbacks for="MinIntentionAmount" stop="first">
                            <FieldFeedback when="rangeUnderflow" />
                            <FieldFeedback when={value => this.state.ApplicationID == Application.OwnInitiative && parseInt(value) > parseInt(this.state.TotalAmount)}>{getLangValue('Validation.TagMinIntentioIsMoreThanTotal')}</FieldFeedback>                      
                        </FieldFeedbacks>
                    </div>
                    <div className="col-md-3" >
                        <select 
                            className="form-control" 
                            name="MinIntentionCurrencyID" 
                            style={{ textShadow: '0 0 0 #4f4f4f' }}
                            onChange={this.handleChange}>
                            <option value={Currency.USD}>{getLangValue('Dollars')}</option>
                            <option value={Currency.UAH}>{getLangValue('Hryvnia')}</option>
                            <option disabled value={Currency.RUB} style={{color:'#ccc'}}>{getLangValue('Rubles')}</option>
                            <option disabled value={Currency.EUR} style={{color:'#ccc'}}>{getLangValue('Euro')}</option>
                        </select>
                    </div>
                </div>                                    
                <div className="row mb-4">
                    <div className="col-md-5">
                        <label>{getLangValue('Description')}:</label>
                    </div>
                    <div className="col-md-7">
                        <textarea className="form-control" name="Description" defaultValue=""  onChange={this.handleChange}></textarea>
                        <FieldFeedbacks for="Description" stop="first">
                            <FieldFeedback when={value => this.state.ApplicationID == Application.OwnInitiative && value.trim() == ""}>{getLangValue('Validation.DescriptionRequired')}</FieldFeedback>                                
                        </FieldFeedbacks>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-5">
                        <label>{getLangValue('CountIntentionsInFavor')}:</label>
                    </div>

                    <div className="col-md-7">
                        <div className="checkbox" >
                        <label>
                        <input type="checkbox" defaultChecked style={{marginRight:15,marginTop:10}} onClick={this.showUser}/>
                            {getLangValue('Me')}
                        </label>
                        &ensp;&ensp;
                        {getLangValue('Recipient')}:<b><label style={{marginLeft:25}}>{this.state.fio}</label></b>
                        </div>
                    </div>
                </div>

                { this.state.ShowUsers && <UserSelect count={10} query={''} fun={(x1:any,x2:any)=> this.setState({ DefaultIntentionOwnerID:x1, fio:x2 }) } /> }
                <br/>
                <div className="row mb-4">
                    <div className="col-md-5">
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-outline-primary w-100" onClick={this.buttonClick}>{getLangValue('CreateTag')}</button><br/>
                    </div>
                    <div className="col-md-3">                                       
                        <button className="btn btn-outline-secondary w-100" onClick={() => {loadMainMenu();}}>{getLangValue('Cancel')}</button><br/>
                    </div>
                </div>
            </FormWithConstraints> 
        )
    };
}