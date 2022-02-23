import { useState } from "react";
import { BacklogContainer, BacklogContext } from "."

const Home = () => {
    const [loadingValue, setLoading] = useState(false);
    const [backlogsValue, setBacklogs] = useState([]);
  
    const fetchBacklogs = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs")
      let body = await res.json();
      let arr = []
      for (const backlog of body) {
          arr.push(backlog)
      }
      setBacklogs(arr);
    }
  
    const addBacklog = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs", {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: 'Backlog' })
      })
      fetchBacklogs();
    }
  
    const deleteBacklog = async (id) => {
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + id, {
          method: 'DELETE'
      })
      fetchBacklogs();
    }
  
    const editBacklog = async (id, name) => {
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + id, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: name })
      })
      fetchBacklogs();
    }
  
    const addItemApi = async (guid, id) => {
      setLoading(true);
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/"  + id + "?type=api", {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: guid })
      })
      fetchBacklogs();
      setLoading(false);
    }
  
    const addItemManual = async (formData, id) => {
      setLoading(true);
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/"  + id + "?type=manual", {
          method: 'POST',
          body: formData
      })
      fetchBacklogs();
      setLoading(false);
    }
  
    const deleteItem = async (b_id, i_id) => {
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + b_id + "/items/" + i_id, {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      })
      fetchBacklogs();
    }
  
    const editItem = async (formData, b_id, i_id) => {
      setLoading(true);
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + b_id + "/items/" + i_id, {
          method: 'PUT',
          body: formData
      })
      fetchBacklogs();
      setLoading(false);
    }
  
    const globalState = {
      backlogs: backlogsValue,
      loading: loadingValue,
      setBacklogs,
      setLoading,
      fetchBacklogs,
      deleteBacklog,
      editBacklog,
      addBacklog,
      addItemApi,
      addItemManual,
      deleteItem,
      editItem
    }

    return (
        <BacklogContext.Provider value={globalState}>
            <section className="header d-flex justify-content-center align-items-center">
            <h1>Games</h1>
            </section>
            <BacklogContainer />
        </BacklogContext.Provider>
    )
}

export default Home