import React from 'react';

function CakeList({ onSelectCake }) {
  const cakes = [
    {
      id: 1,
      name: "Шоколадный торт",
      price: 2500,
      image: "/images/chocolate-cake.jpg",
      description: "Нежный шоколадный бисквит с кремом"
    },
    {
      id: 2,
      name: "Фруктовый торт",
      price: 2800,
      image: "/images/fruit-cake.jpg",
      description: "Воздушный торт со свежими фруктами"
    },
    // Добавьте больше тортов по желанию
  ];

  return (
    <div className="cake-list">
      {cakes.map(cake => (
        <div key={cake.id} className="cake-card" onClick={() => onSelectCake(cake)}>
          <img src={cake.image} alt={cake.name} />
          <h3>{cake.name}</h3>
          <p>{cake.description}</p>
          <p className="price">{cake.price} ₽</p>
        </div>
      ))}
    </div>
  );
}

export default CakeList; 