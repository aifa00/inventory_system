import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function DeleteDialog() {
  const message = useSelector((state: RootState) => state.dialog.message);
  const onCancel = useSelector((state: RootState) => state.dialog.onCancel);
  const onSuccess = useSelector((state: RootState) => state.dialog.onSuccess);

  return (
    <div className="fixed inset-0 p-3 flex justify-center items-center bg-black/20 z-50">
      <div
        className="fixed flex items-center justify-center 
      p-3 top-0 left-0 right-0 bottom-0 bg-black/10 z-50"
      >
        <div className="w-96 p-5 bg-white rounded-lg shadow text-center">
          <h1 className="text-xl">{message}</h1> <br />
          <div className="flex">
            <button
              className="flex-1 p-2 rounded mx-2 hover:bg-gray-100"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-primary p-2 rounded mx-2 hover:bg-secondary"
              onClick={onSuccess}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialog;
