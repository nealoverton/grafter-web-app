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
          className="tableInput__materialList"
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
          className="tableInput__materialList"
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Enter a price..."
          name="price"
          value={editFormData.price}
          className="tableInput__materialList"
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type="submit" className="actionBtn__materialList btnSmall">
          Save
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="actionBtn__materialList btnSmall"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
