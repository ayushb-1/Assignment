import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

interface HobbyNodeProps {
    data: {
        label: string;
    };
}

const HobbyNode: React.FC<HobbyNodeProps> = ({ data }) => (
    <div style={{ 
        padding: '10px',
        border: '1px solid #4CAF50',
        borderRadius: '8px',
        backgroundColor: '#E8F5E9',
        minWidth: '100px',
        textAlign: 'center'
    }}>
        <Handle 
            type="target"
            position={Position.Left}
            style={{ background: '#4CAF50' }}
        />
        <div style={{ 
            fontSize: '14px',
            fontWeight: 500,
            color: '#2E7D32'
        }}>
            {data.label}
        </div>
    </div>
);

export default HobbyNode;