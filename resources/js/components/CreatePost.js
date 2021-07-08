import React from "react";
import authContext from "../authentication/auth";

function CreatePost({ page }) {
    const {
        postCredentials,
        handlePostChanges,
        handleImageChanges,
        image,
        handleSubmitPost,
    } = React.useContext(authContext);

    const formCheck = () => {
        const { title, body } = postCredentials;
        return title === "" || body === "" || image === "";
    };

    if (page === "create")
        return (
            <div className="container p-5 w-50 w-auto border border-2 smaller">
                <form onSubmit={handleSubmitPost}>
                    <div className="form-group mb-4">
                        <label className="form-label" htmlFor="form4Example1">
                            Post Title
                        </label>
                        <input
                            onChange={handlePostChanges}
                            name="title"
                            value={postCredentials.title}
                            required
                            type="text"
                            id="form4Example1"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label className="form-label" htmlFor="form4Example3">
                            Post Body
                        </label>
                        <textarea
                            required
                            name="body"
                            value={postCredentials.body}
                            onChange={handlePostChanges}
                            className="form-control"
                            id="form4Example3"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            required
                            onChange={handleImageChanges}
                            type="file"
                            className="form-control"
                            id="inputGroupFile02"
                        />
                        <label
                            className="input-group-text"
                            htmlFor="inputGroupFile02"
                        >
                            Upload
                        </label>
                    </div>
                    <button
                        disabled={formCheck()}
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                    >
                        Send
                    </button>
                </form>
            </div>
        );
    return null;
}

export default CreatePost;
