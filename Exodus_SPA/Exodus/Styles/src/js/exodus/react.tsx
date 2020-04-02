import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { register } from './load';
import { UserStatus } from './containers/PublicProfile/UserStatus';
import { UserActions } from './containers/H2O/UserActions';
import { PaymentAccountList as PaymentAccountList2 } from './components/PaymentAccount/PaymentAccountList';
import { TagCreate } from './components/Tag/TagCreate';
import { StatusInfo } from './components/User/StatusInfo';
import { MyIntentions } from './components/Intention/MyIntentions';
import { FriendIntentions } from './components/Intention/FriendIntentions';
import { MyObligations } from './components/Intention/MyObligations';
import { FriendObligations } from './components/Intention/FriendObligations';
import { Transactions } from './components/Intention/Transactions';
import { EventsList } from './components/Events/EventsList';
import { H2OApplication } from './components/H20/Application';
import { Navigation as H2ONavigation } from './components/H20/Navigation';
import { Navigation as OwnInitiativeNavigation } from './components/OwnInitiative/Navigation';
import { OwnInitiativeSettings } from './components/OwnInitiative/Settings';
import { OwnInitiativeDashboard } from './components/OwnInitiative/Dashboard';
import { AppInfo as OwnInitiativeAppInfo } from './components/OwnInitiative/AppInfo';
import { SearchPage } from './components/Search/SearchPage';
import { List } from './components/Tag/List';
import { Notifications } from './components/Shared/Notifications';
import { CompactSearch } from './components/Search/CompactSearch';
import { Header } from './components/Shared/Header';
import { UserRelations } from './containers/PublicProfile/UserRelations';
import { CommonTags } from './containers/PublicProfile/CommonTags';
import { PublicTags } from './containers/PublicProfile/PublicTags';
import { InviteMembers } from './components/H20/InviteMembers';
import { InviteMembers as InviteMembersOwn } from './components/OwnInitiative/InviteMembers';
import { SetStatus } from './components/User/SetStatus';
import { ResetPassword } from './components/User/ResetPassword';
import { ChangePassword } from './components/User/ChangePassword';

const router: any =
{
    "/PublicProfile/UserStatus": UserStatus,
    "/H2O/UserActions": UserActions,    
    "/Tag/TagCreate": TagCreate,
    "/User/StatusInfo": StatusInfo,
    "/User/SetStatus": SetStatus,
    "/Intentions/MyIntentions": MyIntentions,
    "/Intentions/FriendIntentions": FriendIntentions,
    "/Intentions/FriendObligations": FriendObligations,
    "/Intentions/MyObligations": MyObligations,    
    "/Dispatcher/Transactions": Transactions,
    "/Events/EventsList": EventsList,
    "/H2O/Application": H2OApplication,
    "/H2O/Navigation": H2ONavigation,    
    "/OwnInitiative/Navigation": OwnInitiativeNavigation,
    "/OwnInitiative/Settings": OwnInitiativeSettings,
    "/OwnInitiative/Dashboard": OwnInitiativeDashboard,
    "/OwnInitiative/AppInfo": OwnInitiativeAppInfo,
    "/Search/SearchPage": SearchPage,
    "/Tag/List": List,
    "/User/Notifications" : Notifications,
    "/Search/CompactSearch" : CompactSearch,
    "/Shared/Header" : Header,
    "/PaymentAccount/PaymentAccountList" : PaymentAccountList2,
    "/PublicProfile/UserRelations": UserRelations,
    "/PublicProfile/CommonTags":CommonTags,
    "/PublicProfile/PublicTags":PublicTags,
    "/H2O/InviteMembers":InviteMembers, 
    "/OwnInitiative/InviteMembers":InviteMembersOwn,
    "/User/ResetPassword":ResetPassword,
    "/User/ChangePassword":ChangePassword,
}

export function mount(route: string, element: HTMLElement) {
    let routeString: string,
        paramsString: string,
        params: any,
        Route;
    [routeString, paramsString] = route.split('?');    
    Route = router[routeString]; 
    if (paramsString === undefined) {
        params = {}    
    } else {
        params = paramsString.split('&')
            .map(item=>item.split('='))
            .reduce((params: any, [key, value])=>{
                params[key]=value;
                return params;
            }, {})
    }
    ReactDOM.render(<Route {...params} />, element);
}

register('[data-react]', function(element: HTMLElement) 
{
    mount(element.dataset.react as string, element);
});