import React, { Fragment, useEffect, useState } from "react";
import authContext from "../authentication/auth";
import Navbar from "./Navbar";
import PillBar from "./PillBar";
import PostLists from "./PostLists";
import CreatePost from "./CreatePost";

function Home(props) {
    const [state, setState] = useState({ page: "article" });
    const { posts, deletePost, post } = React.useContext(authContext);
    useEffect(() => {
        console.log("mounted");
    }, [state.page]);

    const setPill = (page) => {
        console.log(page);
        setState({ ...state, page });
    };
    console.log(state.page);
    return (
        <Fragment>
            <Navbar />
            <div
                className="offcanvas offcanvas-start"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
            >
                <div className="offcanvas-header">
                    <h4 className="offcanvas-title" id="offcanvasExampleLabel">
                        {post.title}
                    </h4>
                    <button
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    />
                </div>
                <hr />
                <div className="offcanvas-body">
                    <div className="comment_section">
                        <div className="image_section">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtgN28rV5wcXiUJA1TakyATlZTvaqAbDBXkw&usqp=CAU" />
                        </div>
                        <div className="body_section">
                            <p>{post.body}</p>
                        </div>
                    </div>
                </div>
            </div>
            <PillBar setPill={setPill} page={state.page} />
            <PostLists
                posts={posts}
                page={state.page}
                deletePost={deletePost}
            />
            <CreatePost page={state.page} />
        </Fragment>
    );
}

export default Home;
