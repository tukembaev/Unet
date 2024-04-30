import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  widgetId: [],
  userInfo: [],
  personInfo:[],
  userId: null,
  employeeId: null,
  firstName: null,
  surName: null,
  lastName: null,
  numberPhone: null,
  email: null,
  token: null,
  dataOfBirth: null,
  division: null,
  position: null,
  uniqueCodeUser: null,
  imeag: "",
  employee:'',
  efficiency:null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.userId = action.payload.user;
      state.employeeId = action.payload.id;
      state.firstName = action.payload.first_name;
      state.surName = action.payload.surname;
      state.lastName = action.payload.last_name;
      state.numberPhone = action.payload.number_phone;
      state.dataOfBirth = action.payload.data_of_birth;
      state.division = action.payload.division;
      state.position = action.payload.position;
      state.uniqueCodeUser = action.payload.unique_code_user;
      state.image = action.payload.imeag;
      state.pin = action.payload.pin;
      state.is_head_of = action.payload.is_head_of;
      state.is_mol_of = action.payload.is_mol_of;
      state.is_admin_of = action.payload.is_admin_of;
      state.is_admin_kpi = action.payload.is_admin_kpi;
      state.is_support_of = action.payload.is_support_of;
      state.is_stud = action.payload.is_stud;
      state.user_type = action.payload.user_type;
      state.efficiency = action.payload.efficiency;
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload.userInfo;
    },
    setUserAvatar: (state, action) => {
      state.userAvatar = action.payload.userAvatar;
    },
    setPersonById: (state, action) => {
      state.personInfo = action.payload.personInfo;
    },
  
    
    setWidgetById: (state, action) => {
      state.widgetId = action.payload.widgetId;
    },

    removeUser(state) {
      state.email = null;
      state.token = null;
    },
    postMail(state, action) {
      state.email = action.payload.email;
    },
    changeImageAvatar(state, action) {
      state.imeag = action.payload.imeag;
    },
    changePassword(state, action) {
      state.new_password = action.payload.new_password;
    },
    changePhoneNumber(state, action) {
      state.numberPhone = action.payload.numberPhone;
    },
    changePinCode(state, action) {
      state.pin = action.payload.pin;
    },
    setEmployeeUserId(state, action) {
      state.employee = action.payload.employee;
    },
    // setEfficiency(state, action) {
    //   state.efficiency = action.payload.efficiency;
    // },
  },
});

export const {
  setUser,
  removeUser,
  setWidgetById,
  postMail,
  changeImageAvatar,
  setUserInfo,
  setUserAvatar,
  setPersonById,
  changePassword,
  changePinCode,
  setEmployeeUserId,
  changePhoneNumber,
  // setEfficiency,

} = userSlice.actions;

export default userSlice.reducer;
