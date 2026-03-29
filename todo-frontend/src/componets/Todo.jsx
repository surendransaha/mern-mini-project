import React, { useEffect, useState } from "react";

function Todo() {
  const [title, setTitle] = useState("");
  const [listToDo, setListToDo] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [updateModel, setUpdateModel] = useState("true");

  const apiUrl = "http://localhost:4000/";

  const listToDoFunc = async () => {
    await fetch(`${apiUrl}todos`)
      .then((res) => res.json())
      .then((res) => {
        setListToDo(res);
      });
  };

  const addToDO = async () => {
    console.log("hi");
    await fetch(`${apiUrl}todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    setTitle("");
    listToDoFunc();
  };

  useEffect(() => {
    listToDoFunc();
  }, []);

  const updateTodo = async (data) => {
    setUpdateData(data);
  };

  const callDeleteApi = async (id) => {
    if(window.confirm("Are you sure you want to delete this item?")){

      await fetch(`${apiUrl}todos/${id}`, {
        method: "DELETE",
        header: {
          "Content-Type": "application/json"
        }
        })
        listToDoFunc();


    }
  }

  const callUpdateAPI = async () => {
    await fetch(`${apiUrl}todos/${updateData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateData.title,
      }),
    });
    setUpdateData({});
    setUpdateModel("Close");
    listToDoFunc();
  };

  return (
    <>
    <div className="container">
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
          <div class="" style={{ width: "50%" }}>
            <input
              type="text"
              class="form-control"
              id="addtodo"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <br />
          <button type="button" onClick={addToDO} class="btn btn-success">
            Add
          </button>
        </center>
      </form>
      <hr /><br />

      <div class="row">
        {listToDo && listToDo.length > 0
          ? listToDo.map((row, i) => (
              <div class="col-sm-6 mb-3 mb-sm-0" key={i}>
                <div class="card">
                  <div class="card-body">
                    <p class="card-text">{row.title}</p>
                    <div className="row">
                      <div class="col-sm-6">
                        <button
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => {
                            updateTodo(row);
                          }}
                        >
                          Update
                        </button>
                      </div>
                      <div class="col-sm-6">
                        <button class="btn btn-danger" onClick={() => { callDeleteApi(row._id) }}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
          </div>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={updateModel}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <input
                    type="test"
                    value={updateData.title}
                    onChange={(e) => {
                      setUpdateData({ ...updateData, title: e.target.value });
                    }}
                  />
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={callUpdateAPI}
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
