import Pusher from "pusher-js";

const pusher = new Pusher("f48f412183b35e458a01", {
    cluster: "us2",
});

export default pusher;
