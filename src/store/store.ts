import settingReducer, {SettingState} from './settingReducer';
import counterReducer, {CounterState} from './counterReducer';
import {combineReducers, createStore} from 'redux';



const rootReducer = combineReducers({
    settings: settingReducer,
    counter: counterReducer
})
export const store = createStore(rootReducer);

export type RootState = {
    settings: SettingState;
    counter: CounterState;
}

// @ts-ignore
window.store = store;
