import { useContext, useState } from "react";
import { Global } from "../Global";

function Box() {

    const { listBox, listContainer, setCreateBox, setDeleteBox} = useContext(Global);

    const [weight, setWeight] = useState(0);
    const [name, setName] = useState("");
    const [isBurnable, setIsBurnable] = useState("default");
    const [isExpiringFast, setIsExpiringFast] = useState("default");
    const [selectedContainer, setSelectedContainer] = useState("default");

    const weightHandler = (event) => {
        setWeight(event.target.value);
    };

    const nameHandler = (event) => {
        setName(event.target.value);
    };

    const isBurnableHandler = (event) => {
        setIsBurnable(event.target.value);
    }

    const isExpiringFastHandler = (event) => {
        setIsExpiringFast(event.target.value);
    }

    const selectedContainerHandler = (event) => {
        setSelectedContainer(event.target.value);
    }

    const dataFormHandler = (event) => {
        event.preventDefault();
        if (weight <= 0 || name.length === 0 || isBurnable === "default" || isExpiringFast === "default" || selectedContainer === "default") {
            console.log("negerai");
        } else {
            setCreateBox({
                id: selectedContainer,
                weight: weight,
                name: name,
                isBurnable: isBurnable,
                isExpiringFast: isExpiringFast
            });
            setWeight(0);
            setName("");
            setIsBurnable("default");
            setIsExpiringFast("default");
            setSelectedContainer("default");
        }
    }

    const filteredList = (event) => {
        let filteredBoxList = [...listBox].filter((box) => box.id === event.id);
        if (event.type > filteredBoxList.length) {
            return true;
        } else {
            return false;
        }
    }

    const renderSwitchBurnable = (param) => {
        switch (param) {
            case 0: return "Non burnable";
            case 1: return "Burnable";
            default: return "";
        }
    };

    const renderSwitchExpiring = (param) => {
        switch (param) {
            case 0: return "Not expiring";
            case 1: return "Fast expiring";
            default: return "";
        }
    };

    const deleteBoxHandler = (id) => {
        let boxToDelte = listBox.find((box) => box.boxId === id);
        setDeleteBox(boxToDelte);
    }

    return (
        <div>
            <h3>Box</h3>
            <form onSubmit={dataFormHandler}>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <input type="number" id="weight" value={weight || 0} onChange={weightHandler} />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name || ""} onChange={nameHandler} />
                </div>
                <div>
                    <label htmlFor="containerSize">Is it burnable: </label>
                    <select id="containerSize" value={isBurnable} onChange={isBurnableHandler}>
                        <option value="default">Not selected</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="containerSize">Does it expire fast: </label>
                    <select id="containerSize" value={isExpiringFast} onChange={isExpiringFastHandler}>
                        <option value="default">Not selected</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="containerSize">Select container: </label>
                    <select id="containerSize" value={selectedContainer} onChange={selectedContainerHandler}>
                    <option value="default">Not selected</option>
                        {
                            listContainer ?
                                [...listContainer].map((container) =>
                                    filteredList(container) ?
                                    <option key={container.id}>
                                        {container.id}
                                    </option>
                                    : null)
                                : null
                        }
                    </select>
                </div>
                <button type="submit">Create box</button>
            </form>
            <div>
                {listBox
                    ? [...listBox].map((box) => (
                        <div key={box.boxId}>
                            <p>
                                Box info: {box.boxId} id, {box.weight} weight, {renderSwitchBurnable(box.isBurnable)} {renderSwitchExpiring(box.isExpiringFast)} {box.id}container
                            </p>
                            <button>edit</button>
                            <button onClick={() => deleteBoxHandler(box.boxId)}>delete</button>
                        </div>
                    ))
                    : null}
            </div>
        </div>
    )
}

export default Box;