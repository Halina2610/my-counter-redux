

export type SettingState = {
    maxValue: number;
    minValue: number;
};

type ChangeMaxValueAction = {
    type: 'CHANGE_MAX_VALUE';
    payload: number;
};

type ChangeMinValueAction = {
    type: 'CHANGE_MIN_VALUE';
    payload: number;
};

export type SettingAction = ChangeMaxValueAction | ChangeMinValueAction;

const initialSettingState: SettingState = {
    maxValue: 5,
    minValue: 0,
};

const settingReducer = (state: SettingState = initialSettingState, action: SettingAction): SettingState => {
    switch (action.type) {
        case 'CHANGE_MAX_VALUE':
            return {
                ...state,
                maxValue: action.payload,
            };
        case 'CHANGE_MIN_VALUE':
            return {
                ...state,
                minValue: action.payload,
            };
        default:
            return state;
    }
};

export default settingReducer;

export const changeMaxValue = (value: number): ChangeMaxValueAction => ({
    type: 'CHANGE_MAX_VALUE',
    payload: value,
});

export const changeMinValue = (value: number): ChangeMinValueAction => ({
    type: 'CHANGE_MIN_VALUE',
    payload: value,
});