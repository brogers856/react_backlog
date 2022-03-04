import { useState } from "react";
import { BacklogContainer, BacklogContext } from "."
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'

const Home = () => {
  const [loadingValue, setLoading] = useState(false);
  const [backlogsValue, setBacklogs] = useState([]);
  const [activeId, setActiveId] = useState();
  const [isDragging, setIsDragging] = useState();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + id + "?type=api", {
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
    const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + id + "?type=manual", {
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
    editItem,
    draggingValue: isDragging
  }

  const findItem = (backlog, id) => {
    let item = backlog.items.filter(item => {
      return item._id === id
    })
    return item
  }

  const findBacklog = (id) => {
    let b = null
    backlogsValue.forEach((backlog) => {
      backlog.items.forEach((item) => {
        if (item._id === id) {
          b = backlog
        }
      })
    })
    return b
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    const { id, data } = active;
    const { id: overId } = over;

    const activeBacklog = findBacklog(id);
    const overBacklog = findBacklog(overId);

    if ( !activeBacklog || !overBacklog || activeBacklog !== overBacklog) {
      return;
    }

    const activeItem = findItem(activeBacklog, id)
    const activeIndex = activeBacklog.items.findIndex((item) => item._id === id)
    const overItem = findItem(overBacklog, overId)
    const overIndex = overBacklog.items.findIndex((item) => item._id === overId)
  

    if (activeItem !== overItem) {

      let arr = arrayMove(overBacklog.items, activeIndex, overIndex)
      let backlogIndex = backlogsValue.indexOf(activeBacklog)
      let newBacklog = backlogsValue;
      newBacklog[backlogIndex].items = arr;
      setBacklogs(newBacklog)
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + overBacklog._id + "/items", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(arr)
      })
    }

    setActiveId(null);
  }

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragOver = (event) => {
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}>
        <BacklogContext.Provider value={globalState}>
          <section className="header d-flex justify-content-center align-items-center">
            <h1>Games</h1>
          </section>
          <BacklogContainer />
        </BacklogContext.Provider>
      </DndContext>
    </>

  )
}

export default Home