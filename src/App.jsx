import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import React from 'react';

const App = () => {
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
            <PizzaBlock price={14} title={'Cheeseburger-pizza'} />
            <PizzaBlock price={18} title={'Mexican'} />
            <PizzaBlock price={13} title={'Pepperoni'} />
            <PizzaBlock price={22} title={'Cesar'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
