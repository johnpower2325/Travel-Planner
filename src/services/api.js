import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const fetchItinerary = async (inputs) => {
    try {
        debugger
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "gpt-4o-mini",
                prompt: `Create a travel itinerary for ${inputs.days} days in ${inputs.place} for ${inputs.persons} persons starting from ${inputs.date}. Include best hotels, restaurants, and activities.`,
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
        console.error("Error fetching itinerary:", error);
        return "Failed to generate itinerary. Please try again.";
    }
};

export default fetchItinerary;
