interface DeleteEventModalProps {
    eventId: string;
    handelDeleteEvent: (eventId: string) => void
    closeDeleteModal: () => void
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({ closeDeleteModal, eventId, handelDeleteEvent }) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50">
                <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg p-6 w-96">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Confirm Action</h2>
                    </div>
                    <p className="mt-2">Really you want to delete this event?</p>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={closeDeleteModal}
                            className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-gradient-to-r from-red-600 to-red-400 text-white px-4 py-2 rounded"
                            onClick={() => handelDeleteEvent(eventId)}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteEventModal;
