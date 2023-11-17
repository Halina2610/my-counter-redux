import { Action } from 'redux';

export type SetMaxValueAction = Action<'SET_MAX_VALUE'> & {
    payload: number;
};

export type SetMinValueAction = Action<'SET_MIN_VALUE'> & {
    payload: number;
};

export const setMaxValue = (value: number): SetMaxValueAction => ({
    type: 'SET_MAX_VALUE',
    payload: value
});

export const setMinValue = (value: number): SetMinValueAction => ({
    type: 'SET_MIN_VALUE',
    payload: value
});