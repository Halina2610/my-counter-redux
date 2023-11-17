export type CounterState = {
    count: number;
}

type IncrementAction = {
    type: 'INCREMENT';
}

type ResetAction = {
    type: 'RESET';
    payload: number;
}

type CounterAction = IncrementAction | ResetAction;

const initialCounterState: CounterState = {
    count: 0,
};

const counterReducer = (state: CounterState = initialCounterState, action: CounterAction): CounterState => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1,
            };
        case 'RESET':
            return {
                ...state,
                count: action.payload,
            };
        default:
            return state;
    }
};

export default counterReducer;