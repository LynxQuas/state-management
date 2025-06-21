import { createContext, useContext, useReducer, useEffect } from "react";

const TEAM_STORAGE_KEY = "teams";

const teamReducer = (state, action) => {
    let updatedTeams;

    switch (action.type) {
        case "create-team":
            updatedTeams = [...state, action.payload];
            localStorage.setItem(
                TEAM_STORAGE_KEY,
                JSON.stringify(updatedTeams)
            );
            return updatedTeams;

        case "update-team":
            updatedTeams = state.map((team) =>
                team.team_id === action.payload.team_id
                    ? { ...team, ...action.payload }
                    : team
            );
            localStorage.setItem(
                TEAM_STORAGE_KEY,
                JSON.stringify(updatedTeams)
            );
            return updatedTeams;

        case "delete-team":
            updatedTeams = state.filter(
                (team) => team.team_id !== action.payload.id
            );
            localStorage.setItem(
                TEAM_STORAGE_KEY,
                JSON.stringify(updatedTeams)
            );
            return updatedTeams;

        case "add-player": {
            const { teamId, playerId } = action.payload;

            const isAlreadyAssigned = state.some((team) =>
                (team.playerIds || []).includes(playerId)
            );
            if (isAlreadyAssigned) return state;

            updatedTeams = state.map((team) => {
                if (team.team_id === teamId) {
                    const updatedPlayerIds = [
                        ...(team.playerIds || []),
                        playerId,
                    ];
                    return {
                        ...team,
                        playerIds: updatedPlayerIds,
                    };
                }
                return team;
            });
            break;
        }

        case "remove-player": {
            const { playerId } = action.payload;

            updatedTeams = state.map((team) => {
                if ((team.playerIds || []).includes(playerId)) {
                    return {
                        ...team,
                        playerIds: team.playerIds.filter(
                            (id) => id !== playerId
                        ),
                    };
                }
                return team;
            });
            break;
        }

        default:
            return state;
    }

    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(updatedTeams));
    return updatedTeams;
};

const TeamContext = createContext();

const loadTeamsFromStorage = () => {
    try {
        const saved = localStorage.getItem(TEAM_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const TeamProvider = ({ children }) => {
    const [teams, dispatch] = useReducer(teamReducer, [], loadTeamsFromStorage);

    useEffect(() => {
        localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teams));
    }, [teams]);

    const createTeam = (team) =>
        dispatch({ type: "create-team", payload: team });
    const updateTeam = (team) =>
        dispatch({ type: "update-team", payload: team });
    const deleteTeam = (teamId) =>
        dispatch({ type: "delete-team", payload: { id: teamId } });
    const addPlayerToTeam = (teamId, playerId) =>
        dispatch({ type: "add-player", payload: { teamId, playerId } });
    const removePlayerFromTeam = (playerId) =>
        dispatch({ type: "remove-player", payload: { playerId } });

    return (
        <TeamContext.Provider
            value={{
                teams,
                createTeam,
                updateTeam,
                deleteTeam,
                addPlayerToTeam,
                removePlayerFromTeam,
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};

export const useTeams = () => {
    const context = useContext(TeamContext);
    if (!context)
        throw new Error("useTeams must be used within a TeamProvider");
    return context;
};
