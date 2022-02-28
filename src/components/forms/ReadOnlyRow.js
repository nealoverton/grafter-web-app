const ReadOnlyRow = function ({ item, handleEditClick, handleDeleteClick }) {
  return (
    <tr>
      <td>{item.materialName}</td>
      <td>{item.unit}</td>
      <td>{item.price}</td>
      <td>
        <button type="button" onClick={(e) => handleEditClick(e, item)}>
          Edit{' '}
        </button>
        <button type="button" onClick={() => handleDeleteClick(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;