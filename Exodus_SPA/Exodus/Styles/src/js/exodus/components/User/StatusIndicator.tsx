import * as React from 'react';
import { User } from '../../models';
import { Status, Size } from '../../enums';

interface Props {
    status: Status;
    size: Size;
}

const statusToCSS = new Map<Status, string>([
    [Status.OK, 'ex-status-indicator_ok'],
    [Status.RegularHelp, 'ex-status-indicator_regular-help'],
    [Status.Emergency, 'ex-status-indicator_emergency'],
])

const sizeToCSS = new Map<Size, string>([
    [Size.Small, 'ex-status-indicator_sm'],
    [Size.Medium, 'ex-status-indicator_md'],
    [Size.Large, 'ex-status-indicator_lg'],
])

export const StatusIndicator = ({ status, size=Size.Medium }: Props) => (
    <div className={`ex-status-indicator ${sizeToCSS.get(size)} ${statusToCSS.get(status)}`} />
);