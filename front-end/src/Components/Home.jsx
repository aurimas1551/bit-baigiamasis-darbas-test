import { useContext, useState } from "react";
import { Global } from "./Global";

function Home() {

    const { listBox, listContainer } = useContext(Global);

    const [filter, setFilter] = useState("default");

    const filteredList = (event) => {
        let filteredBoxList = [...listBox].filter((box) => box.id === event.id);
        filteredListWeight(filteredBoxList);
        return filteredBoxList.length;
    }

    const filteredListWeight = (event) => {
        let filteredBoxList = [...listBox].filter((box) => box.id === event.id);
        let sum = 0;
        if (filteredBoxList.length > 0) {
            filteredBoxList.forEach(box => sum += box.weight);
            return sum;
        } else {
            return 0;
        }
    }

    const renderSwitch = (param) => {
        switch (param) {
            case 2: return "S - fits 2";
            case 4: return "M - fits 4";
            case 6: return "L - fits 6";
            default: return "naujas neivestas dydis";
        }
    };

    const filterHandler = (event) => {
        setFilter(event.target.value);
    }

    const fListContainer = (e) => {
        if (e != null) {
            let filteredListContainer = listContainer.filter((container) =>
                filter === "full"
                    ? (container.type === ([...listBox].filter((box) => box.id === container.id)).length)
                    : true
            );
            return filteredListContainer;
        } else return null;

    }

    const a = fListContainer(listContainer);

    return (
        <div>
            <div>
                <label htmlFor="containerContent">Filter: </label>
                <select id="containerContent" value={filter} onChange={filterHandler}>
                    <option value="default">All</option>
                    <option value="full">Full only</option>
                </select>
            </div>
            <div>
                {a
                    ? [...a].map((container) => (
                        <div key={container.id}>
                            <p>
                                Container id: {container.id}, Container size: {renderSwitch(container.type)}, Boxes inside {filteredList(container)}, Total weight {filteredListWeight(container)}
                            </p>
                        </div>
                    ))
                    : null}
            </div>
        </div>
    );
}

export default Home;
