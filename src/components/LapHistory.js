import React from 'react';
import { msToTimeString } from '../helpers/helpers.js';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';

class LapHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            changed: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Creates some dynamic text for the Lap History List Title
     */
    historyText() {
        var historyText = 'History';
        var historyLength = this.props.history.length;

        if (historyLength > 0) {
            historyText += ' (' + (historyLength) + ')';
        }

        return historyText;
    }

    handleChange(e, expanded) {
        this.setState({
            expanded: expanded
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.history.length === 0) {
            this.setState({
                expanded: false
            });
        }
    }

    render() {
        const expanded = this.state.expanded;
        const history = this.props.history;

        return (
            <ExpansionPanel expanded={expanded} onChange={this.handleChange}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{this.historyText()}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="expansionDetails">
                    <List className="times">
                        <LapHistoryListItems history={history} />
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

class LapHistoryListItems extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            changed: false,
            listElement: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.history.length !== this.props.history.length){
            this.setState({
                changed: true
            });
        this.forceUpdate();
        }
    }

    render(){
        const changed = this.state.changed;
        var listItems = this.state.listElement;

        if (changed) {
            listItems = this.props.history.map((step, index) => {
                const desc = msToTimeString(step);
                return (
                    <ListItem key={index} divider>
                        <Avatar>{index + 1}</Avatar>
                        <ListItemText>{desc}</ListItemText>
                    </ListItem>
                );
            });

            this.setState({
                changed: false,
                listElement: listItems
            });
        }

        return listItems;
    }
}

export default LapHistory;