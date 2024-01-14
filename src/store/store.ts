import {createStore, combineReducers, Store} from 'redux';
import counterReducer, {CounterState} from './counterReducer';
import settingReducer, {SettingState} from './settingReducer';

export type RootStateType = {
    counter: CounterState;
    setting: SettingState;
}

const rootReducer = combineReducers<RootStateType>({
    counter: counterReducer,
    setting: settingReducer,
});

const store: Store<RootStateType> = createStore(rootReducer);

export default store;

