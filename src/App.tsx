import React, { useEffect, useCallback, useMemo } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Display } from './components/Display';
import { Button } from './components/Button';
import { SetInput } from "./components/SetInput";
import { setMaxValue, setMinValue } from "./store/settingActions";
import { increment, reset } from "./store/counterActions";
import { RootState } from "./store/store";


const App = () => {
    const { maxValue, minValue } = useSelector((state: RootState) => state.settings);
    const count = useSelector((state: RootState) => state.counter.count);
    const dispatch = useDispatch();


    useEffect(() => {
        const localMaxValueNum = localStorage.getItem('counterLimits');
        if (localMaxValueNum) {
            const parsedValue = JSON.parse(localMaxValueNum);
            dispatch(setMaxValue(parsedValue[0]));
            dispatch(setMinValue(parsedValue[1]));
        }
    }, [dispatch]);

    const incHandler = useCallback(() => {
        if (count < maxValue) {
            dispatch(increment());
        }

    }, [count, maxValue, dispatch]);

    const resetHandler = useCallback(() => {
        dispatch(reset(minValue));
    }, [dispatch]);

    const changeMaxValueHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        dispatch(setMaxValue(newValue));
    }, [dispatch]);

    const changeMinValueHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        dispatch(setMinValue(newValue));
    }, [dispatch]);

    const isCorrectValue = useMemo(() => maxValue > 0 && minValue >= 0 && maxValue > minValue, [maxValue, minValue]);

    const setLimitsHandler = useCallback(() => {
        if (isCorrectValue) {
            const limits = [maxValue, minValue];
            localStorage.setItem('counterLimits', JSON.stringify(limits));
        }
    }, [isCorrectValue, maxValue, minValue]);

    return (
        <div className="App">
            <div className="counter-wrapper">
                <div>max value:</div>
                <SetInput value={maxValue} onChange={changeMaxValueHandler} />
                <div>start value:</div>
                <SetInput value={minValue} onChange={changeMinValueHandler} />

                <div className="button-wrapper">
                    <Button name="set" callback={setLimitsHandler} disabled={maxValue < 0 || minValue >= maxValue} />
                </div>
            </div>

            <div className="counter-wrapper">
                <Display count={count >= minValue ? count : minValue} maxNum={maxValue} minNum={minValue} />

                <div className="button-wrapper">
                    <Button callback={incHandler} name="inc" disabled={count === maxValue || count < 0 || minValue >= maxValue} />
                    <Button callback={resetHandler} name="reset" disabled={count < 0 || minValue >= maxValue} />
                </div>
            </div>
        </div>
    );
}

export default App;