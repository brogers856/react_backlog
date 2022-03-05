import { useState } from "react";
import { BacklogContainer, BacklogContext, DragItem } from "."
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter, DragOverlay } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable'

const Home = () => {
  const [loadingValue, setLoading] = useState(false);
  const [backlogsValue, setBacklogs] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
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
    const { id } = active;
    const { id: overId } = over;

    const activeBacklog = findBacklog(id);
    const overBacklog = findBacklog(overId);

    if (!activeBacklog || !overBacklog || activeBacklog !== overBacklog) return;

    const activeItem = findItem(activeBacklog, id)[0]
    const activeItemIndex = activeBacklog.items.findIndex((item) => item._id === id)
    const overItem = findItem(overBacklog, overId)[0]
    const overItemIndex = overBacklog.items.findIndex((item) => item._id === overId)

    if (activeItem !== overItem) {
      let arr = arrayMove(overBacklog.items, activeItemIndex, overItemIndex)
      let backlogIndex = backlogsValue.indexOf(activeBacklog)
      let newBacklog = backlogsValue[backlogIndex];
      newBacklog.items = arr;
      setBacklogs((prev) => {
        let arr = prev.map((_backlog, i) => {
          if (i === backlogIndex) return newBacklog
          else return prev[i]
        })
  
        return arr
      })
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + overBacklog._id + "/items", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(arr)
      })
    }
    setActiveItem(null);
  }

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    const activeBacklog = findBacklog(id);
    const activeItem = findItem(activeBacklog, id)[0]
    setActiveItem(activeItem)
  }

  const handleDragOver = async (event) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeBacklog = findBacklog(id);
    const overBacklog = findBacklog(overId);

    const activeBacklogIndex = backlogsValue.indexOf(activeBacklog)
    const overBacklogIndex = backlogsValue.indexOf(overBacklog)


    if (!activeBacklog || !overBacklog || activeBacklog === overBacklog) return;

    //Get items
    const activeItems = activeBacklog.items
    const overItems = overBacklog.items
    //Get index of items
    const activeItemIndex = activeBacklog.items.findIndex((item) => item._id === id)
    const overItemIndex = overBacklog.items.findIndex((item) => item._id === overId)

    let newIndex;

    //Determine if item will be the last item if dropped
    const isLast = overItemIndex === overItems.length - 1
    //Determine modifier
    const lastModifier = isLast ? 1 : 0;
    //Set new index, depending on if item is last or is being dropped on the root droppable
    newIndex = overItemIndex >= 0 ? overItemIndex + lastModifier : overItems.length + 1;

    let newActiveBacklog = activeBacklog
    newActiveBacklog.items = newActiveBacklog.items.filter((item) => item._id !== id)

    await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + activeBacklog._id + "/items", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newActiveBacklog.items)
    })

    let newOverBacklog = overBacklog
    newOverBacklog.items = [
      ...overBacklog.items.slice(0, newIndex),
      activeItems[activeItemIndex],
      ...overBacklog.items.slice(newIndex, overBacklog.length)
    ]

    await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/backlogs/" + overBacklog._id + "/items", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOverBacklog.items)
    })

    setBacklogs((prev) => {
      let arr= prev.map((_backlog, i) => {
        if (i === activeBacklogIndex) return newActiveBacklog
        else if (i === overBacklogIndex) return newOverBacklog
        else return prev[i]
      })

      return arr
    })
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
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}>
        <BacklogContext.Provider value={globalState}>
          <section className="header d-flex justify-content-center align-items-center">
            <h1>Games</h1>
          </section>
          <BacklogContainer />
        </BacklogContext.Provider>
        <DragOverlay>{activeItem ? <DragItem data={activeItem} /> : null}</DragOverlay>
      </DndContext>
    </>

  )
}

export default Home