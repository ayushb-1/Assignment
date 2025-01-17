import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

interface CustomNodeProps {
    data: {
        label: string;
        onDrop: (hobby: string, userId: string) => void;
        userId: string;
        hobbies: string[];
    };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const hobby = event.dataTransfer.getData('text/plain');
        if (hobby && !data.hobbies.includes(hobby)) {
            data.onDrop(hobby, data.userId);
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    return (
        <div 
            onDrop={handleDrop} 
            onDragOver={handleDragOver} 
            style={{ 
                padding: '15px',
                border: '2px solid #2196F3',
                borderRadius: '8px',
                backgroundColor: '#E3F2FD',
                minWidth: '150px'
            }}
        >
            <Handle 
                type="source"
                position={Position.Right}
                style={{ background: '#2196F3' }}
            />
            <div style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#1976D2',
                textAlign: 'center'
            }}>
                {data.label}
            </div>
        </div>
    );
};

export default CustomNode;