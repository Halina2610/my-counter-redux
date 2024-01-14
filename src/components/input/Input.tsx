import React, { ChangeEvent } from 'react';
import '../../App.css';

type SetInputPropsType = {
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    noInvalidValue?: boolean
};

export const Input: React.FC<SetInputPropsType> = ({
                                                          value,
                                                          onChange,
                                                          noInvalidValue,
                                                      }) => {
    const isRed = {
        border:
            noInvalidValue
                ? '5px solid #ab1717'
                : '3px solid #0e4f4f',
        backgroundColor:
            noInvalidValue
                ? '#f696c6'
                : '#6ae0e0',
    };

    return (
        <div>
            <input
                className="input"
                style={isRed}
                type="number"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};