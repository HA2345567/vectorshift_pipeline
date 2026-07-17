// conditionNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Split } from 'lucide-react';
import { useStore } from '../store';

export const ConditionNode = ({ id, data, selected }) => {
  const [operator, setOperator] = useState(data?.operator || '==');
  const [value, setValue] = useState(data?.value || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleOperatorChange = (e) => {
    const val = e.target.value;
    setOperator(val);
    updateNodeField(id, 'operator', val);
  };

  const handleValueChange = (e) => {
    const val = e.target.value;
    setValue(val);
    updateNodeField(id, 'value', val);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input`, label: 'input' },
    { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '35%' }, label: 'true' },
    { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '65%' }, label: 'false' }
  ];

  return (
    <BaseNode
      id={id}
      title="Conditional (If/Else)"
      icon={Split}
      handles={handles}
      selected={selected}
      colorTheme="red"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>
          Branch based on comparison.
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <select
            value={operator}
            onChange={handleOperatorChange}
            className="node-select"
            style={{ width: '65px', minWidth: 'unset' }}
          >
            <option value="==">==</option>
            <option value="!=">!=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="contains">contains</option>
          </select>
          <input
            type="text"
            value={value}
            onChange={handleValueChange}
            placeholder="Value"
            className="node-input"
            style={{ flexGrow: 1 }}
          />
        </div>
      </div>
    </BaseNode>
  );
}
