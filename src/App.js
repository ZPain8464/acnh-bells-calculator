import React from "react";
import config from "./Config/config";
import "./App.css";

export default class App extends React.Component {
  state = {
    items: [],
    selItems: [],
    pockets: [],
    total: "",
  };
  // fetches items from API
  getItems = (item) => {
    fetch(`${config.REACT_APP_BASE_URL}/${item}/`)
      .then((res) => res.json())
      .then((data) => {
        const list = Object.entries(data);
        this.setState({
          items: list,
        });
      });
  };

  // adds items to Pockets list
  addToPockets = (item) => {
    const name = item.name["name-USen"];
    const price = item.price;
    const newItem = { name, price };
    this.setState({
      selItems: [...this.state.selItems, newItem],
    });

    this.createPocketArray(price);
  };

  // creates array of selected items
  createPocketArray = (p) => {
    this.setState({
      pockets: [...this.state.pockets, p],
    });
  };

  // calculates total of selected items
  calculateTotal = () => {
    const total = this.state.pockets;
    const sum = total.reduce(function (a, b) {
      return a + b;
    }, 0);
    this.setState({
      total: sum,
    });
  };

  // clears selected items
  clearPockets = () => {
    this.setState({
      selItems: [],
    });
    this.setState({
      pockets: [],
    });
    this.setState({
      total: "",
    });
  };

  render() {
    return (
      <main>
        <aside>
          <div>
            <h2>Fish</h2>
            <button id="fish" onClick={(e) => this.getItems(e.target.id)}>
              Get Fish
            </button>
          </div>
          <div>
            <h2>Sea Creatures</h2>
            <button id="sea" onClick={(e) => this.getItems(e.target.id)}>
              Get Sea Creatures
            </button>
          </div>
          <div>
            <h2>Bugs</h2>
            <button id="bugs" onClick={(e) => this.getItems(e.target.id)}>
              Get Bugs
            </button>
          </div>
          <div>
            <h2>Fossils</h2>
            <button id="fossils" onClick={(e) => this.getItems(e.target.id)}>
              Get Fossils
            </button>
          </div>
          <div id="items-list">
            <ul id="list"></ul>
          </div>
        </aside>
        <section>
          <h2>Items</h2>
          <ul>
            {this.state.items.map((item, i) => (
              <li key={i}>
                {item[1].name["name-USen"]} — Bells: ${item[1].price}{" "}
                <button onClick={() => this.addToPockets(item[1])}>+</button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Pockets</h2>
          <button onClick={this.clearPockets}>Clear pockets</button>
          <ul>
            {this.state.selItems.map((item, i) => (
              <li key={i}>
                {item.name} — Bells: ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={this.calculateTotal}>Get Total</button>
          <hr />
          <div>
            <p>Total: ${this.state.total === false ? "" : this.state.total}</p>
          </div>
        </section>
      </main>
    );
  }
}
