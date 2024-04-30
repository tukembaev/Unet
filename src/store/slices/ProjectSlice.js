import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {

       projects:[],
    projectInfo:[],
      stageInfo:[],
      stageTask:[]

};

const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: { 

        setProjects: (state, action) => {
            state.projects = action.payload.projects;
          },
          setProjectInfo: (state, action) => {
            state.projectInfo = action.payload.projectInfo;
          },
          setStageInfo: (state, action) => {
            state.stageInfo = action.payload.stageInfo;
          },
          setStageTask: (state, action) => {
            state.stageTask = action.payload.stageTask;
          },
    },
});

export const {
    setProjects,
    setProjectInfo,
    setStageInfo,
    setStageTask
} = ProjectSlice.actions;

export default ProjectSlice.reducer;