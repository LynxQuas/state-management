import { useState } from "react";
import Player from "../components/players";
import Team from "../components/team";
import { useTeams } from "../context/team-context";

export default function MainPage() {
    const { addPlayerToTeam } = useTeams();
    const [selectedTeamId, setSelectedTeamId] = useState(null);

    const handlePlayerClick = (playerId) => {
        if (selectedTeamId) {
            addPlayerToTeam(selectedTeamId, playerId);
        } else {
            alert("Select a team first");
        }
    };

    return (
        <>
            <div className="w-full flex items-center p-10 flex-col md:flex-row">
                <Player handlePlayerClick={handlePlayerClick} />
                <Team
                    selectedTeamId={selectedTeamId}
                    setSelectedTeamId={setSelectedTeamId}
                />
            </div>
        </>
    );
}
