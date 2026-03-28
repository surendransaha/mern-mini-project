import React, { useEffect, useState} from "react";

function Todo() {

    const [title, setTitle] = useState('')
    const [listToDo, setListToDo] = useState([])
    const apiUrl = 'http://localhost:4000/'

    const listToDoFunc = async () => {
        await fetch(`${apiUrl}todos`)
        .then((res)=>res.json())
        .then((res)=>{
            setListToDo(res)
        })
        
    }

    const addToDO = async ()=> {
        console.log('hi')
        await fetch(`${apiUrl}todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title
            })
        })
        setTitle('')
        listToDoFunc()
    }

    useEffect(()=>{
        listToDoFunc()
    }, [])

  return (
    <>
      <div class="row">
        <div class="col-sm-12">
          <figure class="text-center">
            <blockquote class="blockquote">
              <h2>TO DO List</h2>
            </blockquote>
          </figure>
        </div>
      </div>

<form>
    <center>
  <div class="" style={{width:'50%'}}>
    <input type="text" class="form-control" id="addtodo" placeholder="Enter Title" value={title} 
    onChange={(e)=>{setTitle(e.target.value)}} />
  </div><br />
  <button type="button" onClick={addToDO} class="btn btn-primary">Add</button>
  </center>
</form><br/>

      <div class="row">
        {
            listToDo && listToDo.length > 0 ?

            listToDo.map((row, i)=>(

                 <div class="col-sm-6 mb-3 mb-sm-0" key={i}>
          <div class="card">
            <div class="card-body">
              <p class="card-text">
                {row.title}
              </p>
              <div className="row">
                <div class="col-sm-6">
                  <button class="btn btn-primary ">Update</button>
                </div>
                <div class="col-sm-6">
                  <button class="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>


            ))


           
            
            : ''
        }
        
      </div>
    </>
  );
}

export default Todo;
