import React from 'react';
import { msToTimeString } from '../helpers/helpers.js';
import Typography from '@material-ui/core/Typography';

class Digits extends React.Component {
    render() {
        const timeString = msToTimeString(this.props.milliseconds);
        const history    = this.props.history;

        return (
            <div className="digits">
                <Typography className="digitsText" component="p" variant="display4" align="center">
                    {timeString}
                </Typography>
                <PreviousTime history={history} />
            </div>
        );
    }
}

function PreviousTime(props) {
    var previous = null;
    var timeString = '-';
    if (props.history.length > 0) {
        previous = props.history[props.history.length - 1];
        timeString = msToTimeString(previous);
    }

    return (
        <Typography component="p" variant="subheading" align="center">
            {timeString}
        </Typography>
    );
}

export default Digits;