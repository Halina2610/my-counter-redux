// store.ts
import {createStore, combineReducers, Store} from 'redux';
import counterReducer, {CounterState} from './counterReducer';
import settingReducer, {SettingState} from './settingReducer';
import limitReducer, {LimitState} from './limitReducer';

export type RootStateType = {
    counter: CounterState;
    setting: SettingState;
    limit: LimitState;
}

const rootReducer = combineReducers<RootStateType>({
    counter: counterReducer,
    setting: settingReducer,
    limit: limitReducer,
});

const store: Store<RootStateType> = createStore(rootReducer);

export default store;

