// calculation
// components
// styling
// primary app colour index.css - placeholder global var
// Rounded
// BEM
// classNames

// Only submit after
// Removing materials

import { useState } from 'react';
import './MaterialList.css';

const MaterialsList = function () {
  // eslint-disable-next-line no-unused-vars
  const [materialName, setMaterialName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [materials, setMaterials] = useState([
    { materialName: 'wood', unit: '3', price: '2.00' },
    { materialName: 'metal', unit: '1', price: '1.00' },
    { materialName: 'stone', unit: '5', price: '3.00' }
  ]);

  // Placeholder materials data

  const handleSubmit = (e) => {
    e.preventDefault();
    const materialList = { materialName, unit, price };
    setMaterials([materialList, ...materials]);
    setMaterialName('');
    setUnit('');
    setPrice('');

    // Make POST request to firebase
  };

  if (materials.length === 0) {
    return <p>Please add item to the materials list</p>;
  }

  let count = 0;

  // eslint-disable-next-line no-unused-vars
  const calculatePrice = materials.forEach((material) => {
    const convertToNum = Number(material.price);
    count += convertToNum;
  });

  return (
    <div className="container__MaterialsList">
      <h1>Materials List</h1>
      <h2>Job placeholder</h2>
      <ul className="jobMaterialList">
        {/* materials state, iterate through that the return price etc */}
        {/* check if someone is 0 if 0 put basic field in there, otherwise pop with mat */}
        {materials.map((item) => (
          <div className="itemListContainer__materialList">
            <li className="itemList__materialList">
              {item.materialName}, {item.unit}, {item.price}
            </li>
            <button type="submit" className="deleteBtn__materialList">
              ❌{/* Make delete request using firebase */}
            </button>
          </div>
        ))}
      </ul>

      <div className="calculator__materialsList">
        <p>{`£${totalPrice}`}</p>
        <button type="submit" onClick={() => setTotalPrice(count.toFixed(2))}>
          Total
        </button>
      </div>

      <div className="form__container__materialsList">
        <h2>Add new Materials</h2>
        {/* Put labels in */}
        <form onSubmit={handleSubmit} className="form__materialsList">
          {/* Populate material list don't mutate the state,once subitted, clear the state   */}
          <input
            type="text"
            required
            placeholder="Material name..."
            value={materialName}
            className="formBox__materialsList"
            onChange={(e) => setMaterialName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Units..."
            value={unit}
            className="formBox__materialsList"
            onChange={(e) => setUnit(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price..."
            value={price}
            className="formBox__materialsList"
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="btn__materialList">
            <button type="submit">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaterialsList;
