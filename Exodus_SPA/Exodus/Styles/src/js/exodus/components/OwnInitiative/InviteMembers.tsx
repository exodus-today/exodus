import * as React from 'react';
import { getLangValue} from './../../global';
import { InviteUser } from './InviteUser'

interface EnumUsers {
    UserID:number;
    UserName:string;
    UserAvatarSmall:string;  
}

interface Props {
    TagID: string;
}

interface State {
    RoutedToUserID: number;
    USERS:Array<EnumUsers>;
}

export class InviteMembers extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { RoutedToUserID:0, USERS:[] };        
    }

    render() {      
    if (this.state === null) return <div><img src="styles/dist/images/loading.svg" alt="" /></div>
    return (
    <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space" style={{marginRight: '-18px'}}>
        <div id="ex-user" className="ex-panel">
            <div className="ex-panel__header">
                <i className="ex-panel__icon">#</i>
                {getLangValue('InviteMembers')}
            </div>
            <div className="ex-panel__content" style={{height: '450px'}}>
                <InviteUser query={'А'} TagID={this.props.TagID} />
            </div>
        </div>   
    </div>             
    )    
    }
}