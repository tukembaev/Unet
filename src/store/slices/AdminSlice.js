import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    admin:[],
  };

const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        postRegisterUser(state, action) {
            state.gender = action.payload.gender;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.middle_name = action.payload.middle_name;
     
            state.data_of_birth = action.payload.data_of_birth;
            state.number_phone = action.payload.number_phone;
            state.email = action.payload.email;
            state.citizenship = action.payload.citizenship;
            
            state.position = action.payload.position;
            state.inn = action.payload.inn;
            state.serial = action.payload.serial;
            state.number = action.payload.number;

            state.issued_by = action.payload.issued_by;
            state.date_of_issue = action.payload.date_of_issue;
            state.date_end = action.payload.date_end;
            state.imaeg = action.payload.imaeg;
          },
    },
});

export const {postRegisterUser} = AdminSlice.actions;

export default AdminSlice.reducer;