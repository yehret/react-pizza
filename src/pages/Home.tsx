import React, { useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import {
  setCategoryId,
  setFilters,
  setCurrentPage,
} from '../redux/filter/slice';

import { selectFilter } from '../redux/filter/selectors';
import { useSelector } from 'react-redux';
import { sortList } from '../components/Sort';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { useAppDispatch } from '../redux/store';
import { SearchPizzaParams } from '../redux/pizza/types';
import { selectPizzaData } from '../redux/pizza/selectors';

const Home: React.FC = () => {
  const { categoryId, sort, searchValue, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, [dispatch])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

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
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || sortList[0],
      }));
    }
    isSearch.current = true;
  }, [dispatch]);

  React.useEffect(() => {
    const getPizzas = async () => {
      const order = sortType.includes('-') ? 'asc' : 'desc';
      const sortBy = sortType.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `search=${searchValue}` : '';
  
      await dispatch(
        // @ts-ignore  - temporarily
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage: String(currentPage),
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

    getPizzas();
  }, [categoryId, currentPage, dispatch, searchValue, sortType]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort}/>
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

      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Home;