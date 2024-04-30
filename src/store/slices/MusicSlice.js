import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    AllMusic: [],
}

const MusicSlice = createSlice({
    name:"music",
    initialState,
    reducers:{
        setMusic: (state , action) =>{
            state.AllMusic = action.payload.AllMusic;
        }
    }
})

export const {
    setMusic
} = MusicSlice.actions;
export default MusicSlice.reducer