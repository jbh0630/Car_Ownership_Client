import React, { useState, useEffect } from 'react';
import ButtonGroup from './ButtonGroup';

function List(props: any) {
  const [fName, setFName] = useState(props.peopleList.first_name);
  const [lName, setLName] = useState(props.peopleList.last_name);
  const [edit, setEdit] = useState(props.peopleListToEdit === props.peopleList.id);


  useEffect(() => {
    setEdit(props.peopleListToEdit === props.peopleList.id);
}, [props.peopleListToEdit, props.peopleList.id])


  const editPeople = (e: any) => {
    e.preventDefault();
    const formData = {
      list: {
        id: props.peopleList.id,
        first_name: fName,
        last_name: lName
      }
    }
    props.submitEdit(formData);
    resetState();
  }

  const resetState = () => {
    setFName(props.peopleList.first_name);
    setLName(props.peopleList.last_name);
  }
 

  const ownerName = <h3 className='ownerName'>
    {fName} {lName}
    </h3>;

  const editFName = <input type="text" defaultValue={fName} onChange={(e) => setFName(e.target.value)} />;
  const editLName = <input type="text" defaultValue={lName} onChange={(e) => setLName(e.target.value)} />;
  const updateBtn = <button className="btn btn-primary mr-2" onClick={(e) => editPeople(e)}>Update</button>;
  const cancelBtn = <button className="btn btn-danger" onClick={() => setEdit(false)}>Cancel</button>

  return (
    <div>
      <div className="row">
        <div className="col-8" >
          {edit? (
            <div>
              {editFName}
              {editLName}
            </div>
          ):(ownerName)}
        </div>
        <div className="col-4">
          <ButtonGroup 
           person_id={props.peopleList.id}
           dispatch={props.dispatch}
           editForm={props.editForm}
          />
          
        </div> 
      </div>
      <div className="row">
        <div className="co1-8">
          {edit? (
            <div>
              {updateBtn}
              {cancelBtn}
            </div>
          ) : ("")}
        </div>
      </div>
    </div>
  )
}

export default List