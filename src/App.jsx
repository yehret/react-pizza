import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

const App = () => {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">All pizzas</h2>
          <div class="content__items">
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
