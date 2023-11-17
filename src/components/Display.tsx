import React from 'react';

interface DisplayProps {
    count: number;
    maxNum: number;
    minNum: number;
}

export const Display: React.FC<DisplayProps> = React.memo(({ count, maxNum, minNum }) => {
    const isRed = count === maxNum || count < 0 || minNum >= maxNum ? { color: '#ab1717' } : { color: 'inherit' };
    const value = maxNum < 0 || minNum >= maxNum ? "Entered invalid values and press 'set'" : String(minNum);
    console.log({ count });

    return (
        <div className="display count">
            <div style={isRed}>
                {count}
                {maxNum < 0 && <p style={{ fontSize: '20px', color: '#ab1717' }}>{value}</p>}
            </div>
        </div>
    );
});