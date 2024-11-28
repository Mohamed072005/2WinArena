import { useState } from "react";

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
}

interface UpdateEventModalProps {
    event: Event;
    setEditingModal: (event: null) => void;
    handleUpdateEvent: (e: React.FormEvent<HTMLFormElement>, eventId: string) => void;
}

const UpdateEventModal: React.FC<UpdateEventModalProps> = ({ handleUpdateEvent, setEditingModal, event }) => {
    const [formData, setFormData] = useState({
        title: event.title,
        description: event.description,
        date: new Date(event.date).toISOString().split('T')[0], // Ensure date input has a valid format (YYYY-MM-DD)
        location: event.location,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white p-6 rounded-lg w-[500px]">
                <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                <form onSubmit={(e) => handleUpdateEvent(e, event._id)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Event title"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Event description"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="date" className="block text-sm font-medium">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="location" className="block text-sm font-medium">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Event location"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setEditingModal(null)}
                            className="px-4 py-2 bg-gray-200 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEventModal;
