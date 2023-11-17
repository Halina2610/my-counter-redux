import { Action } from 'redux';

export interface IncrementAction extends Action<'INCREMENT'> {}

export interface ResetAction extends Action<'RESET'> {
    payload: number;
}

export const increment = (): IncrementAction => ({
    type: 'INCREMENT'
});

export const reset = (value: number): ResetAction => ({
    type: 'RESET',
    payload: value
});

