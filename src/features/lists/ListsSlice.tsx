import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { fetchPeopleLists, createPeopleList, destroyPeopleList, updatePeopleList } from "./PeopleAPI";


export enum Status {
    Initial = "Nothing fetched",
    Loading = "Loading..",
    Deleted = "Deleted!",
    UpToDate = "It's up to date!",
    Error = "Error"
}

export interface PeopleListFormData {
    list: {
        id?: string,
        first_name?: string,
        last_name?: string,
        email?: string
    }
}

export interface PeopleListUpdataData {
    id: number;
    list: PeopleListState;
}

export interface PeopleListDeleteData {
    list: {
        id: number;
    }
}

export interface PeopleListState {
    id?: number,
    first_name?: string,
    last_name?: string,
    email?: string
    
}

export interface PeopleListsState {
    peopleLists: PeopleListState[];
    status: string;
}

const initialState: PeopleListsState = {
    peopleLists: [
        {
            id: 0,
            first_name: "",
            last_name: "",
            email: ""
        }
    ],
    status: Status.Initial
}  

export const fetchPeopleListsAsync = createAsyncThunk(
    'peopleLists/fetchPeopleLists',
    async () => {
        const response = await fetchPeopleLists();
        return response;
    }
);

export const createPeopleListAsync = createAsyncThunk(
    'peopleLists/createPeopleList',
    async (payload: PeopleListFormData) => {
        const response = await createPeopleList(payload);
        return response;
    }
);

export const destroyPeopleListAsync = createAsyncThunk(
    'peopleLists/destroyPeopleList',
    async (payload: PeopleListDeleteData) => {
        const response = await destroyPeopleList(payload);
        return response; 
    }
);

export const updatePeopleListAsync = createAsyncThunk(
    'peopleLists/updatePeopleList',
   async (payload: PeopleListFormData) => {
       const response = await updatePeopleList(payload);
       return response;
   }
);


export const peopleListSlice = createSlice({
    name: "peopleLists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPeopleListsAsync.pending, (state) => {
                return produce(state, (draft) => {
                    draft.status = Status.Loading;
                })
            })
            .addCase(fetchPeopleListsAsync.fulfilled, (state, action) => {
                return produce(state, (draft) => {
                    draft.peopleLists = action.payload;
                    draft.status = Status.UpToDate;
                })
            })
            .addCase(fetchPeopleListsAsync.rejected, (state) => {
                return produce(state, (draft) => {
                    draft.status = Status.Error;
                })
            })
            /** Create */
            .addCase(createPeopleListAsync.pending, (state) => {
                return produce(state, (draft) => {
                    draft.status = Status.Loading;
                })
            })
            .addCase(createPeopleListAsync.fulfilled, (state, action) => {
                return produce(state, (draft) => {
                    draft.peopleLists.push(action.payload);
                    draft.status = Status.UpToDate;
                })
            })
            .addCase(createPeopleListAsync.rejected, (state) => {
                return produce(state, (draft) => {
                    draft.status = Status.Error;
                })
            })

            /** Delete */
            .addCase(destroyPeopleListAsync.pending, (state) => {
                return produce(state, (draft) => {
                    draft.status = Status.Loading;
                })
            })
            .addCase(destroyPeopleListAsync.fulfilled, (state, action) => {
                return produce(state, (draft) => {
                    draft.peopleLists = action.payload;
                    draft.status = Status.UpToDate;
                })
            })
            .addCase(destroyPeopleListAsync.rejected, (state) => {
                return produce(state, (draft) => {
                    draft.status = Status.Error;
                })
            })

            /**Update */
            .addCase(updatePeopleListAsync.pending, (state) => {
                return produce(state, (draft) => {
                    draft.status = Status.Loading;
                })
            })
            .addCase(updatePeopleListAsync.fulfilled, (state, action) => {
                return produce(state, (draft) => {
                    const index = draft.peopleLists.findIndex(
                        peopleList => peopleList.id === action.payload.id
                    );
                    draft.peopleLists[index] = action.payload;
                    draft.status = Status.UpToDate;
                })
            })
            .addCase(updatePeopleListAsync.rejected, (state) => {
                return produce(state, (draft) => {
                    draft.status = Status.Error;
                })
            })
    }
});

export const {} = peopleListSlice.actions;

export const selectPeopleLists = (state: RootState) => state.peopleLists.peopleLists;

export const selectPeopleStatus = (state: RootState) => state.peopleLists.status;

export default peopleListSlice.reducer;