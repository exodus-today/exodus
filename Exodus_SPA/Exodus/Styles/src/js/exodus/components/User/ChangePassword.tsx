import * as React from 'react';
import { getLangValue, getUserID, getApiKey } from '../../global.js';
import { notify } from '../Shared/Notifications';

interface Props {
    Token: string
}
interface State { Password1: string, Password2:string}

function MainPage() {
    window.location.replace("/")
}


export class ChangePassword extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { Password1:'',Password2:'' } 
        this.handleClick = this.handleClick.bind(this);      
    }

    handleClick=(e:any)=>{     
        if (this.state.Password1!== this.state.Password2)
          {
            notify.error(getLangValue("Notification.PasswordsAreDifferent"));
            e.stopPropagation();
          }
          else
        fetch("/api/User/ChangePassword?token="+this.props.Token+'&password='+this.state.Password1,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
            },
            method: "post",
            body:'', 
            credentials: 'include',        
        })
        .then(res => {
            if (res.ok) {               
                notify.success(getLangValue("Notification.SuccessfullySetStatus")); 
                setTimeout(MainPage, 2000);                                         
            } else {
                notify.error(getLangValue("Error"));
            }
        })
    }

    render() {
        const {
            props: { Token }, // -user
        } = this;
        return (
                <div className="ex-main-menu">
                    <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space" style={{marginRight: '-18px'}}>
                        <div className="ex-panel">
                            <div className="ex-panel__header">{getLangValue('PasswordRecovery')}</div>
                            <div className="ex-panel__content">
                                <div className="row mb-4">
                                    <div className="col-md-5 d-flex align-items-center">
                                        <label>{getLangValue('NewPassword')}:</label>
                                    </div>
                                    <div className="col-md-4">
                                        <input type="password" className="form-control" name="password1" onChange={(e)=>this.setState({Password1:e.target.value})} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-5 d-flex align-items-center">
                                        <label>{getLangValue('RetypeNewPassword')}:</label>
                                    </div>
                                    <div className="col-md-4">
                                        <input type="password" className="form-control" name="password2" onChange={(e)=>this.setState({Password2:e.target.value})}/>
                                    </div>
                                </div>
                                <div className="btn btn-outline-success" onClick={this.handleClick}>
                                        {getLangValue('SetNewPassword')}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>  
    )}}