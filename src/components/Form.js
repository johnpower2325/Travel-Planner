import React, { useState } from "react";
import fetchItinerary from "../services/api"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
    const [inputs, setInputs] = useState({
        place: "",
        days: "",
        startDate: null,
        endDate: null,
        persons: "",
    });
    const [itinerary, setItinerary] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });

        // Recalculate end date if the number of days is updated
        if (name === "days" && inputs.startDate) {
            const newEndDate = new Date(inputs.startDate);
            newEndDate.setDate(newEndDate.getDate() + parseInt(value));
            setInputs({ ...inputs, days: value, endDate: newEndDate });
        }
    };

    const handleStartDateChange = (date) => {
        setInputs({ ...inputs, startDate: date });

        // Automatically set the end date based on the number of days
        if (inputs.days) {
            const newEndDate = new Date(date);
            newEndDate.setDate(newEndDate.getDate() + parseInt(inputs.days));
            setInputs({ ...inputs, startDate: date, endDate: newEndDate });
        }
    };

    const validateInputs = () => {
        if (!inputs.place) {
            toast.error("Please select a place.");
            return false;
        }
        if (!inputs.days || inputs.days <= 0) {
            toast.error("Please enter a valid number of days.");
            return false;
        }
        if (!inputs.startDate) {
            toast.error("Please select a start date.");
            return false;
        }
        if (!inputs.endDate) {
            toast.error("Please select an end date.");
            return false;
        }
        if (inputs.endDate < inputs.startDate) {
            toast.error("End date cannot be earlier than start date.");
            return false;
        }
        if (!inputs.persons || inputs.persons <= 0) {
            toast.error("Please enter a valid number of persons.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }
        const response = await fetchItinerary(inputs);
        setItinerary(response);
    };

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <ToastContainer />
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Place Dropdown */}
                <select
                    name="place"
                    className="w-full p-2 border rounded"
                    value={inputs.place}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Place</option>
                    <option value="Auckland">Auckland</option>
                    <option value="Wellington">Wellington</option>
                    <option value="Christchurch">Christchurch</option>
                    <option value="Queenstown">Queenstown</option>
                    <option value="Rotorua">Rotorua</option>
                </select>

                {/* Number of Days */}
                <input
                    type="number"
                    name="days"
                    placeholder="Number of Days"
                    className="w-full p-2 border rounded"
                    value={inputs.days}
                    onChange={handleChange}
                    min="1"
                />

                {/* Start Date Picker */}
                <DatePicker
                    selected={inputs.startDate}
                    onChange={handleStartDateChange}
                    minDate={new Date()}
                    placeholderText="Select Start Date"
                    className="w-full p-2 border rounded"
                />

                {/* End Date Picker */}
                <DatePicker
                    selected={inputs.endDate}
                    onChange={(date) => setInputs({ ...inputs, endDate: date })}
                    placeholderText="Select End Date"
                    className="w-full p-2 border rounded"
                    readOnly
                />

                {/* Number of Persons */}
                <input
                    type="number"
                    name="persons"
                    placeholder="Number of Persons"
                    className="w-full p-2 border rounded"
                    value={inputs.persons}
                    onChange={handleChange}
                    min="1"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded w-full"
                >
                    Generate Itinerary
                </button>
            </form>

            {/* Display Itinerary */}
            {itinerary && (
                <div className="mt-4 p-4 bg-gray-100 rounded shadow">
                    <h2 className="font-bold text-lg mb-2">Generated Itinerary:</h2>
                    <p>{itinerary}</p>
                </div>
            )}
        </div>
    );
}

export default Form;
