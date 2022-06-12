import { destroyPeopleListAsync } from './ListsSlice';

const ButtonGroup = (props: any) => {

    const handleClick = (e:any) => {
        const payload = {
            list: {
                id: props.person_id
            }
        }
        props.dispatch(destroyPeopleListAsync(payload));
    }
  return (
    <div className='btn-group float-end'>
        <button className="btn btn-primary mr-2" onClick={() => props.editForm()} >Edit</button>
        <button className="btn btn-danger" onClick={(e) => handleClick(e)}>Delete</button>
    </div>
  )
}

export default ButtonGroup