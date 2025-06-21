import { Plus, Trash } from "lucide-react";

export default function PlayerCard({
    player,
    isAssigned,
    teamName,
    onAdd,
    onRemove,
}) {
    return (
        <li className="p-4 border border-gray-200 rounded hover:bg-gray-50 transition flex items-center justify-between">
            <div className="flex flex-col">
                <span className="font-medium">
                    {player.first_name} {player.last_name}
                </span>
                {teamName && (
                    <span className="text-sm text-gray-500">
                        Team: {teamName}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2">
                {isAssigned ? (
                    <Trash
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={onRemove}
                    />
                ) : (
                    <Plus
                        className="cursor-pointer text-green-500 hover:text-green-700"
                        onClick={onAdd}
                    />
                )}
            </div>
        </li>
    );
}
