const apiKey = import.meta.env.VITE_API_KEY;

import { BalldontlieAPI } from "@balldontlie/sdk";

const api = new BalldontlieAPI({ apiKey });

export const fetchPlayers = async ({ pageParam = 0 }) => {
    try {
        const response = await api.nba.getPlayers({
            cursor: pageParam,
            per_page: 10,
        });
        return response;
    } catch (e) {
        if (e?.response?.status === 429) {
            throw new Error("Rate limit exceeded. Please wait and try again.");
        }
        throw new Error("Failed to load players.");
    }
};
