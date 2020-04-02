import * as React from 'react';
import {getLangValue} from './../../global';
const shortid = require('shortid');
import LinearProgress from '@material/react-linear-progress';

interface Props {
    className: string;
    currency: string;
    completed: number;
    full: number;
}

interface State {
    
}

export default class MonthProgressBar extends React.Component<Props, State> {
    percent: number;
    uncovered: number;

    constructor(props: Props) {
        super(props);
        this.uncovered = props.full - props.completed;
        this.uncovered = this.uncovered > 0 ? this.uncovered : 0;
        this.percent = props.completed / props.full;
        this.percent = this.percent > 1 || (props.full == 0 && props.completed > 0) ? 1 : this.percent;
    }

    componentDidUpdate() {
        this.percent = this.props.completed / this.props.full;
        this.percent = this.percent > 1 ? 1 : this.percent;

        this.uncovered = this.props.full - this.props.completed;
        this.uncovered = this.uncovered > 0 ? this.uncovered : 0;
    }

    render() {
        let id = shortid.generate();
        return (
            <div className={"month-progress-bar " + this.props.className}>
                <div className="month-progress-bar-description">
                    <span>{getLangValue("Funds.Total")} {this.props.full}{this.props.currency}</span>
                    <span>{getLangValue("Funds.Expected")} {this.props.completed}{this.props.currency}</span>
                    <span>{getLangValue("Funds.NotCovered")} {this.uncovered}{this.props.currency}</span>
                </div>
                <div className="month-progress-bar-indicator">
                    <style>{`
                        .month-progress-bar .completed-point#completed-point` + id + ` {
                            left: calc(` + (this.percent * 100) + `% - 14px);
                        }
                    `}</style>

                    <div id={"completed-point" + id} className="completed-point">{this.props.completed}{this.props.currency}</div>
                    <LinearProgress progress={this.percent} bufferingDots={false} buffer={1} />
                    <div className="start-point">0{this.props.currency}</div>
                    <div className="end-point">{this.props.full}{this.props.currency}</div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}