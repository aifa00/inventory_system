import { useEffect, useState } from "react";
import { ItemType } from "./Inventory";
import axios from "../config/axiosConfig";

interface ViewItemProps {
  itemId: string;
  handleCloseViewItem: () => void;
}

function ViewItem({ itemId, handleCloseViewItem }: ViewItemProps) {
  const [item, setItem] = useState<ItemType>();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(`/items/${itemId}`);
        setItem(data.item);
      } catch (error) {}
    };
    fetchItem();
  }, []);

  return (
    <div
      onClick={handleCloseViewItem}
      className="fixed inset-0 p-3 flex justify-center items-center bg-black/20 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bgLightGray w-96 rounded-lg p-8 border-2 border-primary"
      >
        <h1 className="font-bold text-3xl">{item?.itemName}</h1>
        <br />
        <p>
          <span className="text-textPrimary">Quantity: </span>
          <strong>{item?.quantity}</strong>
        </p>
        <p>
          <span className="text-textPrimary">Price: ₹ </span>
          <strong>{item?.price}</strong>
        </p>
        <br />
        <span className="text-textPrimary">Description: </span>
        <p>{item?.description}</p>
        <br />
        <p>
          <span className="text-textPrimary">Category: </span>
          <strong>{item?.category}</strong>
        </p>
      </div>
    </div>
  );
}

export default ViewItem;
