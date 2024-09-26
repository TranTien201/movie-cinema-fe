import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import orebiReducer from "./orebiSlice";
import timeKeepingReducer from "./timeKeepingSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import labelReducer from "./labelSlice";
import movieReducer from "./movieSlice";
import productOrderDetailReducer from "./productOrderDetailSlice";
import productOrderReducer from "./productOrderSlice";
import seatReducer from "./seatSlice";
import showtimeReducer from "./showtimeSlice";
import theaterSeatReducer from "./theaterSeatSlice";
import theaterReducer from "./theaterSlice";
import ticketOrderDetailReducer from "./ticketOrderDetailSlice";
import ticketOrderReducer from "./ticketOrderSlice";
import accountSlice from "./accountSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  // orebi: orebiReducer,
  account: accountSlice,
  timeKeeping: timeKeepingReducer,
  category: categoryReducer,
  product: productReducer,
  label: labelReducer,
  movie: movieReducer,
  productOrderDetail: productOrderDetailReducer,
  productOrder: productOrderReducer,
  seat: seatReducer,
  showtime: showtimeReducer,
  theaterSeat: theaterSeatReducer,
  theater: theaterReducer,
  ticketOrderDetail: ticketOrderDetailReducer,
  ticketOrder: ticketOrderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
