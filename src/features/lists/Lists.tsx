import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchPeopleListsAsync, selectPeopleLists, selectPeopleStatus, Status, updatePeopleListAsync } from "./ListsSlice"
import List from './List';
import ListForm from './ListForm'

function PeopleLists() {
  const peopleLists = useAppSelector(selectPeopleLists);
  const status = useAppSelector(selectPeopleStatus);
  const dispatch = useAppDispatch();
  const [peopleListToEdit, setPeopleListToEdit] = useState(0);


  useEffect(() => {
    dispatch(fetchPeopleListsAsync());
  }, [dispatch]);

  const editForm = (person_id?: number) => {
    if (peopleListToEdit === person_id) {
      setPeopleListToEdit(0);
    } else {
      setPeopleListToEdit(person_id as number);
    }
  }

  const submitEdit = (formData: any) => {
    dispatch(updatePeopleListAsync(formData));
    editForm();
  } 

  let views;

  if (status !== Status.UpToDate) {
    views = <div>{status}</div>
  } else {
    views = <div className="card">
      <div className='card-body'>
          <ListForm />
          {peopleLists && peopleLists.length > 0 && peopleLists.map(peopleList => {
            return <div key={peopleList.id} style={{margin:"3em"}}>
                    <List 
                      dispatch={dispatch}
                      peopleList={peopleList}
                      editForm={() => editForm(peopleList.id)}
                      peopleListToEdit={peopleListToEdit}
                      submitEdit={submitEdit}
                    />
                  </div>
          })}
      </div>
    </div>
  }

  return (
    <div>
      {views}
    </div>
  )
}

export default PeopleLists