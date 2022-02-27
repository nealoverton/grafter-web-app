const EditableRow = function ({ editFormData, handleEditFormChange }) {
  console.log(editFormData, '<<<formData');
  console.log(handleEditFormChange, '<<<edit func');

  console.log(editFormData.materialName, '<<<formData name');

  return (
    <tr>
      <td>
        <input
          type="text"
          required
          placeholder="Enter material..."
          name="materialName"
          value={editFormData.materialName}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Enter unit..."
          name="unit"
          value={editFormData.unit}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Enter price..."
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type="submit">Save</button>
      </td>
    </tr>
  );
};

export default EditableRow;
