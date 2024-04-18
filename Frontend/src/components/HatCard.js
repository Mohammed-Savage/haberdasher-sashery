import React from "react";

const HatCard = ({ hat }) => {
    return (
        <div className="hat-card">
            <h3>Hat Details</h3>
            <p>ID: {hat.id}</p>
            <p>Name: {hat.name}</p>
            <img src={hat.image} alt={hat.name} /> 
            {/* This will only display the image url, not the actual image.
            <p>Image: {hat.image}</p> */}
            <p>Price: {hat.price}</p>
            <p>Description: {hat.description}</p>
        </div>
    );
};

export default HatCard;