import React from "react";

const HatCard = ({ hat }) => {
    return (
        <div className="hat-card">
            <h3>Hat Details</h3>
            <p>ID: {hat.id}</p>
            <p>Name: {hat.name}</p>
            <p>Image: {hat.image}</p>
            <p>Price: {hat.price}</p>
            <p>Description: {hat.description}</p>
        </div>
    );
};

export default HatCard;