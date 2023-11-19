// store.ts
import { createStore, combineReducers, Store } from 'redux';
import counterReducer, {CounterState} from './counterReducer';
import settingReducer, {SettingState} from './settingReducer';
import limitReducer, {LimitState} from './limitReducer';

interface RootState {
    counter: CounterState;
    setting: SettingState;
    limit: LimitState;
}

const rootReducer = combineReducers<RootState>({
    counter: counterReducer,
    setting: settingReducer,
    limit: limitReducer,
});

const store: Store<RootState> = createStore(rootReducer);

export default store;

