import React from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={activeIndex === index ? 'active' : ''}>
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
