import { PeopleListDeleteData, PeopleListFormData, PeopleListsState } from "./ListsSlice";

const API_URL = "http://localhost:3000/api/v1/people";

export async function fetchPeopleLists() {
    return fetch(`${API_URL}`, {
        method: "GET",
		credentials: 'omit',
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json())
    .catch((error) => {
        console.log("Error: ", error);
        return {} as PeopleListsState;
    });
}

export async function createPeopleList(payload: PeopleListFormData) {
    const list = payload.list;
    return fetch(`${API_URL}`, {
        method: "POST",
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list)
    }).then((res) => res.json())
    .catch((error) => {
        console.log("Error: ", error);
        return {} as PeopleListsState;
    });
}

export async function destroyPeopleList(payload: PeopleListDeleteData) {
    const list = payload.list;
    return fetch(`${API_URL}/${list.id}`, {
        method: "DELETE",
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json())
    .catch((error) => {
        console.log("Error: ", error);
        return {} as PeopleListsState;
    });
}

export async function updatePeopleList(payload: PeopleListFormData) {
    const list = payload.list;
    return fetch(`${API_URL}/${list.id}`, {
        method: "PATCH",
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list)
    }).then((res) => res.json())
    .catch((error) => {
        console.log("Error: ", error);
        return {} as PeopleListsState;
    });
}