import React, { useState } from 'react';
import './Table.css';
import { MdMoreVert, MdClose } from 'react-icons/md';

const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();
  const [tableData, setTableData] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleCreateTableClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTable = (e) => {
    e.preventDefault();
    const newTableData = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => '')
    );
    setTableData(newTableData);
    setIsModalOpen(false); // Close the modal
  };

  const handleMoreClick = (index) => {
    setSelectedRowIndex(index);
  };

  const handleInsertAbove = () => {
    const newRow = Array.from({ length: columns }, () => '');
    const newTableData = [...tableData];
    newTableData.splice(selectedRowIndex, 0, newRow);
    setTableData(newTableData);
    setSelectedRowIndex(null); // Reset after action
  };

  const handleInsertBelow = () => {
    const newRow = Array.from({ length: columns }, () => '');
    const newTableData = [...tableData];
    newTableData.splice(selectedRowIndex + 1, 0, newRow);
    setTableData(newTableData);
    setSelectedRowIndex(null); // Reset after action
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = value;
    setTableData(newTableData);
  };

  return (
    <div className='table-create'>
      <h2>Dynamic Table</h2>
      <div className="table-box">
        <div>
          <button onClick={handleCreateTableClick}>Create Table</button>
        </div>
        <section className='table-r-c'>
          <table>
            <tbody>
              {tableData.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  <td className='more-icon'>
                    <MdMoreVert onClick={() => handleMoreClick(rowIndex)} />
                    {selectedRowIndex === rowIndex && (
                      <div className='more-actions'>
                        <button onClick={handleInsertAbove}>Insert Above</button>           
                        <button onClick={handleInsertBelow}>Insert Below</button>
                      </div>
                    )}
                  </td>
                  {rowData.map((cellData, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="text"
                        value={cellData}
                        onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close-icon' onClick={handleCloseModal}><MdClose /></span>
            <h3>Create New Table</h3>
            <form onSubmit={handleCreateTable}>
              <div className='form-group'>
                <label>Number of Rows :</label>
                <input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div className='form-group'>
                <label>Number of Columns :</label>
                <input
                  type="number"
                  value={columns}
                  onChange={(e) => setColumns(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div className='form-actions'>
                <button type="submit">Create Table</button>
                <button type="button" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
