import React from 'react';
import './scss/app.scss';
import Home from './pages/Home';
// import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import('./pages/Cart'))

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={
        <React.Suspense fallback={<div>Loading...</div>}>
          <Cart />
        </React.Suspense>
        } />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
