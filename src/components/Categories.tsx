import React from 'react';

type CategoriesProps = {
  value: number,
  onClickCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={value === index ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
})

export default Categories;
