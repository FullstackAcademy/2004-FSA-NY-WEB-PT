import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class Macys extends Component {
  render() {
    const {
      match: { params },
      location: { pathname },
    } = this.props;

    return (
      <>
        <h1> Macys </h1>
        <Route path={`${pathname}/subscribe`}>
          <h2> You will be notified when {params.product} is in stock! </h2>
        </Route>
        {
          params.product
            ? (
              <>
                <h2> {`We see that you are looking for ${params.product}. We are out of stock of that forever. We are bankrupt.`} </h2>
                <Link to={`${pathname}/subscribe`}> Notify me when available </Link>
              </>
            )
            : null
        }
        <img
          src={'https://www.macys.com/img/nav/co_macysLogo3.gif'}
          style={{
            width: '50%',
          }}
        />
        <ul>
          <li>
            <Link to={'/'}>Back to Home</Link>
          </li>
        </ul>
      </>
    )
  }
}

export default Macys;
