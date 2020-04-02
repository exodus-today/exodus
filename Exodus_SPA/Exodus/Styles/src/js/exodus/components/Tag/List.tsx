import * as React from 'react';
import { getUserID, getLangValue, getCurrencySymbol } from '../../global';
import { TagStore } from '../../stores/TagStore'
import { bindToElement } from '../../load';
import { Application, Period, Status as UserStatus, Currency } from '../../enums';
import {
 /*   CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
    */
  } from "react-circular-progressbar";



interface TagItemProps {
    TagID:string;
    TagName:string;
    ApplicationID:number;
    ApplicationUrl:string;
    Period: Period;
    Owner_Avatar: string;
    OwnerStatusID: number;
    OwnerFirstName: string;
    OwnerLastName: string;
    DaysLeft:number;
    Obligations_Total: number;
    Intentions_Total: number;
    Intentions_Persent: number;
    Obligations_Persent: number;
    TagCurrency: Currency;
}

export function TagIcon(props:TagItemProps) {

    let src = "/Styles/dist/images/tags/"+props.ApplicationID.toString()+".svg",
        className = "ex-tag-list__image",
        containerClassName = "ex-tag-list__image-container",
        daysPeriod = props.DaysLeft,
        daysLabel,
        tagLabel = props.TagName,
        userStatus = UserStatus.OK,
        currencySymbol = getCurrencySymbol(props.TagCurrency),
        statusTitle = getLangValue("Funds.Collected") + ' ' + props.Obligations_Total + currencySymbol + ' ' + getLangValue("Funds.Obligations") + ' ' + getLangValue("And") + ' ' + props.Intentions_Total + currencySymbol + ' ' + getLangValue("Funds.Intentions"),
        dashFull = 211,
        rotateInit = 90,
        obligationsPercent = props.Obligations_Persent < 100 ? props.Obligations_Persent : 100,
        intentionsPercent = obligationsPercent + props.Intentions_Persent > 100 ? 100 - obligationsPercent : props.Intentions_Persent,
        obligationsDash = -dashFull * (1 + obligationsPercent / 100),
        intentionsDash = -dashFull * (1 + intentionsPercent / 100),
        obligationsEndDegree = rotateInit + 360 * props.Obligations_Persent / 100;

    switch (props.ApplicationID) {
        case Application.OwnInitiative:
            /*
            if (props.Period == Period.Monthly || props.Period == Period.Weekly) {
                src = "/Styles/dist/images/tags/tag-icon-koshelek.png";
                className += " ex-tag-list__image-owninitiative";
            } else {
                */
                className += " hidden";
                containerClassName += " ex-tag-list__image-container-owninitiative";

                if (props.Period == Period.Monthly || props.Period == Period.Weekly) {
                    containerClassName += " ex-tag-list__image-container-period";
                }

                if (daysPeriod == 1) {
                    daysLabel = getLangValue("Date.Day");
                } else if (daysPeriod >= 2 && daysPeriod <= 4) {
                    daysLabel = getLangValue("Date.2_4Days");
                } else {
                    daysLabel = getLangValue("Date.5+Days");
                }
            /* } */
            break;
        
        case Application.H2O:
            src = props.Owner_Avatar;
            className += " ex-tag-list__image-h2o";
            tagLabel = props.OwnerFirstName + " " + props.OwnerLastName;
            userStatus = props.OwnerStatusID;
            break;
    }

    return (
        <div className="ex-tag-list__item" data-tagid={props.TagID} data-load={props.ApplicationUrl} data-target="#ex-route-1">
            <div title={statusTitle} className={containerClassName} data-h2o-userstatus={userStatus}>
                <img src={src}
                    className={className} />
                <label className="day-count">{daysPeriod}</label>
                <label className="day-label">{daysLabel}</label>
                <svg className="circle-obligations" transform={'rotate(' + rotateInit + ')'}>
                    <circle cx="38" cy="38" r="33.5" strokeWidth="9px" fill="transparent"
                        strokeDasharray={dashFull} strokeDashoffset={obligationsDash}></circle>
                </svg>
                <svg className="circle-intentions" transform={'rotate(' + obligationsEndDegree + ')'}>
                    <circle cx="38" cy="38" r="33.5" strokeWidth="9px" fill="transparent"
                        strokeDasharray={dashFull} strokeDashoffset={intentionsDash}></circle>
                </svg>
            </div>
            <div className="ex-tag-list__name">{tagLabel}</div>
       </div>
    );
  }

interface Props {
    UserID: string;
}

interface State {
    TagList:TagStore[]
}

export class List extends React.Component<Props, State> {
    componentWillMount() 
    {        
        fetch('/api/Tag/ByUserID?UserID='+getUserID(), {credentials: 'include'})
            .then(response=>response.json())            
            .then(json=>{this.setState({ TagList: json.Data.map((item: any)=>new TagStore(item))} )})
            .then(() => bindToElement(".ex-tag-list"));
    }
    render() 
    {        
        if (this.state === null) return <div style={{position:"relative",marginLeft:'44%',marginTop:'58%'}}> <img src="styles/dist/images/loading.svg" alt="" /></div>
        const { TagList } = this.state;
        return (
        <div>                
                <div className="ex-tag-list__item" data-load="/Tag/View_AddTagR" data-target="#ex-route-1">
                    <div className="ex-tag-list__image-container ex-tag-list__image-pluscontainer">
                        <img src="/Styles/dist/images/plus.png" className="ex-tag-list__image" />
                    </div>
                    <div className="ex-tag-list__name">{getLangValue("CreateTag")}</div>
                </div>
                {TagList.map(item=>{return <TagIcon key={item.TagID.toString()} TagID={item.Name} 
                    ApplicationID={item.ApplicationID} TagName={item.Name} ApplicationUrl={item.ApplicationUrl} Period={item.Period} DaysLeft={item.DaysLeft}
                    Owner_Avatar={item.Owner_Avatar}  OwnerFirstName={item.OwnerFirstName}  OwnerLastName={item.OwnerLastName} OwnerStatusID={item.OwnerStatusID}
                    TagCurrency={item.TagCurrency} Intentions_Total={item.Intentions_Total} Obligations_Total={item.Obligations_Total}
                    Intentions_Persent={item.Intentions_Persent} Obligations_Persent={item.Obligations_Persent} />})}
        </div>
        );
    }
}
