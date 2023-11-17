export type SettingState = {
    maxValue: number;
    minValue: number;
    invalidMinValue: boolean;
}

type SetMaxValueAction = {
    type: 'SET_MAX_VALUE';
    payload: number;
}

type SetMinValueAction = {
    type: 'SET_MIN_VALUE';
    payload: number;
}

type SettingAction = SetMaxValueAction | SetMinValueAction;

const initialSettingState: SettingState = {
    maxValue: 5,
    minValue: 0,
    invalidMinValue: false
};

const settingReducer = (state: SettingState = initialSettingState, action: SettingAction): SettingState => {
    switch (action.type) {
        case 'SET_MAX_VALUE':
            return {
                ...state,
                maxValue: action.payload,
                invalidMinValue: action.payload <= state.minValue
            };
        case 'SET_MIN_VALUE':
            return {
                ...state,
                minValue: action.payload,
                invalidMinValue: action.payload < 0
            };
        default:
            return state;
    }
};

export default settingReducer;