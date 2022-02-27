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
import EditableRow from '../components/forms/EditableRow';
import ReadOnlyRow from '../components/forms/ReadOnlyRow';
import './MaterialList.css';

const MaterialsList = function () {
  // eslint-disable-next-line no-unused-vars
  const [materialName, setMaterialName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [materials, setMaterials] = useState([
    { materialName: 'wood', unit: '3', price: '2.00', id: 1 },
    { materialName: 'metal', unit: '1', price: '1.00', id: 2 },
    { materialName: 'stone', unit: '5', price: '3.00', id: 3 }
  ]);

  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    materialName: '',
    unit: '',
    price: ''
  });

  // Placeholder materials data

  const handleSubmit = (e) => {
    e.preventDefault();
    const materialList = { materialName, unit, price };
    setMaterials([...materials, materialList]);
    setMaterialName('');
    setUnit('');
    setPrice('');

    // Make POST request to firebase
  };

  const handleEditFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('materialName');
    const fieldValue = e.target.value;

    const newFormdata = { ...editFormData };
    newFormdata[fieldName] = fieldValue;

    setEditFormData(newFormdata);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedMaterial = {
      materialName: editFormData.materialName,
      unit: editFormData.unit,
      price: editFormData.price,
      id: editMaterialId
    };

    const newMaterials = [...materials];

    const index = materials.findIndex((material) => material.id === editMaterialId);

    newMaterials[index] = editedMaterial;

    setMaterials(newMaterials);
    setEditMaterialId(null);
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

  const handleEditClick = (e, material) => {
    console.log(material, '<<<');
    e.preventDefault();
    setEditMaterialId(material.id);

    const formValues = {
      materialName: material.materialName,
      unit: material.unit,
      price: material.price
    };
    setEditFormData(formValues);
    console.log(editFormData);
  };

  return (
    <div className="container__MaterialsList">
      <h1>Materials List</h1>
      <h2>Job placeholder</h2>
      {/* materials state, iterate through that the return price etc */}
      {/* check if someone is 0 if 0 put basic field in there, otherwise pop with mat */}
      <div className="table__materialsList">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Units</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item) =>
                editMaterialId === item.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                  />
                ) : (
                  <ReadOnlyRow item={item} handleEditClick={handleEditClick} />
                )
              )}
            </tbody>
          </table>
        </form>
      </div>

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
