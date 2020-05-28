import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    productSearch: '',
    cart: [],
    price: 0,
  };

  productSearch = (ev) => {
    this.setState({
      productSearch: ev.target.value,
    });
  }

  addRandomItem = () => {
    this.setState({
      cart: this.state.cart.concat([
        {
          name: 'random_item',
          price: Math.random() * 150,
        },
      ]),
    })
  }

  // I probably wouldn't use it this way, but it made sense for this sloppy demo.
  componentDidUpdate(prevProps, prevState) {
    if (this.state.cart.length === prevState.cart.length) {
      return;
    }

    const price = this.state.cart
      .reduce((total, item) => {
        return total + item.price;
      }, 0)
      .toFixed(2);

   this.setState({
     price,
   });
  }

  render() {
    const { productSearch } = this.state;

    return (
      <>
        <h1> Home Page </h1>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <label> Product: </label>
          &nbsp;
          <input
            onChange={this.productSearch}
          />
        </div>
        <div>
          <h3>Cart</h3>
          <ul>
            {
              this.state.cart.map(item => {
                return <li key={`${item.price}`}>
                  {`${item.name} | $${item.price.toFixed(2)}`}
                </li>
              })
            }
            <span> Total Cost: {this.state.price} </span>
          </ul>
          <button
            onClick={this.addRandomItem}
          >
            Add random item to cart
          </button>
        </div>
        <ul>
          <li>
            <Link
              to={productSearch ? `/macys/${productSearch}` : '/macys'}
            >
              Macys
            </Link>
          </li>
        </ul>
      </>
    )
  }
}

export default Home;
