// Setting up our imports.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import AppointmentCard from "./AppointmentCard";

// Creating our Appointment and book apportment components.
const Appointment = () => {
    const [selectedDate, setselectedDate] = useState("");
    const [selectedTime, setselectedTime] = useState("");
    const [bookingStatus, setBookingStatus] = useState("");
    const { appointments} = useOutletContext()

        const handleBookAppointment = async () => {
        // try {
        //     const response = await axios.post('/api/appointments', { date: selectedDate, time: selectedTime });
        //     setBookingStatus(response.data.message);
        // } catch (error) {
        //     console.error('Booking Appointment Error', error);
        // }
    };




    return (
        <>
            <div>
                <h2>Book Tailoring Appointment</h2>
                <input type="date" value={selectedDate} onChange={e => setselectedDate(e.target.value)} />
                <input type="time" value={selectedTime} onChange={e => setselectedTime(e.target.value)} />
                <button onClick={handleBookAppointment}>Book Appointment</button>
                {bookingStatus && <p>{bookingStatus}</p>}
            </div>

            <div className="appointment-cards">
                {appointments.map(appointment => (<AppointmentCard key={appointment.id} appointment={appointment} />))}
            </div>
        </>
    );
};

//     const { appointments} = useOutletContext()


// return (
//     <>
//     <div>
//         <h2>Book Tailoring Appointment</h2>
//         <input type="date" value={selectedDate} onChange={e => setselectedDate(e.target.value)} />
//         <input type="time" value={selectedTime} onChange={e => setselectedTime(e.target.value)} />
//         <button onClick={handleBookAppointment}>Book Appointment</button>
//         {bookingStatus && <p>{bookingStatus}</p>}
//     </div>
    
//     {appointments.map( a => <AppointmentCard appointment={a}/>)}
//     </>
//     );
// };

export default Appointment;