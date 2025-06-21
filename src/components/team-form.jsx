import { useForm } from "react-hook-form";

function TeamForm({
    teams,
    defaultValues = {},
    setIsOpen,
    createTeam,
    updateTeam,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
    });

    const validateUniqueName = (value) => {
        if (defaultValues.name === value) return true;

        return (
            !teams.some(
                (team) => team.name.toLowerCase() === value.toLowerCase()
            ) || "Team name must be unique"
        );
    };

    const onSubmit = (data) => {
        const team = {
            ...data,
            playerIds: defaultValues.playerIds || [],
            team_id: defaultValues.team_id || Date.now().toString(),
        };

        if (defaultValues.team_id) {
            // Editing
            updateTeam({ ...team });
        } else {
            createTeam(team);
        }

        setIsOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block font-semibold mb-1">Team Name</label>
                <input
                    {...register("name", {
                        required: "Team name is required",
                        validate: validateUniqueName,
                    })}
                    className={`w-full p-2 border rounded ${
                        errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter team name"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block font-semibold mb-1">Country</label>
                <input
                    {...register("country", {
                        required: "Country is required",
                    })}
                    className={`w-full p-2 border rounded ${
                        errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter country"
                />
                {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.country.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block font-semibold mb-1">Region</label>
                <input
                    {...register("region", { required: "Region is required" })}
                    className={`w-full p-2 border rounded ${
                        errors.region ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter region"
                />
                {errors.region && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.region.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end space-x-3 my-4">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Confirm
                </button>
            </div>
        </form>
    );
}

export default TeamForm;
