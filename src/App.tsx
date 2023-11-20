import React, { useEffect, useCallback, ChangeEvent, useMemo } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Display } from './components/counter/Display';
import { Button } from './components/Button';
import { SetInput } from "./components/setting/SetInput";
import { increment, reset } from "./store/counterReducer";
import { changeMaxValue, changeMinValue } from "./store/settingReducer";
import {RootStateType} from "./store/store";

function App() {
    const count = useSelector((state: RootStateType) => state.counter.count);
    const maxValue = useSelector((state: RootStateType) => state.setting.maxValue);
    const minValue = useSelector((state: RootStateType) => state.setting.minValue);

    const dispatch = useDispatch();

    useEffect(() => {
        const localMaxValueNum = localStorage.getItem('counterLimits');
        if (localMaxValueNum) {
            const parsedValue = JSON.parse(localMaxValueNum);
            dispatch(changeMaxValue(parsedValue[0]));
            dispatch(changeMinValue(parsedValue[1]));
            dispatch(reset(parsedValue[1]));
        }
    }, [dispatch]);

    const incHandler = useCallback(() => {
        if (count < maxValue) {
            dispatch(increment());
        }
    }, [count, maxValue, dispatch]);

    const resetHandler = useCallback(() => {
        dispatch(reset(minValue));
    }, [minValue, dispatch]);

    const changeMaxValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        dispatch(changeMaxValue(newValue));
    }, [dispatch]);

    const changeMinValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        dispatch(changeMinValue(newValue));
    }, [dispatch]);

    const isCorrectValue = useMemo(
        () => maxValue > 0 && minValue >= 0 && maxValue > minValue, [maxValue, minValue]);

    const setLimitsHandler = useCallback(() => {
        if (isCorrectValue) {
            const limits = [maxValue, minValue];
            localStorage.setItem('counterLimits', JSON.stringify(limits));
            if (count < minValue) {
                dispatch(reset(minValue));
            }
        }
    }, [isCorrectValue, maxValue, minValue, count, dispatch]);

    return (
        <div className="App">
            <div className="counter-wrapper">
                <div>max value:</div>
                <SetInput value={maxValue} onChange={changeMaxValueHandler} minValue={minValue} maxValue={maxValue} />
                <div>start value:</div>
                <SetInput value={minValue} onChange={changeMinValueHandler} minValue={minValue} maxValue={maxValue} />

                <div className="button-wrapper">
                    <Button name="set" callback={setLimitsHandler} disabled={!isCorrectValue} />
                </div>
            </div>

            <div className="counter-wrapper">
                <Display count={count} maxNum={maxValue} minNum={minValue} />

                <div className="button-wrapper">
                    <Button callback={incHandler} name="inc" disabled={!isCorrectValue || count === maxValue} />
                    <Button callback={resetHandler} name="reset" disabled={!isCorrectValue || count === minValue} />
                </div>
            </div>
        </div>
    );
}

export default App;