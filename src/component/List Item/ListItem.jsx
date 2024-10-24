import React, { useState } from 'react';
import './ListItem.css';

const ListItem = () => {
  const [steps, setSteps] = useState([{ id: 1, description: '' }]); 

  const handleAddStep = () => {
    setSteps([
      ...steps,
      { id: steps.length + 1, description: '' }, 
    ]);
  };

  return (
    <div className='list-item'>
      <h2>List Item</h2>

      <div className="add-step">
        <button onClick={handleAddStep}>Add Step</button>
      </div>

      {steps.map((step, index) => (
        <div key={index} className="list-step">
          <p>Step {step.id}</p>
          <div className="list-step-input">
            <input
              type="text"
              placeholder={`Description to Step ${step.id}`}
              value={step.description}
              onChange={(e) => {
                const newSteps = [...steps];
                newSteps[index].description = e.target.value;
                setSteps(newSteps);
              }}
            />
          </div>
          <span className='line'></span>
        </div>
      ))}
    </div>
  );
};

export default ListItem;
