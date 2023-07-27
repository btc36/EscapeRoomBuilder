import React, { Component } from 'react';
import Countdown from 'react-countdown';
import ProgressBar from "@ramonak/react-progress-bar";
export class RunGame extends Component {

  constructor(props) {
    super(props);
      this.state = {
      };
      if (!this.props.runningGame) {
          this.props.startRunningGame();
      }
  }

    render() {
        // Random component
        const Completionist = () => <span>You are good to go!</span>;

        // Renderer callback with condition
        const renderer = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
                // Render a completed state
                return <Completionist />;
            } else {
                // Render a countdown
                return <span>{minutes}:{seconds}</span>;
            }
        };
        var barColor = '#00FF00';
    return (
      <div className="runGamePage">
            <h1>Run Game</h1>
            <div className="countdown">
                <Countdown
                    date={Date.now() + 3600000}
                    renderer={renderer}
                    zeroPadTime={2}
                />
            </div>
            <h1>INPUT CODE</h1>
            <ProgressBar
                completed={60}
                bgColor={barColor}
                height={"30px"}
            />
      </div>
    );
  }
}
