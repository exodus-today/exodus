import * as React from 'react';
import {getLangValue} from './../../global';
import {IntentionType, Application} from './../../enums';
import { notify } from '../Shared/Notifications';

interface Props {
    tagID: number
}

interface State {
    intentionType: IntentionType,
    loading: boolean
}

export class OwnInitiativeSettings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { intentionType: IntentionType.None, loading: true };
        this.onIntentionTypeChange = this.onIntentionTypeChange.bind(this);
    }
    componentWillMount() {
        let that = this;

        // take tag information
        fetch('/api/Application/Settings_Read?TagID=' + this.props.tagID + '&ApplicationID=' + Application.OwnInitiative, {credentials: 'include', method: 'POST'})
            .then(response=>response.json())
            .then(json=> {
                let intentionType = json.Data ? json.Data.Intention_Type : IntentionType.Regular;
                that.setState({intentionType: intentionType == IntentionType.None || intentionType == IntentionType.Regular ? IntentionType.Regular : IntentionType.OnDemand, loading: false});
            });
    }
    onIntentionTypeChange(e: any) {
        let intentionType = parseInt(e.target.value) as IntentionType,
            that = this,
            data = {
                "TagID": this.props.tagID,
                "ApplicationID": Application.OwnInitiative,
                "Intention_Type": intentionType
            };

        fetch('/api/Application/Settings_Write', {body: JSON.stringify(data), credentials: 'include', method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8'}})
            .then(response=>response.json())
            .then(() => {
                this.setState({intentionType: intentionType, loading: true}, () => {
                    that.setState({loading: false});
                    notify.success(getLangValue('Notification.IntentionTypeChanged'));
                });
            });
    }
    render() {
        return (
            <div id="ex-screen-2" className="ex-panels ex-scroll ex-scroll_with-free-space">
                <div className="ex-panel">
                    <div className="ex-panel__content" data-loading={this.state.loading}>
                        <div className="row mb-4">
                            <div className="col-md-5">
                                <label>{getLangValue("TypeOfIntention")}:</label>
                            </div>
                            <div className="col-md-7">
                                <select name="intentionType" value={this.state.intentionType} className="form-control" onChange={this.onIntentionTypeChange}>
                                    <option value={IntentionType.Regular}>{getLangValue("TypesOfIntention.Simple")}</option>
                                    <option value={IntentionType.OnDemand}>{getLangValue("TypesOfIntention.Demand")}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            );
    }
}
