import { useDroppable } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { Item } from '..'

const ItemContainer = (props) => {
    const { id, items } = props
    const { setNodeRef } = useDroppable({
        id
    })

    return (
        <div ref={setNodeRef} className='itemContainer d-flex flex-wrap justify-content-center'>
            <SortableContext key={id} items={items.map(item => item._id)} id={id}>
                {items.map((item) => {
                    return <Item key={item._id} bid={id} data={item} pos={items.indexOf(item)} deleteHandler={props.deleteHandler}/>
                })}
            </SortableContext>
        </div>
    )
}

export default ItemContainer