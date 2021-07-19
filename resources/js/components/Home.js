import React, { Fragment, useEffect, useState } from "react";
import authContext from "../authentication/auth";
import moment from "moment";
import Navbar from "./Navbar";
import PillBar from "./PillBar";
import PostLists from "./PostLists";
import CreatePost from "./CreatePost";
import ChatBox from "./ChatBox";
import axios from "../utils/Axios";
import Urls from "../utils/Urls";

function Home(props) {
    const {
        posts,
        deletePost,
        users,
        user,
        post,
        page,
        setPill,
        changePill,
    } = React.useContext(authContext);
    const [state, setState] = useState({ user: {}, thread: {}, message: "" });
    useEffect(() => {
        const closeDialog = document.querySelector(".close-dialog");
        const mainContent = document.querySelector(".overlay-chat");
        const closeChat = document.querySelector(".bi-three-dots");
        const chatBox = document.querySelector(".chat-box");
        const messageContent = document.querySelector(".messaging-container");
        closeDialog.addEventListener("click", function (params) {
            messageContent.classList.remove("zoom-in");
            mainContent.classList.remove("zoom-out");
        });
        closeChat.addEventListener("click", function () {
            if (chatBox.classList.contains("zoom-in")) {
                chatBox.classList.remove("zoom-in");
            }
            return chatBox.classList.add("zoom-out");
        });

        window.Echo.private(`thread.${state.thread.id}`).listen(
            "PublishMessages",
            (e) => {
                setState({ ...state, thread: e.thread });
            }
        );
    }, [page, state.thread]);

    const handleZoomOut = () => {
        const mainContent = document.querySelector(".overlay-chat");
        const messageContent = document.querySelector(".messaging-container");
        mainContent.classList.add("zoom-out");
        messageContent.classList.add("zoom-in");
    };

    const handleTiming = (user) => {
        const loginTime = new Date(user.login_time);
        const logoutTime = new Date(user.logout_time);
        if (loginTime > logoutTime) return <span className="online"></span>;
        else return <span className="offline"></span>;
    };

    const handleUserClick = async (secondUser) => {
        const threadObject = {
            first_user: user.id,
            second_user: secondUser.id,
            name: `${user.id} | ${secondUser.id}`,
        };

        try {
            const response = await axios.post(Urls.createThread, threadObject);
            setState({ ...state, thread: response.data[0], user: secondUser });
            const chatBox = document.querySelector(".chat-box");
            if (chatBox.classList.contains("zoom-out")) {
                chatBox.classList.remove("zoom-out");
            }
            const chatBody = document.querySelector(".chat__box__body");
            chatBody.scroll(0, chatBody.scrollHeight);
            return chatBox.classList.add("zoom-in");
        } catch (e) {
            console.log(e.response.data);
        }
    };

    const realUsers = users.filter((otherUser) => {
        return otherUser.id !== user.id;
    });

    const handleMessageChange = (e) => {
        setState({ ...state, message: e.target.value });
    };

    const handleSubmitMessage = async (e) => {
        const messageObject = {
            message: state.message,
            thread_id: state.thread.id,
            user_id: user.id,
            is_read: false,
        };
        if (e.keyCode === 13) {
            try {
                const response = await axios.post(
                    `${Urls.createMessage}/${state.thread.id}`,
                    messageObject
                );
                let thread = { ...state.thread };
                thread.messages.push(response.data[0]);
                setState({ ...state, message: "", thread: thread });
                const chatBody = document.querySelector(".chat__box__body");
                chatBody.scroll(0, chatBody.scrollHeight);
            } catch (e) {
                console.log(e.response.data);
            }
        }
    };

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
                                                <small className="text-muted">
                                                    {comment.user.name}
                                                </small>
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
            <div className="head-container">
                <div onClick={handleZoomOut} className="overlay-chat">
                    <div className="chat-container">
                        <i className="bi bi-chat-left-text-fill"></i>
                    </div>
                </div>
                <div className="messaging-container">
                    <div className="close-dialog">
                        <i className="bi bi-x-circle-fill"></i>
                    </div>
                    <div className="message-header">
                        <h5>Users List</h5>
                    </div>
                    <div className="user-box">
                        <ul className="users-list">
                            {realUsers.map((user) => {
                                return (
                                    <li
                                        onClick={() => handleUserClick(user)}
                                        key={user.id}
                                    >
                                        {user.name} {handleTiming(user)}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <ChatBox
                    userName={state.user}
                    messages={state.thread["messages"]}
                    mainUser={user}
                    handleChange={handleMessageChange}
                    handleSubmit={handleSubmitMessage}
                    message={state.message}
                />
                <PillBar setPill={setPill} page={page} />
                <PostLists posts={posts} page={page} deletePost={deletePost} />
                <CreatePost page={page} changePill={changePill} />
            </div>
        </Fragment>
    );
}

export default Home;
