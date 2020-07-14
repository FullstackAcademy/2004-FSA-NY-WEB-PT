import React, { Component } from 'react';

class LoadingComponent extends Component {
  state = {
    tick: 0,
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const { tick } = this.state;

      this.setState({
        tick: tick + 1,
      });
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { tick } = this.state;

    return (
      <h3> Loading{'.'.repeat((tick % 3) + 1)} </h3>
    );
  }
}

export default LoadingComponent;
