import * as React from 'react';
import { UserStore } from '../../stores/UserStore';
import { CompactSearch } from '../../components/Search/CompactSearch';
import { bindToElement } from '../../load';
import { loadMainMenu, getUserID, getLangValue } from '../../global';
interface Props {
}

interface State {
    user: UserStore;
}

export class Header extends React.Component<Props, State> 
{
    componentWillMount()
    {
        fetch(`/api/User/Current?UserID=`+getUserID(), {credentials: 'include'})
        .then(response=>response.json())
        .then(json=> {
            this.setState({user: new UserStore(json.Data)})})        
        .then(() => bindToElement(".ex-header"));
    }
    render()
    {
        if (this.state === null) return 'Loading...';
        // const { user } = this.state;
        return (
            <div className="ex-header">
                <div className="ex-header__logo-container">
                    <img src="/Styles/dist/images/logo.png" className="ex-header__logo"/>>
                    <div id="ex-header__search">
                        <CompactSearch/>
                    </div>

                    <div style={{margin:"15px", position:"absolute"}} 
                            className="main-menu-open-button" 
                            onClick={() => {loadMainMenu();}}>
                        <a style={{color: 'rgb(128, 221, 50)', cursor: 'pointer', margin: '5px'}}>
                            <img src="/Styles/dist/images/icons/home.svg" style={{width:'50px', color:'white'}} />
                        </a>
                    </div>

                </div>
                <div className="ex-header__person">
                    <div data-load="/Account/View_UserProfile" data-target="#ex-route-1">
                        <img src={this.state.user.AvatarSmall} className="ex-header__person-avatar"/>
                        
                        {this.state.user.UserStatus==1 && (
                        <span id="indicator" 
                            className={"ex-header__person-status ex-header__person-status_success"}>
                        </span>)
                        }
                        {this.state.user.UserStatus==2 && (
                        <span id="indicator" 
                            className={"ex-header__person-status ex-header__person-status_warning"}>
                        </span>)
                        }
                        {this.state.user.UserStatus==3 && (
                        <span id="indicator" 
                            className={"ex-header__person-status ex-header__person-status_danger"}>
                        </span>)
                        }                                                

                        <div className="ex-header__person-name">{this.state.user.UserFirstName} {this.state.user.UserLastName}</div>
                    </div>
                    <i className="ex-header__person-arrow"></i>
                    <i className="ex-header__desktop-home main-menu-open-button"></i>
                </div>
                <div className="ex-header__dispatcher">
                    <div data-load={"/Intentions/Dispatcher?UserID="+this.state.user.UserID} data-target="#ex-route-1">
                        <img src="/Styles/dist/images/icons/dispatcher-icon.png" className="ex-header__dispatcher-icon"/>
                        
                        <span id="dispatcher-notifications" 
                            className={"ex-header__dispatcher-status ex-header__person-status_success"}>
                        </span>                                             

                        <div className="ex-header__dispatcher-label">{getLangValue('IntentionDispatcher')}</div>
                    </div>
                </div>
            </div>
            );
    }
}
