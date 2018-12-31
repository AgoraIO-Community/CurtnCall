import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CountdownTime extends Component {
  state = { formattedTime: 0, loading: false };

  _intervalIds = [];
  _timeoutIds = [];
  _seconds = null;

  componentDidMount = () => {
    const { delta, endTimestamp } = this.props;

    if (endTimestamp) {
      this._seconds = endTimestamp - (Date.now() - delta);
      this._initializeTimer();
    }
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.formattedTime !== nextState.formattedTime) {
      return true;
    }

    if (this.state.loading !== nextState.loading) {
      return true;
    }

    if (this.props.channelSegment !== nextProps.channelSegment) {
      return true;
    }

    if (this.props.endTimestamp !== nextProps.endTimestamp) {
      return true;
    }

    return false;
  };

  componentDidUpdate(prevProps) {
    if (this.props.endTimestamp !== prevProps.endTimestamp) {
      this._stopTimer();
      this._seconds = this.props.endTimestamp - (Date.now() - this.props.delta);
      this._initializeTimer();
      this.setState({ loading: false });
    }

    if (this.props.onComplete) {
      if (this.props.channelSegment !== prevProps.channelSegment) {
        if (this.props.on)
          this._intervalIds.map(interval => clearInterval(interval));
        this._timeoutIds.map(timeout => clearTimeout(timeout));
      }
    }
  }

  componentWillUnmount = () => {
    this._intervalIds.map(interval => clearInterval(interval));
    this._timeoutIds.map(timeout => clearTimeout(timeout));
  };

  _initializeTimer = () => {
    const { endTimestamp, onComplete } = this.props;
    this._seconds = this._seconds - 0.01;
    this._writeFormattedTime();
    this._startTimer();

    return this._intervalIds.push(
      setInterval(() => {
        this._seconds = endTimestamp - (Date.now() - this.props.delta);
        if (this._seconds <= 0) {
          this._stopTimer();

          if (this.props.timeToPerform) {
            this.setState({ loading: true });
          } else {
            return onComplete();
          }
        } else {
          this._writeFormattedTime();
        }
      }, 1000)
    );
  };

  _startTimer = () => {
    // Give it a moment to collect it's thoughts for smoother render
    return this._timeoutIds.push(setTimeout(() => null), 200);
  };

  _stopTimer = () => {
    this._intervalIds.map(interval => clearInterval(interval));
    this._timeoutIds.map(timeout => clearTimeout(timeout));
  };

  _formattedTime = () => {
    const { timeToPerform } = this.props;
    let timeRemaining;

    if (timeToPerform) {
      const { performanceDuration, multiplier } = this.props;
      const timeToAdd = performanceDuration * multiplier;
      timeRemaining = (timeToAdd + this._seconds) / 1000;
    } else {
      timeRemaining = this._seconds / 1000;
    }

    if (timeRemaining >= 1 || !timeRemaining) {
      let days, hours, minutes, seconds;
      let returnDays, returnHours, returnMinutes, returnSeconds;

      days = parseInt(timeRemaining / 86400, 10);
      timeRemaining = timeRemaining % 86400;
      hours = parseInt(timeRemaining / 3600, 10);
      timeRemaining = timeRemaining % 3600;
      minutes = parseInt(timeRemaining / 60, 10);
      timeRemaining = timeRemaining % 60;
      seconds = parseInt(timeRemaining, 10);

      returnDays = parseInt(days, 10);
      returnHours = ("0" + hours).slice(-2);
      returnMinutes = ("0" + minutes).slice(-2);
      returnSeconds = ("0" + seconds).slice(-2);

      if (days) {
        return `${returnDays} days ${returnHours} hours ${returnMinutes} minutes ${returnSeconds} seconds`;
      } else if (hours) {
        return `${returnHours}:${returnMinutes}:${returnSeconds}`;
      } else if (minutes) {
        return `${returnMinutes}:${returnSeconds}`;
      } else {
        return `:${returnSeconds}`;
      }
    } else {
      return ":00";
    }
  };

  _writeFormattedTime = () => {
    const formattedTime = this._formattedTime();

    this.setState({ formattedTime });

    return;
  };

  renderText = () => {
    const { loading } = this.state;
    if (loading) {
      return <FontAwesomeIcon icon="spinner" spin />;
    } else {
      return this.state.formattedTime;
    }
  };

  render() {
    const { renderText } = this;
    return <Fragment>{renderText()}</Fragment>;
  }
}
