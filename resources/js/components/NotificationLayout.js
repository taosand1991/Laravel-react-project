import React, { Fragment } from "react";

function NotificationLayout({ userMessage }) {
    return (
        <Fragment>
            <div className="notify-container">
                <div className="notify-list">
                    <ul>
                        {userMessage.map((user) => {
                            return <li key={user.id}>{user.message_body}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}

export default NotificationLayout;
