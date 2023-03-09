import React, { useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import { sortList } from '../components/Sort';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const { categoryId, sort, searchValue } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [currentPage, setCurrentPage] = React.useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    await dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);

    // axios
    //   .get(
    //     `https://63fcb034859df29986c23c24.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //   });
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, navigate, sort.sortProperty]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
    }
    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, currentPage, navigate, sort.sortProperty]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error has occurred 😕</h2>
          <p>Failed to get pizzas. Try again after a few minutes</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
