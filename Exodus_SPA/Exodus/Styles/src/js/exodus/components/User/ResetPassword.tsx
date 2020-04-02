import * as React from 'react';
import { getLangValue, getUserID, getApiKey } from '../../global.js';
import { notify } from '../Shared/Notifications';

interface Props { }
interface State { UserEmail: string}

function MainPage() {
    window.location.replace("/")
}

export class ResetPassword extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { UserEmail:'' } 
        this.handleClick = this.handleClick.bind(this);      
    }

    handleClick=(e:any)=>{     
        fetch("api/User/ResetPassword?email=" + this.state.UserEmail,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
            },
            method: "POST",
            body: '', 
            credentials: 'include',        
        })
        .then(res => {
            if (res.ok) {      
                notify.success(getLangValue("Notification.EmailHasBeenSent"));                
                setTimeout(MainPage, 2000);
            } else {
                notify.error(getLangValue("Error"));
            }
        })
    }

    render() {
        return (
                <div className="ex-main-menu">
                <div id="notify" data-react="/User/Notifications"><div className="Toastify"></div></div>                       
                    <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space" style={{marginRight: '-18px'}}>
                        <div className="ex-panel">
                            <div className="ex-panel__header">{getLangValue('PasswordRecovery')}</div>
                            <div className="ex-panel__content">
                                <div className="row mb-4">
                                    <div className="col-md-5 d-flex align-items-center">
                                        <label>e-mail:</label>
                                    </div>
                                    <div className="col-md-4">
                                        <input type="text" className="form-control" name="email"     
                                            onChange={e =>  { this.setState({ UserEmail: (e.target.value) }) }}  
                                        />
                                    </div>
                                    <div className="btn btn-outline-success" onClick={this.handleClick}>
                                        {getLangValue('ResetPassword')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                                     
                </div>              
    )}}