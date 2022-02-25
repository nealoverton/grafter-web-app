// calculation
// components
// styling
// primary app colour index.css - placeholder global var
// Rounded
// BEM
// classNames

import { useState } from 'react';

const MaterialsList = function () {
  const [materialName, setMaterialName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Placeholder for calculator
  const materials = [{ price: '4.70' }, { price: '8.67' }, { price: '2.05' }];

  const handleSubmit = (e) => {
    e.preventDefault();
    const materialList = { materialName, unit, price };

    console.log(materialList);
    // Make POST request to firebase
  };

  let count = 0;

  // eslint-disable-next-line no-unused-vars
  const calculatePrice = materials.forEach((material) => {
    const convertToNum = Number(material.price);
    count += convertToNum;
  });

  return (
    <div className="conatiner__MaterialsList">
      <h1>Materials List</h1>
      <h2>Job placeholder</h2>
      <div className="jobMaterialList">
        <p>{materialName}</p>
        <p>{unit}</p>
        <p>{price}</p>
      </div>

      <div className="calculator__materialsList">
        <p>{`£${totalPrice}`}</p>
        <button type="submit" onClick={() => setTotalPrice(count.toFixed(2))}>
          Total
        </button>
      </div>

      <div className="form__materialsList">
        <h2>Add new Materials</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Material name..."
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Units..."
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default MaterialsList;
