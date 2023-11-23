import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import { Typography, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Digits from './components/Digits';
import LapHistory from './components/LapHistory';
import './index.css';

class Stopwatch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            milliseconds:   0,
            lastMoment:     0,
            history: [],
        }

        this.startClock = this.startClock.bind(this);
        this.stopClock = this.stopClock.bind(this);
        this.resetTime = this.resetTime.bind(this);
        this.updateClock = this.updateClock.bind(this);
        this.pushHist = this.pushHist.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.confirmClear = this.confirmClear.bind(this);
    }

    componentWillUnmount(){
        this.stopClock();
    }

    /**
     * Starts the clock and records the moment it was started.
     */
    startClock(){
        var thisMoment = Date.now();
        this.setState({
            lastMoment: thisMoment,
        });

        if (this.interval == null) {
            this.interval = setInterval(this.updateClock, 10);
        }
    }

    /**
     * Stops the clock. Called by buttons.
     */
    stopClock(){
        clearInterval(this.interval);
        this.interval = null;
    }

    resetTime(){
        this.setState({
            milliseconds: 0,
        });
    }

    /**
     * updateClock() records the passage of time. Called by interval.
     */
    updateClock() {
        var thisMoment = Date.now();
        var addMilliseconds = thisMoment - this.state.lastMoment;
        this.setState({
            milliseconds: this.state.milliseconds + addMilliseconds,
            lastMoment: thisMoment,
        });
    }

    /**
     * Pushes the entire state into a history array.
     * Resets the timer to zero.
     */
    pushHist() {
        let history = this.state.history;
        history.push(this.state.milliseconds);
        this.setState({
            milliseconds: 0,
            history: history
        });
    }

    /**
     * Clear the history and reset the clock to zero.
     */
    clearAll(){
        this.stopClock();
        this.setState({
            milliseconds: 0,
            history: []
        });
    }

    confirmClear() {
        if (window.confirm('Clear records?')) {
            this.clearAll() 
        }
    }


    render() {
        const history = this.state.history.slice(0);
        const milliseconds = this.state.milliseconds;

        return (
            <Card className="main">    
                <AppBar position="static">
                    <Toolbar>
                        <Icon>alarm</Icon>
                        <Typography variant="title" color="inherit" >
                            &nbsp;STOPWATCH
                        </Typography>                        
                    </Toolbar>
                </AppBar>                        
                <Digits milliseconds={milliseconds} history={history}/>                                        
                <div className="buttons">
                    <Button variant="contained" color="primary"   aria-label="Start" onClick={this.startClock}><Icon>play_arrow</Icon></Button>
                    <Button variant="contained" color="secondary" aria-label="Stop" onClick={this.stopClock}><Icon>stop</Icon></Button>
                    <Button variant="contained" color="default"   aria-label="Reset" onClick={this.resetTime}><Icon>cached</Icon></Button>
                    <Button variant="contained" color="default"   aria-label="Add Record" onClick={this.pushHist}><Icon>alarm_add</Icon></Button>
                    <Button variant="contained" color="default"   aria-label="Delete Records" onClick={this.confirmClear}><Icon>delete</Icon></Button>
                </div>                               
                <LapHistory history={history} />
            </Card>
        );
    }
}

// ========================================

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('root')
);
