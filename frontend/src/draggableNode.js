// draggableNode.js
import React from 'react';

export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '110px',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 16px',
        borderRadius: '9999px', /* rounded.pill */
        backgroundColor: '#ffffff',
        border: '1px solid #e7e5e4', /* hairline */
        justifyContent: 'flex-start',
        transition: 'all 0.2s ease',
        userSelect: 'none',
        boxSizing: 'border-box'
      }}
      draggable
    >
      {Icon && <Icon size={14} style={{ color: '#777169' }} className="node-icon" />}
      <span style={{ color: '#0c0a09', fontSize: '12px', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{label}</span>
    </div>
  );
};