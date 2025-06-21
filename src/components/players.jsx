import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PlayerCard from "./player-card";
import { fetchPlayers } from "../libs/api";
import { useTeams } from "../context/team-context";
import Modal from "./modal"; // Make sure you have a reusable Modal component

export default function Player({ handlePlayerClick }) {
    const { teams, removePlayerFromTeam } = useTeams();
    const [playerToRemove, setPlayerToRemove] = useState(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
        isError,
    } = useInfiniteQuery({
        queryKey: ["players"],
        queryFn: fetchPlayers,
        getNextPageParam: (lastPage) => lastPage?.meta?.next_cursor ?? false,
    });

    const handleRemoveConfirm = () => {
        if (playerToRemove) {
            removePlayerFromTeam(playerToRemove.id);
            setPlayerToRemove(null);
        }
    };

    if (isLoading)
        return (
            <div className="p-10 min-w-[30rem] h-[70vh] text-center">
                Loading...
            </div>
        );

    return (
        <div className="h-[70vh] p-6 flex flex-col items-center bg-gray-50">
            {/* Remove confirmation modal */}
            {playerToRemove && (
                <Modal isOpen={true} onClose={() => setPlayerToRemove(null)}>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Remove Player from Team
                        </h2>
                        <p className="mb-6">
                            Are you sure you want to remove{" "}
                            <strong>
                                {playerToRemove.first_name}{" "}
                                {playerToRemove.last_name}
                            </strong>{" "}
                            from their team?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setPlayerToRemove(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleRemoveConfirm}
                            >
                                Confirm Remove
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            <div className="w-[30rem] bg-white shadow rounded-lg overflow-hidden flex flex-col">
                <div className="p-4 border-b flex justify-between">
                    <h1 className="text-xl font-semibold">Players</h1>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
                    <ul className="space-y-3">
                        {data?.pages?.map((page) =>
                            page?.data?.map((player) => {
                                const assignedTeam = teams.find((team) =>
                                    (team.playerIds || []).includes(player.id)
                                );

                                return (
                                    <PlayerCard
                                        key={player.id}
                                        player={player}
                                        isAssigned={!!assignedTeam}
                                        teamName={assignedTeam?.name}
                                        onAdd={() =>
                                            handlePlayerClick(player.id)
                                        }
                                        onRemove={() =>
                                            setPlayerToRemove(player)
                                        }
                                    />
                                );
                            })
                        )}
                    </ul>
                </div>

                {hasNextPage && (
                    <div className="p-4 border-t text-center">
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {isFetchingNextPage ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}

                {isError && (
                    <div className="p-4 text-center text-red-500 border-t">
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
}
