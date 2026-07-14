// BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';
import { X } from 'lucide-react';
import { useStore } from '../store';

export const BaseNode = ({
  id,
  title,
  icon: Icon,
  handles = [],
  children,
  selected,
  colorTheme = 'blue', // 'blue' (sky), 'green' (mint), 'purple' (lavender), 'orange' (peach), 'red' (rose)
  style = {},
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  // ElevenLabs Pastel Color Mapping for handles and subtle highlights
  const themeColors = {
    blue: '#a8c8e8',     // Sky
    green: '#a7e5d3',    // Mint
    purple: '#c8b8e0',   // Lavender
    orange: '#f4c5a8',   // Peach
    red: '#e8b8c4',      // Rose
    teal: '#a7e5d3',     // Mint
    pink: '#e8b8c4',     // Rose
    indigo: '#c8b8e0',   // Lavender
  };

  const activeColor = themeColors[colorTheme] || themeColors.blue;

  return (
    <div
      className={`custom-node ${selected ? 'selected' : ''}`}
      style={{
        position: 'relative',
        padding: '16px',
        borderRadius: '16px', // rounded.xl
        background: '#ffffff', // Surface Card
        border: `1px solid ${selected ? '#0c0a09' : '#e7e5e4'}`, // Hairline / Ink
        boxShadow: selected 
          ? '0 8px 24px rgba(12, 10, 9, 0.08)' 
          : '0 4px 16px rgba(0, 0, 0, 0.02)',
        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        color: '#0c0a09', // Ink
        fontFamily: "'Inter', sans-serif",
        ...style,
      }}
    >
      {/* Node Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          borderBottom: '1px solid #f0efed', // Hairline Soft
          paddingBottom: '8px',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <Icon size={15} style={{ color: activeColor }} />}
          <span style={{ 
            fontFamily: "'EB Garamond', 'Times New Roman', serif", 
            fontWeight: 500, 
            fontSize: '15px', 
            letterSpacing: '-0.2px',
            color: '#0c0a09'
          }}>
            {title}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (deleteNode) deleteNode(id);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#a8a29e', // Muted Soft
            cursor: 'pointer',
            padding: '2px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
          className="delete-node-btn"
          title="Delete Node"
        >
          <X size={14} />
        </button>
      </div>

      {/* Node Body */}
      <div className="node-body" style={{ fontSize: '12px', color: '#4e4e4e', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>

      {/* Handles */}
      {handles.map((handle, idx) => {
        const { type, position, id: handleId, style: handleStyle, label } = handle;
        const isLeft = position === Position.Left;
        
        return (
          <div key={handleId || idx}>
            <Handle
              type={type}
              position={position}
              id={handleId}
              style={{
                background: activeColor,
                width: '8px',
                height: '8px',
                border: '1px solid #d6d3d1', // Hairline Strong
                borderRadius: '50%',
                ...handleStyle,
              }}
            />
            {label && (
              <span
                style={{
                  position: 'absolute',
                  top: handleStyle?.top || '50%',
                  transform: 'translateY(-50%)',
                  left: isLeft ? '-80px' : 'auto',
                  right: !isLeft ? '-80px' : 'auto',
                  width: '72px',
                  textAlign: isLeft ? 'right' : 'left',
                  fontSize: '10px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  color: '#777169', // Muted
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
                title={label}
              >
                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
