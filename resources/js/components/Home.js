import React, { Fragment, useEffect, useState } from "react";
import authContext from "../authentication/auth";
import moment from "moment";
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
                        {post !== null && post.title}
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
                        {post !== null && post.comments.length > 0 ? (
                            post.comments.map((comment) => {
                                return (
                                    <React.Fragment key={comment.id}>
                                        <div className="comment_section_2">
                                            <div className="image_section">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtgN28rV5wcXiUJA1TakyATlZTvaqAbDBXkw&usqp=CAU" />
                                            </div>
                                            <div className="body_section">
                                                <small className="text-muted">{comment.user.name}</small>
                                                <p>{comment.body}</p>
                                            </div>
                                        </div>
                                        <div className="social_division">
                                            <small>like</small>
                                            <small>reply</small>
                                            <small>
                                                {moment(
                                                    comment.created_at
                                                ).fromNow()}
                                            </small>
                                        </div>
                                        <hr />
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <div className="text-center d-flex justify-content-center align-items-center">
                                <h5>No comments for this post</h5>
                            </div>
                        )}
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
