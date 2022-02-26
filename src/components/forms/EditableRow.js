const EditableRow = function () {
  return (
    <tr>
      <td>
        <input type="text" required placeholder="Enter material..." name="materialName" />
      </td>
      <td>
        <input type="text" required placeholder="Enter unit..." name="unit" />
      </td>
      <td>
        <input type="text" required placeholder="Enter price..." name="price" />
      </td>
    </tr>
  );
};

export default EditableRow;
