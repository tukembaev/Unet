import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {

       loadStudents:[],
   

};

const LoadSlice = createSlice({
    name: 'Loadslice',
    initialState,
    reducers: { 

        setLoadStudents: (state, action) => {
            state.loadStudents = action.payload.loadStudents;
          },
      
    },
});

export const {
    setLoadStudents,

} = LoadSlice.actions;

export default LoadSlice.reducer;