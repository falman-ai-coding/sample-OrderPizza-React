import React, { useState, useEffect } from "react";

const ProductList = () => {
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizzas, setSelectedPizzas] = useState([]);

  useEffect(() => {
    fetch("/pizzas.json")
      .then(res => res.json())
      .then(data => {
        setPizzas(data.pizzas);
      });
  }, []);

  const handleClick = pizza => {
    const selectedIndex = selectedPizzas.indexOf(pizza);
    if (selectedIndex === -1) {
      setSelectedPizzas([...selectedPizzas, pizza]);
      setTotalCalories(totalCalories + pizza.calories);
      setTotalPrice(totalPrice + pizza.price);
    } else {
      setSelectedPizzas(
        selectedPizzas.filter((_, index) => index !== selectedIndex)
      );
      setTotalCalories(totalCalories - pizza.calories);
      setTotalPrice(totalPrice - pizza.price);
    }
  };

  return (
    <div id="productlist">
      {pizzas.map(pizza => (
        <div
          key={pizza.name}
          style={{ backgroundColor: selectedPizzas.includes(pizza) ? "red" : "" }}
          onClick={() => handleClick(pizza)}
        >
          <img src={pizza.imageUrl} alt={pizza.name} />
          <p>{pizza.name}</p>
          <p>Calories: {pizza.calories}</p>
          <p>Price: {pizza.price}</p>
        </div>
      ))}
      <div>
        Total Calories: {totalCalories}
        <br />
        Total Price: {totalPrice}
        <br />
        <button>Order</button>
      </div>
    </div>
  );
};

export default ProductList;
