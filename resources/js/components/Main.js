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
            posts: [],
            postCredentials: { title: "", body: "" },
            image: "",
            count: 0,
            comment: "",
            showComment: 0,
            post: {},
        };
    }

    getUser = async () => {
        try {
            const response = await axios.get(urls.getUser);
            this.setState({ ...this.state, user: response.data.user });
        } catch (e) {
            console.log(e.response.data);
        }
    };

    getPosts = async () => {
        try {
            const response = await axios.get(urls.getPosts);
            console.log(response.data);
            this.setState({ ...this.state, posts: response.data });
        } catch (e) {
            console.log(e.response.data);
        }
    };

    async componentDidMount() {
        if (token.userToken()) {
            this.getPosts();
            return this.getUser();
        }
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
            window.location.reload();
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
