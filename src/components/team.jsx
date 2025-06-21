import { useState } from "react";
import { useTeams } from "../context/team-context";
import { Edit, Plus, Trash } from "lucide-react";
import Modal from "./modal";
import TeamForm from "./team-form";

export default function Team({ setSelectedTeamId, selectedTeamId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [teamToEdit, setTeamToEdit] = useState(null);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    const { teams, deleteTeam, createTeam, updateTeam } = useTeams();

    const handleDeleteClick = (e, team) => {
        e.stopPropagation();
        setTeamToDelete(team);
        setConfirmDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (teamToDelete) {
            deleteTeam(teamToDelete.team_id);
            setConfirmDeleteModalOpen(false);
            setTeamToDelete(null);
        }
    };

    return (
        <>
            {/* Create/Edit Modal */}
            {isOpen && (
                <div className="p-10">
                    <Modal
                        isOpen={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                            setTeamToEdit(null);
                        }}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {teamToEdit ? "Edit Team" : "Create New Team"}
                        </h2>
                        <TeamForm
                            defaultValues={teamToEdit || {}}
                            teams={teams}
                            setIsOpen={setIsOpen}
                            createTeam={createTeam}
                            updateTeam={updateTeam}
                        />
                    </Modal>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDeleteModalOpen && (
                <Modal
                    isOpen={confirmDeleteModalOpen}
                    onClose={() => setConfirmDeleteModalOpen(false)}
                >
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="mb-6">
                            Are you sure you want to delete team{" "}
                            <strong>{teamToDelete?.name}</strong>?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setConfirmDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={confirmDelete}
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Team List */}
            <div className="w-full h-[70vh] p-6 flex flex-col items-center bg-gray-50">
                <div className="w-full grow bg-white shadow rounded-lg overflow-hidden flex flex-col">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Teams</h1>

                        <button
                            onClick={() => {
                                setTeamToEdit(null);
                                setIsOpen(true);
                            }}
                            className="text-blue-500 font-semibold flex items-center gap-3"
                        >
                            Create New Team <Plus />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
                        <ul className="space-y-3">
                            {teams.length > 0 ? (
                                teams.map((team) => (
                                    <li
                                        onClick={() =>
                                            setSelectedTeamId(team.team_id)
                                        }
                                        key={team.team_id}
                                        className={`p-4 border border-gray-200 rounded hover:bg-gray-50 transition flex items-center justify-between ${
                                            selectedTeamId === team.team_id
                                                ? "bg-blue-100 border-blue-500"
                                                : "bg-white"
                                        }`}
                                    >
                                        <span>{team.name}</span>
                                        <span>{team.playerIds.length}</span>
                                        <span>{team.country}</span>
                                        <span>{team.region}</span>
                                        <div className="flex gap-2">
                                            <Trash
                                                onClick={(e) =>
                                                    handleDeleteClick(e, team)
                                                }
                                                className="text-red-500 cursor-pointer"
                                            />
                                            <Edit
                                                className="text-blue-500 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setTeamToEdit(team);
                                                    setIsOpen(true);
                                                }}
                                            />
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center p-48">
                                    No team found, please create a team.
                                </p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
