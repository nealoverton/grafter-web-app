const ReadOnlyRow = function ({ item, handleEditClick }) {
  return (
    <tr>
      <td>{item.materialName}</td>
      <td>{item.unit}</td>
      <td>{item.price}</td>
      <td>
        <button type="button" onClick={(e) => handleEditClick(e, item)}>
          Edit{' '}
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
