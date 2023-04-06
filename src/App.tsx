import React, { Suspense } from 'react';
import './scss/app.scss';
import Home from './pages/Home';
// import Cart from './pages/Cart';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "cart" */'./pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "fullpizza" */'./pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "notfound" */'./pages/NotFound'))


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        } />
        <Route path="pizza/:id" element={
          <Suspense fallback={<div>Loading...</div>}>
            <FullPizza />
          </Suspense>} />
        <Route path="*" element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>} />
      </Route>
    </Routes>
  );
};

export default App;
