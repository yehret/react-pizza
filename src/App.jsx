import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import axios from 'axios';

import React from 'react';

const App = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('https://63fcb034859df29986c23c24.mockapi.io/pizzas')
      .then((res) => setItems(res.data));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {items.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
