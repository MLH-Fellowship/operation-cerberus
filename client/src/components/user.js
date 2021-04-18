import React, { useState } from 'react';

const User = ({admin, email, registeredOn, userID}) => {
    const editHandler = 1;
    const [uid, setUID] = useState(userID);
    const [isAdmin, setIsAdmin] = useState(admin);

    const handleEdit = (e) => {
        return;
    }
    
    const date = new Date(registeredOn);
    return (
        <div className="card">
            {/* <img alt="food" src={image} className="card__img"></img> */}
            <div className="card__description">
                <h3 className="card__title">{email}</h3>
                {/* <p className="card__preview">{story.slice(0, 100)}... <Link to={`/stories/${_id}`} className="card__preview__more">READ MORE</Link></p> */}
                <div className="author">
                    {/* <div className="author__img" style={{backgroundImage: `url('${authorImage}')`}}></div> */}
                    <div className="author__text">
                        {/* <label htmlFor="id"><b>UserID: </b></label>
                        <input 
                            type="text"
                            name="id"
                            id="id"
                            onChange={setUID}
                            className="author__name font-small"
                        >
                            UserID: {userID}
                        </input>

                        <label htmlFor="status"><b>Status: </b></label>
                        <select 
                            name="status" 
                            className="author__name font-small"
                        >
                            {admin ? "is admin" : "is not admin"}
                        </select> */}

                        {/* <input className="author__name font-small"><b>Registered on</b>: {date.toLocaleDateString()}</input> */}
                        <p className="author__name font-small"><b>UserID</b>: {userID}</p>
                        <p className="author__name font-small"><b>Status:</b> {admin ? "is admin" : "is not admin"}</p>
                        <p className="author__name font-small"><b>Registered on</b>: {date.toLocaleDateString()}</p>
                    </div>
                </div>
                {editHandler && (
                    <div className="edit__btns">
                        {/* <div
                            className="btn btn--publish font-small" 
                            style={{marginTop: "2rem"}} 
                            onClick={editHandler}
                        >
                            Edit
                        </div> */}
                        <button
                            className="btn btn--publish btn--delete font-small" 
                            style={{marginTop: "2rem"}} 
                            // onClick={editHandler}
                        >
                            Delete
                        </button>
                        {/* <button className="btn" onClick={deleteHandler}>Delete</button> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;