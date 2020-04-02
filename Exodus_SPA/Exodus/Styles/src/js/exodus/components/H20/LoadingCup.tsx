import * as React from 'react';
import {getLang, getLangValue} from './../../global';
const ReactTooltip = require('react-tooltip');

const shortid = require('shortid');
require("@loadingio/loading-bar/dist/loading-bar.min.js");

interface Props {
    className: string;
    currency: string;
    completed: number;
    full: number;
    expected: number;
    showLegend: boolean;

    showCompletedIcon?: boolean;
    clickCompletedHandler?: Function;
    showExpectedIcon?: boolean;
    clickExpectedHandler?: Function;
}

interface State {
/*    
    uncovered: number;
    left: number;
    completedPercent: number;
*/
}

declare global {
    interface Window { ldBar: Function; }
}

export default class LoadingCup extends React.Component<Props, State> {
    barNode: HTMLElement | null;
    uncovered: number;
    left: number;
    completedPercent: number;

    constructor(props: Props) {
        super(props);

        this.calculate();
    }
    calculate() {
        let props = this.props,
            uncovered = props.full - props.completed - props.expected,
            left = props.full - props.completed,
            completedPercent = (props.completed / props.full) * 100;

        this.uncovered = uncovered > 0 ? uncovered : 0;
        this.left = left > 0 ? left : 0;
        this.completedPercent = completedPercent <= 100 ? completedPercent : 100;
    }
    ldBarBuild() {
        if (this.barNode) {
            window.ldBar(this.barNode);
        }
    }    
    componentDidMount() {
        this.ldBarBuild();
    }
    componentDidUpdate() {
        this.calculate();
        this.ldBarBuild();
    }
    render() {
        let { className, completed, expected, currency, full, showCompletedIcon, showExpectedIcon, clickCompletedHandler, clickExpectedHandler } = this.props;
        let { uncovered, left, completedPercent } = this;
        let id = shortid.generate();
        return (
            <div className={"loading-cup-container " + className}>
                {this.props.showLegend && (
                    <div data-tip={'<img src="/Styles/dist/images/application/funds-legend' + (getLang() == 'en' ? '-en' : '') + '.jpg" />'} className="loading-cup-legend">
                        <i className="loading-cup-legend-icon">?</i>
                        <ReactTooltip 
                            className='hover-visible place-bottom-left' 
                            html={true} 
                            effect="solid" 
                            place="left" 
                            type="dark" 
                            delayHide={300}
                            data-offset="{'top': 60}" />
                    </div>
                )}
                <div className="loading-cup">
                    <style>{`
                        .ldBar#ldBar` + id + `:before {
                            top: ` + (full > 0 ? uncovered * 100/full : 0) + `px;
                        }
                        .completed-rate#completed` + id + ` {
                            top: calc(` + (100 - completedPercent) + `% - 1px);
                        }
                    `}</style>

                    <div id={"completed" + id} key={"completed" + id} className="completed-rate">{completed}{currency}</div>

                    <div id={"ldBar" + id} key={"ldBar" + id}
                        ref={el => this.barNode = el}
                        data-type="fill"
                        data-path="M10 10L90 10L90 110L10 110Z"
                        className="ldBar"
                        data-max={full > 0 ? full : completed}
                        data-value={completed}
                        data-pattern-size="100"
                        data-fill-background="transparent"
                        data-bbox="25 24.5 50 70"
                        data-stroke="#25b"
                        data-stroke-width="3"
                        data-stroke-trail='#000'
                        data-stroke-trail-width="10"
                        data-fill="data:ldbar/res,bubble(#3F9DF4,#fff,50,30)"
                    >
                    </div>

                    <div id={"full" + id} key={"full" + id} className="full-rate">{full}{currency}</div>
                </div>
                <div className="loading-cup-description">
                    <div>{getLangValue("Funds.Collected")} {completed}{currency} {getLangValue("Funds.From")} {full}{currency}&nbsp;{showCompletedIcon == true && (<span onClick={e => {if (clickCompletedHandler) {clickCompletedHandler(e)}}}><i>i</i></span>)}</div>
                    <div>{getLangValue("Funds.Left")} {left}{currency}</div>
                    <div>{getLangValue("Funds.Expected")} {expected}{currency}&nbsp;{showExpectedIcon == true && (<span onClick={e => {if (clickExpectedHandler) {clickExpectedHandler(e)}}}><i>i</i></span>)}</div>
                    <div>{getLangValue("Funds.NotCovered")} {uncovered}{currency}</div>
                </div>
            </div>
        )
    }
}