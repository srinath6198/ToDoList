import React, { useState } from 'react';
import './ToDoList.css';
import { MdDelete } from 'react-icons/md';

const ToDoList = () => {
  const [qaList, setQaList] = useState([{ question: '', answer: '' }]);
  const [savedQAList, setSavedQAList] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updatedList = [...qaList];
    updatedList[index][field] = value;
    setQaList(updatedList);
  };

  const handleAddNewQA = () => {
    setQaList([...qaList, { question: '', answer: '' }]);
  };

  const handleDeleteQA = (index) => {
    // Remove from input list
    const updatedList = qaList.filter((_, i) => i !== index);
    setQaList(updatedList);

    // Remove from saved list if it exists
    const updatedSavedList = savedQAList.filter((_, i) => i !== index);
    setSavedQAList(updatedSavedList);
  };

  const handleSave = () => {
    const filledQAs = qaList.filter(
      (qa) => qa.question.trim() && qa.answer.trim()
    );
    setSavedQAList(filledQAs);
  };

  return (
    <div className="todolist">
      <p className='p'>Q&A List</p>
      <div className="todolist-box">
        <div className="todolist-right">
          <div className="btn">
            <button className="btn-add" onClick={handleAddNewQA}>
              Add New Q&A
            </button>
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
          <div className="todolist-qa">
            {qaList.map((qa, index) => (
              <div key={index} className="qa-item">
                <span className="del-icon" onClick={() => handleDeleteQA(index)}>
                  <MdDelete />
                </span>
                <div className="todo-form">
                  <form>
                    <label>Question</label> <br />
                    <input
                      className="input"
                      type="text"
                      value={qa.question}
                      onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                    />
                    <br />
                    <label>Answer</label> <br />
                    <input
                      className="input"
                      type="text"
                      value={qa.answer}
                      onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                    />
                    <br />
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="todolist-left">
          <h2>Q&A List Preview</h2>
          {savedQAList.length === 0 ? (
            <span>No Q&As</span>
          ) : (
            <ul>
              {savedQAList.map((qa, index) => (
                <li key={index} className="qa-item">
                  <div className="qa-content">
                    <p>
                       {qa.question}
                    </p>
                    <p>
                      {qa.answer}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
