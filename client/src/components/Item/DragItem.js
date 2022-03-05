import { Button } from "react-bootstrap";

const DragItem = (props) => {

    return (
        <>
            <div id={props.data._id} className="item d-flex flex-column align-items-center">
                <img className="image itemImage" src={props.data.imageThumb}/>
                <div className="d-flex align-items-center mt-2">
                    <Button variant="primary" className="button itemButton infoButton mx-1">
                        <div className="bi bi-arrows-move itemIcon icon"></div>
                    </Button>
                    <Button variant="primary" className="button itemButton infoButton mx-1">
                        <div className="bi bi-info itemIcon icon"></div>
                    </Button>
                    <Button variant="primary" className="button itemButton deleteButton">
                        <div className="bi bi-trash itemIcon icon"></div>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default DragItem;