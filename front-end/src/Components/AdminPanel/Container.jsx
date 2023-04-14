import { useContext, useState } from "react";
import { Global } from "../Global";

function Container() {
    const { listBox, listContainer, setCreateContainer, setDeleteContainer, setDeleteBox } = useContext(Global);

    const [containerSize, setContainerSize] = useState("default");

    const renderSwitch = (param) => {
        switch (param) {
            case 2: return "S - fits 2";
            case 4: return "M - fits 4";
            case 6: return "L - fits 6";
            default: return "naujas neivestas dydis";
        }
    };

    const containerSizeHandler = (event) => {
        setContainerSize(event.target.value);
      };
    
    const containerCreate = () => {
        if(containerSize === "default"){
            
        } else {
            setCreateContainer({type: containerSize});
            setContainerSize("default");
        }
    }

    const deleteContainerHandler = (id) => {
        let containerToDelte = listContainer.find((container) => container.id === id);
        let boxesToDelete = listBox.filter((box) => box.id === id);
        boxesToDelete.map((box) => setDeleteBox(box));
        setDeleteContainer(containerToDelte);
      };

    return (
        <div>
            <h3>Container</h3>
            <div>
                <div>
                    <label htmlFor="containerSize">Select size: </label>
                    <select id="containerSize" value={containerSize} onChange={containerSizeHandler}>
                        <option value="default">Not selected</option>
                        <option value="2">Size 2 - small</option>
                        <option value="4">Size 4 - medium</option>
                        <option value="6">Size 6 - large</option>
                    </select>
                    <button onClick={containerCreate}>Create container</button>
                </div>
            </div>
            <div>
                {listContainer
                    ? [...listContainer].map((container) => (
                        <div key={container.id}>
                            <p>
                                Container id: {container.id}, Container size:
                                {renderSwitch(container.type)}
                            </p>
                            <button onClick={() => deleteContainerHandler(container.id)}>Delete</button>
                        </div>
                    ))
                    : null}
            </div>
        </div>
    );
}

export default Container;
