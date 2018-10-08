import React from 'react';

export default ({description, amount, createdAt}) => (
    <div>
        <ul>
            <li>{description}</li>
            <li>{amount}</li>
            <li>{createdAt}</li>
        </ul>
    </div>
)