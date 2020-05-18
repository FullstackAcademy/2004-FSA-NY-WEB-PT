const app = document.querySelector('#app');

const e = React.createElement;

const delay = (time) => new Promise((res) => {
  setTimeout(() => res(), time);
});

class AppContainer extends React.Component {
  state = {
    shouldBeCounting: true,
  }

  render() {
    const children = [];

    if (this.state.shouldBeCounting) {
      children.push(e(Counter));
    }

    children.push(e(
      'button',
      {
        onClick: () => {
          this.setState({
            shouldBeCounting: false,
          });
        },
      },
      'Remove Counter',
    ));

    return e(
      'div',
      {
        className: 'column',
      },
      ...children,
    )
  }
}

class Counter extends React.Component {
  state = {
    counter: 0,
    intervalId: null,
  };

  // The first time this component is mounted on the DOM, it will call this function.
  componentDidMount() {
    const intervalId = setInterval(() => {
      console.log('Interval ran!', this.state);

      this.setState({
        counter: this.state.counter + 1,
        intervalId,
      });
    }, 1000);
  }

  // Right before the death of the component, run this function.
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  // Purity: same inputs same output
  // That delay is impure - sometimes we render loading, but even if we do, we are always calling into an outside process and hoping it works... timers dont always run on time setTimeout is inherently impure because it never does the same thing two times in a row.
  render() {
    return e(
      'h1',
      null,
      this.state.counter,
    );
  }
}

class MultiApp extends React.Component {
  render() {
    const { numOfApps } = this.props;

    const children = [];

    for (let i = 0; i < numOfApps; ++i) {
      children.push(e(AppContainer));
    }

    return e(
      'div',
      null,
      ...children,
    );
  }
}

ReactDOM.render(
  e(MultiApp, { numOfApps: 10 }),
  app,
  () => {
    console.log('I have rendered!');
  },
);

/*
Reacts core value is that it is in control of when and what to re-render. It does this by monitoring two values: "state" and "props". If either changes, React will re-render the places where those changes are visible on the dom.

React is just a view of state and props. From this point forward I will call the combination of state and props just state. So we might say that React is a view of state. A second duty of React is to "React" to changes in the state. It does this two ways:

1. React is calling render on its own. On the components that need to be re-rendered.
2. It provides "hooks" for us to intercept changes in components.
*/

// Purity: given the same inputs, we produce the same output.
1 + 1 === 2

// A side effect makes pure functions impure
const dirtyAddTwoNumbers = (a, b) => {
  if (Math.random() > .5) return a + b + 5;
  else return a + b;
}

dirtyAddTwoNumbers(1, 1);
