import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {

       allPublications:[],
       kpiTitle: [],
       kpiCategory:[],
       kpiEmloyee:[],
       KpiHead:[],
       KpiReport:[],
       kpiList:[],
};

const PublicationSlice = createSlice({
    name: 'publications',
    initialState,
    reducers: { 

        setPublications: (state, action) => {
            state.allPublications = action.payload.allPublications;
          },
        setKpiTitle: (state, action) => {
            state.kpiTitle = action.payload.kpiTitle;
          },
          setKpiCategory: (state, action) => {
            state.kpiCategory = action.payload.kpiCategory;
          },
          setKpiHead: (state , action) => {
            state.KpiHead = action.payload.KpiHead;
          },
          setKpiEmloyee: (state, action) => {
            state.kpiEmloyee = action.payload.kpiEmloyee;
          },
          setKpiReport: (state, action) => {
            state.KpiReport = action.payload.KpiReport;
          },
          setKpiList: (state, action) => {
            state.kpiList = action.payload.kpiList;
          },
    },
});

export const {
    setPublications,
    setKpiTitle,
    setKpiCategory,
    setKpiHead,
    setKpiEmloyee,
    setKpiReport,
    setKpiList
} = PublicationSlice.actions;

export default PublicationSlice.reducer;