import React, { useState } from 'react';

const User = ({admin, email, registeredOn, userID, handleDelete}) => {
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
                <div className="author">
                    <div className="author__text">
                        <p className="author__name font-small"><b>UserID</b>: {userID}</p>
                        <p className="author__name font-small"><b>Status:</b> {admin ? "is admin" : "is not admin"}</p>
                        <p className="author__name font-small"><b>Registered on</b>: {date.toLocaleDateString()}</p>
                    </div>
                </div>
                {editHandler && (
                    <div className="edit__btns">
                        <button
                            className="btn btn--publish btn--delete font-small" 
                            style={{marginTop: "2rem"}} 
                            onClick={(e) => handleDelete(userID)}
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