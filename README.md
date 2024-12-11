Travel Planner Project Documentation

Overview

Travel Planner is a ReactJS-based application that allows users to generate travel itineraries based on their selected destinations, number of days, start and end dates, and number of travelers. The application uses the OpenAI API to generate customized itineraries and is styled with Tailwind CSS.

Features

Place Selection: Dropdown with popular locations in New Zealand.

Dynamic End Date: Automatically calculates the end date based on the number of days and start date.

Form Validation: Validates user input with error alerts displayed as toast notifications.

Tailored Itineraries: Generates itineraries using the OpenAI API based on user inputs.

Modern Design: Styled with Tailwind CSS for a clean and responsive interface.

Tech Stack

Frontend: ReactJS

Styling: Tailwind CSS

Date Picker: react-datepicker

Toasts: react-toastify

Backend Integration: OpenAI API

Installation

Prerequisites

Node.js installed on your system

OpenAI API key

Steps

Clone the repository:

git clone https://github.com/your-repo-url/travel-planner.git
cd travel-planner

Install dependencies:

npm install

Set up the .env file: Create a .env file in the root directory with the following content:

REACT_APP_OPENAI_API_KEY=your_openai_api_key

Start the development server:

npm start

Project Structure

travel-planner/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Form.js
│   ├── App.js
│   ├── api.js
│   ├── index.js
│   ├── index.css
├── .env
├── tailwind.config.js
├── package.json
└── README.md

Component Breakdown

App.js

Entry point of the application.

Contains the main layout and renders the Form component.

Form.js

Handles user input through form fields.

Validates inputs and displays error messages using react-toastify.

Dynamically calculates the end date based on the start date and number of days.

Makes an API call to OpenAI to generate the itinerary.

api.js

Contains the function to make API requests to OpenAI.

Example function:

import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const fetchItinerary = async (inputs) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Generate a travel itinerary for ${inputs.days} days in ${inputs.place} for ${inputs.persons} persons starting from ${inputs.startDate}. Include best hotels, restaurants, and activities.`,
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    return 'Failed to generate itinerary. Please try again.';
  }
};

export default fetchItinerary;

Libraries Used

ReactJS: For building the frontend UI.

Tailwind CSS: For styling the application.

React Datepicker: For date selection.

React Toastify: For toast notifications.

Axios: For making HTTP requests to the OpenAI API.

Validation Rules

Place: Must be selected from the dropdown.

Number of Days: Must be a positive number.

Start Date: Must be today or a future date.

End Date: Automatically calculated based on start date and number of days.

Number of Persons: Must be a positive number.

Deployment

Build the application for production:

npm run build

Deploy the build/ folder to any hosting service like Netlify, Vercel, or AWS S3.

Future Enhancements

Dynamic dropdown for places fetched from an API.

Add support for multiple countries.

Include real-time hotel and activity recommendations.

Troubleshooting

404 Error on API Request:

Verify the OpenAI API key is correct and active.

Ensure the API endpoint (https://api.openai.com/v1/completions) is correct.

Styling Issues:

Ensure Tailwind CSS is properly configured in tailwind.config.js.

Datepicker Not Working:

Verify react-datepicker is installed and imported correctly.

Conclusion

The Travel Planner app provides users with a simple and intuitive interface to generate personalized travel itineraries. With clean design and dynamic functionality, it serves as a great starting point for further enhancements.

## Tech Stack

- **Frontend:** ReactJS, Tailwind CSS
- **Backend:** ASP.NET Core
- **Database:** SQL Server
- **APIs:** OpenAI
- **Version Control:** Git
