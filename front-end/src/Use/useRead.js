import { useEffect, useState } from "react";
import axios from 'axios'
const URL = 'http://localhost:3003';
const urlBox = '/box';
const urlContainer = '/container';

export const useRead = () => {

    const [listBox, setListBox] = useState(null);
    const [listContainer, setListContainer] = useState(null);
    const [update, setUpdate] = useState(null);

    useEffect(() => {
        if (null === update) {
            return;
        }
        axios.get(URL + urlBox)
            .then(res => setListBox(res.data));

    }, [update]);

    useEffect(() => {
        if (null === update) {
            return;
        }
        axios.get(URL+urlContainer)
            .then(res => setListContainer(res.data));

    }, [update]);

    return [listBox, listContainer, setUpdate];

}