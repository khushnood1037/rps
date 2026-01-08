import { combineReducers } from 'redux'
import { LoaderSlice } from '../Slices/loader.slice'
import { UserSlice } from '../Slices/user.slice'
import { AdminSlice } from '../Slices/admin.slice'
import { TokenSlice } from '../Slices/token.slice'

/**COMBINE ALL REDUCERS */
export const reducers = combineReducers({
  loader: LoaderSlice.reducer,
  user: UserSlice.reducer,
  admin: AdminSlice.reducer,
  token: TokenSlice.reducer,
});
