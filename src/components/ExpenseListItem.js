import React from 'react';
import {Link} from "react-router-dom";

const ExpenseListItem = ({description, amount, createdAt, id}) => (
    <div>
        <h4><Link to={`/edit/${id}`}>{description}</Link></h4>
        <p>{amount} - {createdAt}</p>
    </div>
);

export default ExpenseListItem;