import { configureStore } from "@reduxjs/toolkit";

import reducer from "@utils/redux/reducers/reducer";

const store = configureStore({
  reducer: {
    data: reducer.state,
  },
});

export default store;

/*
Fungsi createStore adalah sebuah function yang menerima 1 parameter, yaitu reducer.
Store ini digunakan untuk membuat sebuah wadah yang bakal dipakai untuk setiap komponen.
*/
