import React, {ChangeEvent, useCallback, useEffect} from 'react';
import {Input} from "../input/Input";
import {Button} from "../button/Button";
import {useDispatch} from "react-redux";
import {reset} from "../../store/counterReducer";
import {changeMaxValue, changeMinValue} from "../../store/settingReducer";

type SettingsPropsType = {
    maxValue: number
    minValue: number
    isCorrectValue: boolean
    count: number
}

export const Settings: React.FC<SettingsPropsType> = ({
                                                          maxValue,
                                                          minValue,
                                                          isCorrectValue,
                                                          count
                                                      }) => {

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

    const changeMaxValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        dispatch(changeMaxValue(newValue));
    }, [dispatch]);

    const changeMinValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.currentTarget.value;
        dispatch(changeMinValue(newValue));
    }, [dispatch]);

    const setLimitsHandler = useCallback(() => {
        if (isCorrectValue) {
            const limits = [maxValue, minValue];
            localStorage.setItem('counterLimits', JSON.stringify(limits));
            if (count < minValue) {
                dispatch(reset(minValue));
            }
        }
    }, [isCorrectValue, maxValue, minValue, count, dispatch]);

    const noInvalidValue =  minValue < 0 || maxValue > 999
        || minValue > maxValue || maxValue < minValue
        || minValue === maxValue || maxValue === 0


    return (
        <div className="counter-wrapper">
            <div>max value:</div>
            <Input value={maxValue} onChange={changeMaxValueHandler} noInvalidValue={noInvalidValue} />
            <div>start value:</div>
            <Input value={minValue} onChange={changeMinValueHandler} noInvalidValue={noInvalidValue} />

            <div className="button-wrapper">
                <Button name="set" callback={setLimitsHandler} disabled={!isCorrectValue} />
            </div>
        </div>
    );
};

