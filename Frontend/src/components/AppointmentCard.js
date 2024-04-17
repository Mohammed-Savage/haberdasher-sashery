// import React, { useState } from 'react';

// export default function AppointmentCard({ appointment }) {
//     const 

import React from "react";

const AppointmentCard = ({ appointment }) => {
    return (
        <div className="appointment-card">
            <h3>Appointment Details</h3>
            <p>ID: {appointment.id}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>User ID: {appointment.user_id}</p>
        </div>
    );
};

export default AppointmentCard;