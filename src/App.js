import React from "react";
import config from "./Config/config";
import "./App.css";

export default class App extends React.Component {
  state = {
    items: [],
    indItem: [],
  };

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

  addToBasket = (item) => {
    const name = item.name["name-USen"];
    const price = item.price;
    const newItem = { name, price };
    this.setState({
      indItem: [...this.state.indItem, newItem],
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
          <ul>
            {this.state.items.map((item, i) => (
              <li key={i}>
                {item[1].name["name-USen"]} — ${item[1].price}{" "}
                <button onClick={() => this.addToBasket(item[1])}>+</button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Basket</h2>
          <ul>
            {this.state.indItem.map((i) => (
              <li>
                {i.name} — Bells: ${i.price}
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
  }
}
