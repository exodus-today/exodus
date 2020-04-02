import * as React from 'react';
import { getApiKey, getLangValue, getUserID } from '../../global.js';
import { TagRole } from '../../enums';
import { bind } from '../../load';


interface Props {
    defaultIntentionOwnerID: Number;
    tagID: Number;
}

interface State {
    intentionOwnerFullName: string;
    intentionOwnerAvatar: string;
    monthIntentionAmount: Number;
    monthIntentionCurrency: string;
    curMonthObligationAmount: Number;
    curMonthObligationPercent: Number;
    nextMonthObligationAmount: Number;
    nextMonthObligationPercent: Number;
    userLoading: Boolean;

    tagRole: TagRole;
    allowCopyLink: boolean;
}

export class Navigation extends React.Component<Props, State> {
    tagRole: TagRole;
    allowCopyLink: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {
            intentionOwnerFullName: '',
            intentionOwnerAvatar: '',
            monthIntentionAmount: NaN,
            monthIntentionCurrency: '',
            curMonthObligationAmount: NaN,
            curMonthObligationPercent: NaN,
            nextMonthObligationAmount: NaN,
            nextMonthObligationPercent: NaN,
            userLoading: true,

            tagRole: TagRole.None,
            allowCopyLink: false
        };
        this.updateTagRoleInfo = this.updateTagRoleInfo.bind(this);
        window.updateTagRoleInfo = this.updateTagRoleInfo;
    }

    componentWillMount() {
        let that = this

        fetch('/api/User/Get_ByID?UserID='+ this.props.defaultIntentionOwnerID , {credentials: 'include'})
            .then(response=>response.json())
            .then((json: any) => {
                if (json.RequestStatus == 200) {

                    let data = json.Data,
                        helpDetail = data.HelpDetail,
                        monthIntentionAmount = NaN,
                        monthIntentionCurrency = '',
                        curMonthObligationAmount = NaN,
                        curMonthObligationPercent = NaN,
                        nextMonthObligationAmount = NaN,
                        nextMonthObligationPercent = NaN;

                    if (helpDetail.HelpDetailID !== -1) {
                        // TODO: get values for intensions
                        /*
                        monthIntentionAmount = NaN;
                        monthIntentionCurrency = '';
                        curMonthObligationAmount = NaN,
                        curMonthObligationPercent = NaN,
                        nextMonthObligationAmount = NaN,
                        nextMonthObligationPercent = NaN;
                        */
                    }
                    
                    that.setState({
                        intentionOwnerFullName: data.UserFullName,
                        intentionOwnerAvatar: data.AvatarBig,
                        monthIntentionAmount: monthIntentionAmount,
                        monthIntentionCurrency: monthIntentionCurrency,
                        curMonthObligationAmount: curMonthObligationAmount,
                        curMonthObligationPercent: curMonthObligationPercent,
                        nextMonthObligationAmount: nextMonthObligationAmount,
                        nextMonthObligationPercent: nextMonthObligationPercent,
                        userLoading: false
                    });
                }
                else
                {
                    // handle error from server
                }
            });

            this.updateTagRoleInfo();
    }

    async updateTagRoleInfo() {
        const response = await fetch('/api/Tag/TagRole?TagID=' + this.props.tagID + '&UserID=' + getUserID(), {credentials: 'include'});
        const json = await response.json();
        let tagRole = TagRole.None;

        if (json.ErrorCode == -1) {
            tagRole = json.Data;
            const allowCopyLink = json.Data !== TagRole.None;

            this.setState({
                tagRole: tagRole,
                allowCopyLink: allowCopyLink
            }, () => {
                bind(document.getElementById('ex-route-1'));
            });
        }

        return tagRole;
    }

    render() {
        let { tagRole, allowCopyLink } = this.state;

        return (<div>
            <div className="ex-navigation__info" data-loading={this.state.userLoading}>
                <div className="ex-navigation__header">            
                    <div className="ex-navigation__content">
                        <div>
                            <img src={ this.state.intentionOwnerAvatar } className="ex-avatar ex-avatar_medium ex-avatar_light mb-4" />
                        </div>
                        <div className="ex-navigation__title">{ this.state.intentionOwnerFullName }</div>

                        <div className="ex-navigation__sign">
                            <div>
                                <div>
                                    <div>
                                        <h2>Н</h2>2<h2>O</h2>
                                    </div>
                                </div>
                            </div>
                       </div>                        
                    </div>
                    
                </div>      
            </div>
        
            <div className="ex-navigation__item active"
                data-load={ "/H2O/AppH2ODefaultPage?TagID=" + this.props.tagID + "&TagRole=" + tagRole }
                data-target="#ex-route-2">
                { getLangValue("Application") }
                <i className="icons-gear ex-navigation__icon"></i>
            </div>
        
            <div className="ex-navigation__item"
                data-load={ "/H2O/UserList?TagID=" + this.props.tagID }
                data-target="#ex-route-2">
                { getLangValue("Members") }
                <i className="icons-person ex-navigation__icon"></i>
            </div>

            <div className="ex-navigation__item" hidden={tagRole == TagRole.None}
                    data-load={ "/H2O/InviteMembers?TagID="+this.props.tagID}
                    data-target="#ex-route-2">
                    { getLangValue("InviteMembers") }
                    <i className="icons-person ex-navigation__icon"></i>
                </div>

            <div className="ex-navigation__item"
                data-load={ "/Tag/TagInfo?TagID=" + this.props.tagID + "&AllowCopyLink=" + allowCopyLink}
                data-target="#ex-route-2">
                { getLangValue("TagInfo") }
                <i className="icons-info ex-navigation__icon"></i>
            </div>
        
            <div className="ex-navigation__item"></div>
            <br/>
            
            <div className="ex-navigation__share">
                <div className="ex-navigation__share-title">{getLangValue("Share")}</div>
                <div className="ex-navigation__share-links">
                    <a href="#"><img src="/Styles/dist/images/icons/vk.png" /></a>
                    <a href="#"><img src="/Styles/dist/images/icons/fb.png" /></a>
                    <a href="#"><img src="/Styles/dist/images/icons/in.png" /></a>
                </div>
            </div>
        </div>
        )
    }
}