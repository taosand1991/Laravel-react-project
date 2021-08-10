import React, { Component, Fragment } from "react";
import authContext from "../authentication/auth";
import Navigation from "./Navigation";
import axios from "../utils/Axios";
import urls from "../utils/Urls";
import token from "../utils/token";
import { withRouter } from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            users: [],
            posts: [],
            threads: [],
            userMessage: [],
            postCredentials: { title: "", body: "" },
            image: "",
            count: 0,
            comment: "",
            showComment: 0,
            post: null,
            page: "article",
        };
    }

    setPill = (page) => {
        this.setState({ ...this.state, page });
    };

    changePill = () => {
        this.setState({ ...this.state, page: "article" });
    };

    getUser = async () => {
        try {
            const response = await axios.get(urls.getUser);
            console.log(response);
            this.setState({
                ...this.state,
                user: response.data.user,
                userMessage: response.data.user_message,
            });
        } catch (e) {
            console.log(e.response.data);
        }
    };

    getPosts = async () => {
        try {
            const response = await axios.get(urls.getPosts);
            this.setState({ ...this.state, posts: response.data });
        } catch (e) {
            console.log(e.response.data);
        }
    };

    getThreads = async () => {
        try {
            const response = await axios.get(urls.listThreads);
            this.setState({ ...this.state, threads: response.data });
        } catch (e) {
            console.log(e.response.data);
        }
    };

    getUsers = async () => {
        try {
            const response = await axios.get(urls.getUsers);
            this.setState({ ...this.state, users: response.data });
        } catch (e) {
            console.log(e.response.data);
        }
    };

    logUserOut = setTimeout(async () => {
        if (token.userToken()) {
            await axios.post(urls.userLogout);
            localStorage.removeItem("token");
            return this.props.history.push("/login");
        }
    }, 1000 * 60 * 60);

    async componentDidMount() {
        if (token.userToken()) {
            this.getPosts();
            this.getUsers();
            this.getThreads();
            window.Echo.private("post-message").listen(
                "UpdatePostMessage",
                (e) => {
                    console.log(e);
                    this.getUser();
                    this.getPosts();
                    this.getThreads();
                }
            );
            window.Echo.private("online-users").listen("OnlineUser", (e) => {
                console.log("online");
                console.log(e), this.getUsers();
            });
            window.Echo.private("offline-users").listen("OfflineUser", (e) => {
                console.log("offline");
                console.log(e), this.getUsers();
            });
            return this.getUser();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.logUserOut);
    }

    handleSubmitPost = async (e) => {
        e.preventDefault();
        const {
            postCredentials: { title, body },
            image,
        } = this.state;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("image", image, image.name);
        try {
            const { post } = await axios.post(urls.createPost, formData);
            const posts = [...this.state.posts, post];
            this.setState({ ...this.state, posts });
            setTimeout(() => {
                this.props.history.push("/home");
                this.changePill();
            }, 1500);
        } catch (error) {
            console.log(e.response.data);
        }
    };

    handlePostChanges = (e) => {
        const postCred = { ...this.state.postCredentials };
        postCred[e.target.name] = e.target.value;
        this.setState({ ...this.state, postCredentials: postCred });
        console.log(e.target.value);
    };

    handleImageChanges = (e) => {
        this.setState({ ...this.state, image: e.target.files[0] });
        console.log(e.target.files);
    };

    deletePost = async (id) => {
        try {
            const posts = this.state.posts.filter((post) => post.id !== id);
            this.setState({ posts });
            const {
                data: { message },
            } = await axios.get(`${urls.deletePost}/${id}`);
            alert(message);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (e) {
            console.log(e.response.data);
        }
    };

    handlePostLike = async (id) => {
        const userObject = {
            user_id: this.state.user.id,
        };
        try {
            const response = await axios.post(
                `${urls.likePost}/${id}`,
                userObject
            );
            console.log(response);
            this.getPosts();
            this.setState({ ...this.state, count: this.state.count + 1 });
        } catch (e) {
            console.log(e.response.data);
        }
    };

    handleCommentPost = (id) => {
        return this.setState({ ...this.state, showComment: id });
    };

    handleCommentChange = (e) => {
        this.setState({ ...this.state, comment: e.target.value });
    };

    handleSubmitComment = async (e, id) => {
        if (e.keyCode === 13) {
            const commentObject = {
                user_id: this.state.user.id,
                post_id: id,
                body: this.state.comment,
            };
            try {
                const response = await axios.post(
                    urls.commentPost,
                    commentObject
                );
                console.log(response);
                setTimeout(() => {
                    this.setState({
                        ...this.state,
                        comment: "",
                        showComment: 0,
                    });
                    return this.getPosts();
                }, 2000);
            } catch (error) {
                console.log(error.response.data);
            }
        }
    };

    handleShowComments = (post) => {
        this.setState({ ...this.state, post });
    };

    render() {
        const {
            user,
            posts,
            postCredentials,
            image,
            showComment,
            comment,
            post,
            page,
            users,
            threads,
            userMessage,
        } = this.state;
        const {
            getUser,
            handleImageChanges,
            handlePostChanges,
            handleSubmitPost,
            deletePost,
            handlePostLike,
            handleCommentPost,
            handleSubmitComment,
            handleCommentChange,
            handleShowComments,
            setPill,
            changePill,
            getThreads,
        } = this;
        return (
            <Fragment>
                <authContext.Provider
                    value={{
                        user,
                        getUser,
                        posts,
                        postCredentials,
                        handleImageChanges,
                        handlePostChanges,
                        handleSubmitPost,
                        deletePost,
                        handlePostLike,
                        showComment,
                        handleCommentPost,
                        handleSubmitComment,
                        handleCommentChange,
                        handleShowComments,
                        image,
                        comment,
                        post,
                        page,
                        setPill,
                        userMessage,
                        users,
                        threads,
                        getThreads,
                    }}
                >
                    <Navigation />
                </authContext.Provider>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default withRouter(Main);
