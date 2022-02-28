const ReadOnlyRow = function ({ item, handleEditClick, handleDeleteClick }) {
  return (
    <tr>
      <td>{item.materialName}</td>
      <td>{item.unit}</td>
      <td>{item.price}</td>
      <td>
        <button
          type="button"
          onClick={(e) => handleEditClick(e, item)}
          className="actionBtn__materialList btnSmall"
        >
          Edit{' '}
        </button>
        <button
          type="button"
          onClick={() => handleDeleteClick(item.id)}
          className="actionBtn__materialList btnSmall"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
