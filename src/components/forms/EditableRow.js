const EditableRow = function ({ editFormData, handleEditFormChange, handleCancelClick }) {
  return (
    <tr>
      <td>
        <input
          type="text"
          required
          placeholder="Enter a material..."
          name="materialName"
          value={editFormData.materialName}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Enter a unit..."
          name="unit"
          value={editFormData.unit}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Enter a price..."
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
