import React, { useMemo } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import {RootStateType} from "./store/store";
import {Settings} from "./components/setting/Settings";
import {Counter} from "./components/counter/Counter";

function App() {
    const count = useSelector((state: RootStateType) => state.counter.count);
    const maxValue = useSelector((state: RootStateType) => state.setting.maxValue);
    const minValue = useSelector((state: RootStateType) => state.setting.minValue);

    const isCorrectValue = useMemo(
        () => maxValue > 0 && minValue >= 0 && maxValue > minValue, [maxValue, minValue]);


    return (
        <div className="App">
            <Settings maxValue={maxValue} minValue={minValue} isCorrectValue={isCorrectValue} count={count} />
            <Counter count={count} maxValue={maxValue} minValue={minValue} isCorrectValue={isCorrectValue} />
        </div>
    );
}

export default App;