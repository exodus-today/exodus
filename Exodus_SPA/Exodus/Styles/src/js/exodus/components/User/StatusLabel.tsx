import * as React from 'react';
import { getLangValue, getLang } from '../../global.js';
import { Status, Size } from '../../enums';

interface Props {
    status: Status;
    size: Size;
}

const statusToCSS = new Map<Status, string>([
    [Status.OK, 'ex-status-label_ok'],
    [Status.RegularHelp, 'ex-status-label_regular-help'],
    [Status.Emergency, 'ex-status-label_emergency'],
]);

const statusToText = new Map<Status, string>([
    [Status.OK, getLangValue('DontNeedHelp')],
    [Status.RegularHelp, getLangValue('NeedRegularHelp')],
    [Status.Emergency, getLangValue('Emergency')],
]);

const sizeToCSS = new Map<Size, string>([
    [Size.Small, 'ex-status-label_sm'],
    [Size.Medium, 'ex-status-label_md'],
    [Size.Large, 'ex-status-label_lg'],
]);

export const StatusLabel = ({ status, size=Size.Medium }: Props) => (
    <div className={`ex-status-label ${sizeToCSS.get(size)} ${statusToCSS.get(status)}`}>
        {statusToText.get(status)}
    </div>
);
