// inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Download } from 'lucide-react';
import { useStore } from '../store';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'inputName', value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setInputType(value);
    updateNodeField(id, 'inputType', value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` }
  ];

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={Download}
      handles={handles}
      selected={selected}
      colorTheme="blue"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className="node-label">
          <span>Name</span>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="node-input"
          />
        </label>
        <label className="node-label">
          <span>Type</span>
          <select value={inputType} onChange={handleTypeChange} className="node-select">
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
