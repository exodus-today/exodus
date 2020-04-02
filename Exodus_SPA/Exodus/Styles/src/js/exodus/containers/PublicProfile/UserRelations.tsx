import * as React from 'react'
import { getApiKey, getUserID } from '../../global'
import { UserRelationsStore } from '../../stores/UserRelations'
import { bindToElement } from '../../load';

interface State {
    UserRelations: UserRelationsStore[]
}

interface Props {
    UserID:number
    TagID:number
}

export class UserRelations extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { UserRelations:[] }
    }    

    componentWillMount()
    {        
        fetch('/api/PublicProfile/GetUserRelations?api_key='+getApiKey(), 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body:                 
            JSON.stringify( this.props.UserID ),
            method:'post', 
            credentials: 'include'}
        )
            .then(response=>response.json())            
            .then(json=>{this.setState({ UserRelations: json.Data.map((item: any)=>new UserRelationsStore(item))}); })
            .then(() => bindToElement(".ex-public-profile-relation-user"));
    }    
    
    render() {        
       if (this.state === null) return <div><img src="styles/dist/images/loading.svg" alt="" /></div>
       const { UserRelations } = this.state;
       return (    
        <div className="ex-public-profile-relation-user">
            {
                UserRelations.map(item=>{return (       
                    <div key={item.ID} className="ex-public-profile-relation-user__container" data-target="#ex-route-1" data-load={"/PublicProfile/UserDetail?UserID="+item.ID+"&TagID="+this.props.TagID} >
                        <img src={item.AvatarSmall} className="ex-public-profile-relations-image"></img><br/>
                        <span>{item.FirstName}</span>
                        <span>{item.LastName}</span>                    
                    </div>
                )})             
            }
        </div>  
      );
    }
}