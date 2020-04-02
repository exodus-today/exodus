import * as React from 'react';
import { getApiKey, getLangValue, getUserID } from '../../global.js';
import { bind } from '../../load';
import { TagRole } from '../../enums';

interface Props {
    tagID: Number;
    tagName: string;
}

interface State {
    tagRole: TagRole
    allowCopyLink: boolean
}

declare global {
    interface Window { updateTagRoleInfo: Function; }
}

export class Navigation extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { tagRole: TagRole.None, allowCopyLink: false };
        this.updateTagRoleInfo = this.updateTagRoleInfo.bind(this);
        window.updateTagRoleInfo = this.updateTagRoleInfo;
    }

    componentWillMount() {
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
                bind(document.getElementById('ex-screen-1'));
            });
        }

        return tagRole;
    }

    render() {
        let { tagRole, allowCopyLink } = this.state;

        return (<div>
            <div className="ex-navigation__info">
                <div className="ex-navigation__content">
                    <div className="ex-navigation__image ex-tag">
                        <img src="/Styles/dist/images/tags/4.svg" />
                    </div>
                    <div className="ex-navigation__title">{ this.props.tagName }</div>
                </div>
            </div>

            <div className="ex-navigation__item active"
                data-load={ "/OwnInitiative/Dashboard?TagID=" + this.props.tagID + "&TagRole=" + tagRole }
                data-target="#ex-route-2">
                { getLangValue("Dashboard") }
                <i className="icons-statistic ex-navigation__icon"></i>
            </div>
        
            <div className="ex-navigation__item"
                data-load={ "/OwnInitiative/UserList?TagID=" + this.props.tagID }
                data-target="#ex-route-2">

                { getLangValue("Members") }
                <i className="icons-person ex-navigation__icon"></i>
            </div>

            <div className="ex-navigation__item" hidden={tagRole !== TagRole.Owner}
                data-load={ "/OwnInitiative/Settings?TagID=" + this.props.tagID }
                data-target="#ex-route-2">                
                { getLangValue("Settings") }
                <i className="icons-gear ex-navigation__icon"></i>
            </div>

            <div className="ex-navigation__item" hidden={tagRole == TagRole.None}
                data-load={ "/OwnInitiative/InviteMembers?TagID=" + this.props.tagID}
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
        </div>
        )
    }
}