const ReadOnlyRow = function ({ item }) {
  return (
    <tr>
      <td>{item.materialName}</td>
      <td>{item.unit}</td>
      <td>{item.price}</td>
    </tr>
  );
};

export default ReadOnlyRow;
