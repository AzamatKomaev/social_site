import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

const ChatFilteringInput = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState<string | undefined>()

    const filterByString = () => {

        dispatch({
            type: "",
            payload: {
                string: name === "" ? undefined : name
            }
        })
    }

    return (
        <div className="row">
            <div className="col-11 col-md-10 col-lg-9 col-xl-9 mx-auto" style={{display: "flex"}}>
                <input
                    type="text"
                    style={{fontSize: "10pt"}}
                    className="form-control my-3 ml-2"
                    placeholder="Search..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button className="btn btn-primary my-3 ml-2" onClick={filterByString} style={{fontSize: "10pt"}}>Найти</button>
            </div>
        </div>
    )
}

export default ChatFilteringInput;