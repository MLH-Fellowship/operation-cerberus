import React, {useState} from 'react';


const CreateUser = ({handleSubmitUser, handleCancel}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className="card">
            {/* <img alt="food" src={image} className="card__img"></img> */}
            <div className="card__description">
                <h3 className="card__title">{email}</h3>
                {/* <p className="card__preview">{story.slice(0, 100)}... <Link to={`/stories/${_id}`} className="card__preview__more">READ MORE</Link></p> */}
                <div className="author">
                    {/* <div className="author__img" style={{backgroundImage: `url('${authorImage}')`}}></div> */}
                    <div className="author__text">
                        <label htmlFor="email"><b>Email: </b></label>
                        <input 
                            type="text"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="author__name font-small"
                            placeholder="Email"
                            value={email}
                        />

                        <label htmlFor="password"><b>Password: </b></label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="author__name font-small"
                            placeholder="Password"
                            value={password}
                        />

                        <label htmlFor="status"><b>Status: </b></label>
                        <select 
                            name="status" 
                            className="author__name font-small"
                            onChange={(e) => {
                                if (e.value === 0) {
                                    setIsAdmin(false);
                                } else {
                                    setIsAdmin(true);
                                }
                            }} 
                        >
                            <option value={0}>Not Admin</option>
                            <option value={1}>Is Admin</option>
                        </select>

                        {/* <input className="author__name font-small"><b>Registered on</b>: {date.toLocaleDateString()}</input> */}
                        {/* <p className="author__name font-small"><b>UserID</b>: {userID}</p>
                        <p className="author__name font-small"><b>Status:</b> {admin ? "is admin" : "is not admin"}</p>
                        <p className="author__name font-small"><b>Registered on</b>: {date.toLocaleDateString()}</p> */}
                    </div>
                </div>
                <div className="edit__btns">
                    <button
                        className="btn btn--publish font-small" 
                        style={{marginTop: "2rem"}} 
                        onClick={() => handleSubmitUser(email, password, isAdmin)}
                    >
                        Create
                    </button>
                    <button
                        className="btn btn--publish btn--delete font-small" 
                        style={{marginTop: "2rem"}} 
                        onClick={() => handleCancel()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateUser;