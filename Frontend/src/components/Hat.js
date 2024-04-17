// Setting up our imports.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import HatCard from "./HatCard";

// Creating our Appointment and book apportment components.
const Hat = () => {
    const { hats } = useOutletContext()
    return (
        <>
            <div className="hat-cards">
                {hats.map(hat => (<HatCard key={hat.id} hat={hat} />))}
            </div>
        </>
    );
};
export default Hat;