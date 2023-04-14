import { useEffect, useState } from "react";
import axios from 'axios'
const URL = 'http://localhost:3003/';
const urlBox = 'box';
const urlContainer = 'container';

export const useWrite = () => {

    const [response, setResponse] = useState(null);

    //box---------------
    const [createBox, setCreateBox] = useState(null);
    const [destroyBox, setDeleteBox] = useState(null);
    const [editBox, setEditBox] = useState(null);

    //container---------------
    const [createContainer, setCreateContainer] = useState(null);
    const [destroyContainer, setDeleteContainer] = useState(null);

    //box---------------
    useEffect(() => {
        if (null === createBox) {
            return;
        }
        axios.post(URL+urlBox, createBox)
            .then(res => setResponse(res.data));

    }, [createBox]);

    useEffect(() => {
        if (null === destroyBox) {
            return;
        }
        axios.delete(URL+urlBox + '/' + destroyBox.boxId)
            .then(res => setResponse(res.data));

    }, [destroyBox]);

    useEffect(() => {
        if (null === editBox) {
            return;
        }
        axios.put(URL+urlBox + '/' + editBox.boxId, editBox)
            .then(res => setResponse(res.data));

    }, [editBox]);

    //container---------------
    useEffect(() => {
        if (null === createContainer) {
            return;
        }
        axios.post(URL+urlContainer, createContainer)
            .then(res => setResponse(res.data));

    }, [createContainer]);

    useEffect(() => {
        if (null === destroyContainer) {
            return;
        }
        axios.delete(URL+urlContainer + '/' + destroyContainer.id)
            .then(res => setResponse(res.data));

    }, [destroyContainer]);

    return [response, setCreateBox, setDeleteBox, setEditBox, setCreateContainer, setDeleteContainer];

}