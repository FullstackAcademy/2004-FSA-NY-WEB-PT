const app = document.querySelector('#app');

const e = React.createElement;

class Counter extends React.Component {
  render() {
    const { count } = this.props;

    return e(
      'span',
      {
        style: {
          textAlign: 'center',
        },
      },
      `Count is ${count}`,
    )
  }
}

class CounterButton extends React.Component {
  render() {
    const { incrementFunc } = this.props;

    return e(
      'button',
      {
        onClick: incrementFunc,
      },
      'Increment',
    )
  }
}

class CounterContainer extends React.Component {
  // Old School
  // constructor() {
  //   super();
  //   this.state = {
  //     count: 0,
  //   };
  //
  //   this.incrementFunc = this.incrementFunc.bind(this);
  // }
  //
  // incrementFunc() {
  //   const { count } = this.state;
  //
  //   this.setState({
  //     count: count + 1,
  //   });
  // }

  // Fancy Modern Browser Class Fields
  state = {
    count: 0,
  };

  incrementFunc = () => {
    const { count } = this.state;

    this.setState({
      count: count + 1,
    });
  }

  render() {
    const { count } = this.state;

    return e(
      'div',
      {
        id: 'counter_container',
      },
      e(
        Counter,
        {
          count,
        }
      ),
      e(
        CounterButton,
        {
          incrementFunc: this.incrementFunc,
        }
      ),
    );
  }
}

ReactDOM.render(
  e(CounterContainer),
  app,
  () => {
    console.log('I have rendered!');
  },
);

/*
Reacts core value is that it is in control of when and what to re-render. It does this by monitoring two values: "state" and "props". If either changes, React will re-render the places where those changes are visible on the dom.
*/
