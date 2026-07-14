// outputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Upload } from 'lucide-react';
import { useStore } from '../store';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, 'outputName', value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setOutputType(value);
    updateNodeField(id, 'outputType', value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` }
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={Upload}
      handles={handles}
      selected={selected}
      colorTheme="green"
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
          <select value={outputType} onChange={handleTypeChange} className="node-select">
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
