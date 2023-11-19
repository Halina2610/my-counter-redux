import React, { useEffect, useCallback, ChangeEvent, useReducer } from 'react';
import './App.css';
import { Display } from './components/counter/Display';
import { Button } from './components/Button';
import { SetInput } from "./components/setting/SetInput";
import counterReducer, { CounterState, increment, reset } from "./store/counterReducer";
import settingReducer, { SettingState, changeMaxValue, changeMinValue } from "./store/settingReducer";

const initialState: CounterState = {
    count: 0,
};

const initialSettingState: SettingState = {
    maxValue: 5,
    minValue: 0,
};

function App() {
    const [state, dispatch] = useReducer(counterReducer, initialState);
    const [settingState, settingDispatch] = useReducer(settingReducer, initialSettingState);
    const { count } = state;
    const { maxValue, minValue } = settingState;

    useEffect(() => {
        const localMaxValueNum = localStorage.getItem('counterLimits');
        if (localMaxValueNum) {
            const parsedValue = JSON.parse(localMaxValueNum);
            settingDispatch(changeMaxValue(parsedValue[0]));
            settingDispatch(changeMinValue(parsedValue[1]));
            dispatch(reset(parsedValue[1]));
        }
    }, []);

    const incHandler = useCallback(() => {
        if (count < maxValue) {
            dispatch(increment());
        }
    }, [count, maxValue]);

    const resetHandler = useCallback(() => {
        dispatch(reset(minValue));
    }, [minValue]);

    const changeMaxValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        settingDispatch(changeMaxValue(newValue));
    }, []);

    const changeMinValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        settingDispatch(changeMinValue(newValue));
    }, []);

    const isCorrectValue = maxValue > 0 && minValue >= 0 && maxValue > minValue;

    const setLimitsHandler = useCallback(() => {
        if (isCorrectValue) {
            const limits = [maxValue, minValue];
            localStorage.setItem('counterLimits', JSON.stringify(limits));
            if (count < minValue) {
                dispatch(reset(minValue));
            }
        }
    }, [isCorrectValue, maxValue, minValue, count]);

    return (
        <div className="App">
            <div className="counter-wrapper">
                <div>max value:</div>
                <SetInput value={maxValue} onChange={changeMaxValueHandler} />
                <div>start value:</div>
                <SetInput value={minValue} onChange={changeMinValueHandler} />

                <div className="button-wrapper">
                    <Button name="set" callback={setLimitsHandler} disabled={!isCorrectValue} />
                </div>
            </div>

            <div className="counter-wrapper">
                <Display count={count} maxNum={maxValue} minNum={minValue} />

                <div className="button-wrapper">
                    <Button callback={incHandler} name="inc" disabled={!isCorrectValue} />
                    <Button callback={resetHandler} name="reset" disabled={!isCorrectValue} />
                </div>
            </div>
        </div>
    );
}

export default App;