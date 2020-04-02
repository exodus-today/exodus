import * as React from 'react'
import { getApiKey, getUserID, getLang } from '../../global'
import { Tag } from '../../classes/Tag'
import { bindToElement } from '../../load';

interface State {
    tag:Tag[]
}

interface Props {
    UserID:number
}

export class CommonTags extends React.Component <Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { tag:[] }
        }  
    componentWillMount()
        {                           
            fetch('/api/PublicProfile/GetTagsCommon?api_key='+getApiKey()+'&UserID='+getUserID()+'&CommonUserID='+this.props.UserID, 
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
                .then(json=>{this.setState({ tag: json.Data.map((item: any)=>new Tag(item))}); })
                .then(() => bindToElement(".ex-public-profile-common-tag"));
        }    
    render() {        
       return (    
        <div className="ex-public-profile-common-tag">
            {
                this.state.tag.map(item=>{return (
                        <div key={item.TagID} className="ex-public-profile-common-tag__container" data-tagid={item.TagID} data-load={"/Application/AppH2O?TagID="+item.TagID} data-target="#ex-route-1">
                            <img src={"/Styles/dist/images/tags/"+item.ApplicationID.toString()+".svg"} style={{width:30, height:30, margin:'15px'}} />
                            <div style={{display:'inline'}}>{getLang()=='ru'?item.NameRus.substr(0,50):item.NameEng.substr(0,50)}</div>
                        </div>                    
                )})      
            }
        </div>  
      );
    }
}