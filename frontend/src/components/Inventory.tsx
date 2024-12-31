import { useEffect, useState } from "react";
import Table from "./Table";
import { FaEdit } from "react-icons/fa";
import { FaArrowsToEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import axios from "../config/axiosConfig";
import Button from "../assets/Button";
import Pagination from "./Pagination";
import AddInventoryForm from "./AddItemForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DeleteDialog from "./DeleteDialog";
import EditItemForm from "./EditItemForm";
import { closeDialog, openDialog } from "../redux/dialogSlice";
import ViewItem from "./ViewItem";

export interface ItemType {
  _id: string;
  itemName: string;
  quantity: number;
  price: number;
  category: string;
  description?: string;
}

function Inventory() {
  const isDialogVisible = useSelector(
    (state: RootState) => state.dialog.isVisible
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [items, setItems] = useState<ItemType[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openAddItemForm, setOpenAddItemForm] = useState(false);
  const [itemIdToEdit, setItemIdToEdit] = useState<string>("");
  const [itemIdToView, setItemIdToView] = useState<string>("");
  const dispatch = useDispatch();

  // fetch list of items
  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get("/items", {
        params: {
          searchTerm,
          pageNo: currentPage,
        },
      });
      setItems(data.items);
      setTotalItemsCount(data.totalItemsCount);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenAddItemForm = () => {
    setOpenAddItemForm(true);
  };
  const handleCloseAddItemForm = () => {
    setOpenAddItemForm(false);
  };

  const handleSearch = () => {
    fetchItems();
  };

  const handleCloseEditItemForm = () => {
    setItemIdToEdit("");
  };
  const handlePageChange = (pageNo: number) => {
    setCurrentPage(pageNo);
  };

  const handleCloseViewItem = () => {
    setItemIdToView("");
  };

  // define actions to pass to the table component
  const actions = [
    {
      label: "View", // view button on table
      icon: <FaArrowsToEye />,
      color: "text-yellow-500",
      onclick: (itemId: string) => {
        setItemIdToView(itemId);
      },
    },
    {
      label: "Edit", // edit button on table
      icon: <FaEdit />,
      color: "text-blue-500",
      onclick: (itemId: string) => {
        setItemIdToEdit(itemId);
      },
    },
    {
      label: "Delete", // delete button on table
      icon: <MdDelete />,
      color: "text-red-500",
      onclick: (itemId: string) => {
        // open delete dialog
        dispatch(
          openDialog({
            message: "Delete this item?",
            // cancel delete
            onCancel: () => {
              dispatch(closeDialog());
            },
            // delete the item
            onSuccess: async () => {
              try {
                await axios.delete(`/items/${itemId}`);
                fetchItems();
                dispatch(closeDialog());
              } catch (error) {
                console.log(error);
              }
            },
          })
        );
      },
    },
  ];

  return (
    <div className="min-h-screen px-[10%] py-40">
      <h1 className="font-bold text-xl mb-5 inline-block">Inventories </h1>
      <span className="text-textSecondary">
        &nbsp;({totalItemsCount} items)
      </span>

      <div className="flex-column sm:flex items-center mb-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search for items..."
            className="shadow rounded text-textPrimary border-2 outline-tertiary p-2 w-full mb-3 sm:mb-0"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div className="flex-1 flex justify-end">
          <div className="w-full sm:w-40">
            <Button
              label={"Add Item+"}
              disabled={false}
              onClick={handleOpenAddItemForm}
            ></Button>
          </div>
        </div>
      </div>
      <Table
        headers={["Name", "Quantity", "Price(₹)", "Category", "Actions"]}
        datas={items}
        actions={actions}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {openAddItemForm && (
        <AddInventoryForm
          onFormSubmit={fetchItems}
          handleCloseAddItemForm={handleCloseAddItemForm}
        />
      )}
      {isDialogVisible && <DeleteDialog />}
      {itemIdToEdit && (
        <EditItemForm
          itemId={itemIdToEdit}
          setItems={setItems}
          handleCloseEditItemForm={handleCloseEditItemForm}
        />
      )}
      {itemIdToView && (
        <ViewItem
          handleCloseViewItem={handleCloseViewItem}
          itemId={itemIdToView}
        />
      )}
    </div>
  );
}

export default Inventory;
