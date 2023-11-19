export type CounterState = {
    count: number;
};

export const initialCounterState: CounterState = {
    count: 0,
};

export type IncrementAction = {
    type: 'INCREMENT';
};

export type ResetAction = {
    type: 'RESET';
    payload: number;
};

export type CounterAction = IncrementAction | ResetAction;

const counterReducer = (state: CounterState = initialCounterState, action: CounterAction): CounterState => {
    switch (action.type) {
        case 'INCREMENT': {
            return {
                ...state,
                count: state.count + 1,
            };
        }
        case 'RESET': {
            return {
                ...state,
                count: action.payload,
            };
        }
        default:
            return state;
    }
};

export const increment = (): IncrementAction => ({
    type: 'INCREMENT',
});

export const reset = (value: number): ResetAction => ({
    type: 'RESET',
    payload: value,
});

export default counterReducer;