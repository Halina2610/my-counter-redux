export type LimitState = {
    invalidMinValue: boolean;
}

const SET_INVALID_MIN_VALUE = 'SET_INVALID_MIN_VALUE';

type SetInvalidMinValueAction = {
    type: typeof SET_INVALID_MIN_VALUE;
    payload: boolean;
}

export type LimitAction = SetInvalidMinValueAction;

const initialState: LimitState = {
    invalidMinValue: false,
};

const limitReducer = (state: LimitState = initialState, action: LimitAction): LimitState => {
    switch (action.type) {
        case SET_INVALID_MIN_VALUE :
            return {
                ...state,
                invalidMinValue: action.payload,
            };
        default:
            return state;
    }
};

export default limitReducer;


export const setInvalidMinValue = (value: boolean): SetInvalidMinValueAction => ({
    type: SET_INVALID_MIN_VALUE,
    payload: value,
});