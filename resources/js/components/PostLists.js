import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import urls from "../utils/Urls";
import authContext from "../authentication/auth";

function PostLists({ posts, page }) {
    const {
        deletePost,
        handlePostLike,
        user,
        showComment,
        handleCommentPost,
        handleSubmitComment,
        handleCommentChange,
        handleShowComments,
        comment,
    } = React.useContext(authContext);
    const showImage = (image) => {
        const findImage = image.includes("https");
        if (findImage) return image;
        else return `${urls.imageLink}/${image}`;
    };
    const likedPost = (post) => {
        if (post.likes.length !== 0) {
            if (user.id === post.likes[0].id) {
                return (
                    <i
                        onClick={() => handlePostLike(post.id)}
                        className="bi-hand-thumbs-up-fill me-4 fs-4"
                    >
                        {post.likes.length}
                    </i>
                );
            } else {
                return (
                    <i
                        onClick={() => handlePostLike(post.id)}
                        className="bi-hand-thumbs-up me-4 fs-4"
                    >
                        {post.likes.length}
                    </i>
                );
            }
        } else {
            return (
                <i
                    onClick={() => handlePostLike(post.id)}
                    className="bi-hand-thumbs-up me-4 fs-4"
                >
                    {post.likes.length}
                </i>
            );
        }
    };
    if (page === "article")
        return (
            <div className="container  p-2">
                <div className="row g-4">
                    {posts.map((post) => {
                        return (
                            <div key={post.id} className="col-md-6 col-lg-6">
                                <div
                                    className="card"
                                    style={{ maxWidth: "500px" }}
                                >
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src={showImage(post.image)}
                                                alt="..."
                                                className="img-fluid  py-lg-0 py-md-5 px-lg-0 px-md-2"
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    <Link to={"#"}>
                                                        {post.title}
                                                    </Link>
                                                </h5>
                                                <small className="text-muted">
                                                    by {post.user.name}
                                                </small>
                                                <p className="card-text">
                                                    {post.body.substring(
                                                        0,
                                                        150
                                                    ) + "..."}
                                                </p>
                                                <hr></hr>
                                                <div className="mt-0 social">
                                                    {likedPost(post)}
                                                    <i
                                                        onClick={() =>
                                                            handleShowComments(
                                                                post
                                                            )
                                                        }
                                                        data-bs-toggle="offcanvas"
                                                        data-bs-target="#offcanvasExample"
                                                        className="bi-chat-square me-4 fs-4 position-relative text-center"
                                                    >
                                                        {post.comments.length >
                                                            0 && (
                                                            <span className="position-absolute text-white fs-0 top-0 start-100 translate-middle bg-danger badge rounded-pill">
                                                                {
                                                                    post
                                                                        .comments
                                                                        .length
                                                                }
                                                            </span>
                                                        )}
                                                    </i>
                                                    <i className="bi-facebook me-4 fs-4"></i>
                                                    <i className="bi-instagram me-4 fs-4"></i>
                                                    <i className="bi-twitter me-4 fs-4"></i>
                                                </div>
                                                <hr></hr>
                                                <small
                                                    onClick={() =>
                                                        handleCommentPost(
                                                            post.id
                                                        )
                                                    }
                                                    className="text-muted fst-italic pointer"
                                                >
                                                    Add comment
                                                </small>
                                                <div className="input-group">
                                                    {showComment ===
                                                        post.id && (
                                                        <textarea
                                                            placeholder="Write a comment"
                                                            value={comment}
                                                            onChange={
                                                                handleCommentChange
                                                            }
                                                            onKeyDown={(e) =>
                                                                handleSubmitComment(
                                                                    e,
                                                                    post.id
                                                                )
                                                            }
                                                            className="form-control show-input"
                                                        />
                                                    )}
                                                </div>
                                                {showComment === post.id && (
                                                    <hr />
                                                )}

                                                {post.user_id === user.id && (
                                                    <div className="mt-2 mb-2">
                                                        <i
                                                            onClick={() =>
                                                                deletePost(
                                                                    post.id
                                                                )
                                                            }
                                                            style={{
                                                                cursor:
                                                                    "pointer",
                                                            }}
                                                            className="bi-trash-fill fs-4 text-danger"
                                                        ></i>
                                                    </div>
                                                )}
                                                <p className="card-text">
                                                    <small className="text-muted">
                                                        posted{" "}
                                                        {moment(
                                                            post.created_at
                                                        ).fromNow()}
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    return null;
}

export default PostLists;
