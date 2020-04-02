import * as React from 'react';
import { User } from '../../models';
import { Status, Size } from '../../enums';

interface Props {
    status: Status;
    size: Size;
}

const statusToCSS = new Map<Status, string>([
    [Status.OK, 'ex-status-amount_ok'],
    [Status.RegularHelp, 'ex-status-amount_regular-help'],
    [Status.Emergency, 'ex-status-amount_emergency'],
]);

const sizeToCSS = new Map<Size, string>([
    [Size.Small, 'ex-status-amount_sm'],
    [Size.Medium, 'ex-status-amount_md'],
    [Size.Large, 'ex-status-amount_lg'],
]);

export const StatusAmount = ({ status, size=Size.Medium }: Props) => (
    <div className={`ex-status-amount ${sizeToCSS.get(size)} ${statusToCSS.get(status)}`}>
        <span className="ex-status-amount__required">0</span>
        <span className="ex-status-amount__recieved"> / 0</span>
        <span className="ex-status-amount__currency"> EUR</span>
    </div>
);
