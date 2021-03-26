import React from "react";
import config from "./Config/config";
import "./App.css";

export default class App extends React.Component {
  state = {
    items: [],
    itemType: [],
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
        const alphabetizedList = list.sort();
        this.setItemType(item);
        this.setState({
          items: alphabetizedList,
        });
      });
  };

  setItemType = (i) => {
    if (i.includes("sea")) {
      const item = "Sea Creatures";
      this.setState({
        itemType: item,
      });
    } else {
      const item = i.charAt(0).toUpperCase() + i.slice(1);
      this.setState({
        itemType: item,
      });
    }
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

    const newSum = sum.toLocaleString();

    this.setState({
      total: newSum,
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
      <React.Fragment>
        <header>
          <div className="logo">
            <h1>Animal Crossing: New Horizons Bells Calculator</h1>
          </div>
        </header>
        <menu>
          <div>
            <h2>
              <button id="fish" onClick={(e) => this.getItems(e.target.id)}>
                Fish
              </button>
            </h2>
          </div>
          <div>
            <h2>
              <button id="sea" onClick={(e) => this.getItems(e.target.id)}>
                Sea Creatures
              </button>
            </h2>
          </div>
          <div>
            <h2>
              <button id="bugs" onClick={(e) => this.getItems(e.target.id)}>
                Bugs
              </button>
            </h2>
          </div>
          <div>
            <h2>
              <button id="fossils" onClick={(e) => this.getItems(e.target.id)}>
                Fossils
              </button>
            </h2>
          </div>
          <div id="items-list">
            <ul id="list"></ul>
          </div>
        </menu>
        <main>
          <section>
            <div className="section-header">
              <h2>Items</h2>
            </div>
            <div className="items-container">
              <div className="items">
                <div>
                  <h3>{this.state.itemType}</h3>
                </div>{" "}
                <ul>
                  {this.state.items.map((item, i) => (
                    <li key={i}>
                      <p>
                        {item[1].name["name-USen"]} — <b>Bells:</b> $
                        {item[1].price}{" "}
                        <button
                          className="add-to-pockets"
                          onClick={() => this.addToPockets(item[1])}
                        >
                          +
                        </button>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section>
            <div className="section-header">
              <h2>Pockets</h2>
            </div>
            <div className="pockets-container">
              <div className="pockets-section">
                <div className="clear-pockets">
                  <button
                    className="pockets-buttons"
                    onClick={this.clearPockets}
                  >
                    clear pockets
                  </button>
                </div>
                <ul>
                  {this.state.selItems.map((item, i) => (
                    <li key={i}>
                      <p>
                        {item.name} — <b>Bells:</b> ${item.price}
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="total">
                  <button
                    className="pockets-buttons"
                    onClick={this.calculateTotal}
                  >
                    get total
                  </button>
                </div>
                <div>
                  <p className="total-sum">
                    <b>Total:</b> $
                    {this.state.total === false ? "" : this.state.total}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </React.Fragment>
    );
  }
}
