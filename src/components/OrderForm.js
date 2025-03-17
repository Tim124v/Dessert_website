import React, { useState } from 'react';

function OrderForm({ cake }) {
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь добавьте логику отправки заказа
    alert('Заказ отправлен!');
  };

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Оформление заказа: {cake.name}</h2>
      <input
        type="text"
        name="name"
        placeholder="Ваше имя"
        value={orderData.name}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        value={orderData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Адрес доставки"
        value={orderData.address}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={orderData.date}
        onChange={handleChange}
        required
      />
      <textarea
        name="comments"
        placeholder="Комментарии к заказу"
        value={orderData.comments}
        onChange={handleChange}
      />
      <button type="submit">Заказать</button>
    </form>
  );
}

export default OrderForm; 