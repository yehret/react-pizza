import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63fcb034859df29986c23c24.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('An error has occurred');
        navigate('/');
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className="container">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="pizzaImg" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} UAH</h4>
    </div>
  );
};

export default FullPizza;
