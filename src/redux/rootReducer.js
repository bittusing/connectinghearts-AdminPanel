// ** Reducers Imports
import accountProjectReducer from "./slices/acountProjectSlice";
import lookupReducer from "./slices/lookup";
const rootReducer = {
  accountProjectReducer,
  lookupReducer,
};

export default rootReducer;
