import React, {useCallback} from 'react';
import {Display} from "./Display";
import {Button} from "../button/Button";
import {useDispatch} from "react-redux";
import {increment, reset} from "../../store/counterReducer";

type CounterPropsType = {
    maxValue: number
    minValue: number
    isCorrectValue: boolean
    count: number
}


export const Counter: React.FC<CounterPropsType>= ({
                                                       maxValue,
                                                       minValue,
                                                       isCorrectValue,
                                                       count
                                                   }) => {

    const dispatch = useDispatch();

    const incHandler = useCallback(() => {
        if (count < maxValue) {
            dispatch(increment());
        }
    }, [count, maxValue, dispatch]);
    const resetHandler = useCallback(() => {
        dispatch(reset(minValue));
    }, [minValue, dispatch]);

    return (
        <div className="counter-wrapper">
            <Display count={count} maxNum={maxValue} minNum={minValue} />

            <div className="button-wrapper">
                <Button callback={incHandler} name="inc" disabled={!isCorrectValue || count === maxValue} />
                <Button callback={resetHandler} name="reset" disabled={!isCorrectValue || count === minValue} />
            </div>
        </div>
    );
};

