import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {

    studyPlan:[],
    studyPlanInfo:[],
    studyPlanSubjects:[],
    semester:{},
    parentId: null,
    printing:false
};

const StudyPlanSlice = createSlice({
    name: 'study',
    initialState,
    reducers: { 
        setStudyData: (state, action) => {
            state.studyPlan = action.payload.studyPlan;
        },
        setStudyInfoData: (state, action) => {
            state.studyPlanInfo = action.payload.studyPlanInfo;
        },
        setStudySubjects: (state, action) => {
            state.studyPlanSubjects = action.payload.studyPlanSubjects;
        },
        setSemester: (state, action) => {
            state.semester = action.payload.semester;
        },
        setPerantId: (state, action) => {
            state.parentId = action.payload.parentId;
        },
        setPrinting: (state, action) => {
            state.printing = action.payload.printing;
        },
    },
});

export const {
    setStudyData,
    setStudyInfoData,
    setStudySubjects,
    setSemester,
    setPerantId,
    setPrinting
    
} = StudyPlanSlice.actions;

export default StudyPlanSlice.reducer;