import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { createPeopleListAsync } from './ListsSlice';

const ListForm = () => {
  const dispatch = useAppDispatch();
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = {
      list: {
        first_name: fName,
        last_name: lName
      }
    }
    dispatch(createPeopleListAsync(formData));
    resetState();
  }

  const resetState = () => {
    setFName('');
    setLName('');
  }


  return (
    <div>
      <h1>New Person</h1>
      <form className='new-car-form'>
        <div className="mb-3">
            <input name="first_name" id="first_name" placeholder="First Name" onChange={(e) => setFName(e.target.value)} />
        </div>
        <div className="mb-3">
            <input name="last_name" id="last_name" placeholder="Last Name" onChange={(e) => setLName(e.target.value)} />
        </div>
        <div>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    </form>
    </div>
  )
}

export default ListForm;