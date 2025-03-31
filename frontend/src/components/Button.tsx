import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
    return (
        <button onClick={onClick} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            {label}
        </button>
    );
};

export default Button;