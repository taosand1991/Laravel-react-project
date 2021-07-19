import React from "react";

const ChatBox = ({
    userName,
    messages,
    mainUser,
    handleChange,
    handleSubmit,
    message,
}) => {
    return (
        <div className="chat-box">
            <div className="chat__box__header">
                <div className="chat_box_header_inner">
                    <span></span>
                    <h5>{userName.name}</h5>
                    <i className="bi bi-three-dots" />
                </div>
            </div>
            <div className="chat__box__body">
                {messages && messages.length > 0 ? (
                    messages.map((message) => {
                        return (
                            <p
                                key={message.id}
                                className={
                                    message.user_id === mainUser.id
                                        ? "sender"
                                        : "reciever"
                                }
                            >
                                {message.message}
                            </p>
                        );
                    })
                ) : (
                    <div className="d-flex  justify-content-center align-items-center">
                        Start to chat!!!
                    </div>
                )}
            </div>
            <div className="chat__box__footer">
                <i className="bi bi-emoji-smile" />
                <input
                    className="text-input"
                    placeholder="type something"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                />
                <i className="bi bi-envelope-fill" />
            </div>
        </div>
    );
};

export default ChatBox;
