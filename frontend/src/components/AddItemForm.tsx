import React, { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import Button from "../assets/Button";
import { IoClose } from "react-icons/io5";
import axios from "../config/axiosConfig";
import { AxiosError } from "axios";
import Loader from "../assets/Loader";
import { MdError } from "react-icons/md";

interface ErrorResponse {
  success: boolean;
  message: string;
}

function AddItemForm({
  handleCloseAddItemForm,
  onFormSubmit,
}: {
  handleCloseAddItemForm: () => void;
  onFormSubmit: () => void;
}) {
  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(0);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [errors, setErrors] = useState({
    itemNameError: "",
    quantityError: "",
    priceError: "",
    descriptionError: "",
    categoryError: "",
  });
  const [commonError, setCommonError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // focus first input when the form open
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [nameInputRef.current]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;

    // validate inputs
    let hasError = false;
    const currentError = {
      itemNameError: "",
      quantityError: "",
      priceError: "",
      descriptionError: "",
      categoryError: "",
    };

    // validate item name
    if (!itemName.trim()) {
      currentError.itemNameError = "This field is required";
      hasError = true;
    } else if (itemName.length > 100) {
      currentError.itemNameError = "Item name must be less than 100 characters";
      hasError = true;
    }

    // validate quantity
    if (!quantity) {
      currentError.quantityError = "This field is required";
      hasError = true;
    } else if (quantity < 0) {
      currentError.quantityError = "Quantity cannot be nagative";
      hasError = true;
    } else if (!Number.isInteger(quantity)) {
      currentError.quantityError = "Quantity must be an integer.";
      hasError = true;
    } else if (quantity > 10000) {
      currentError.quantityError = "Quantity cannot exceed 10000";
      hasError = true;
    }

    // validate price
    if (!price) {
      currentError.priceError = "This field is required";
      hasError = true;
    } else if (price < 0) {
      currentError.priceError = "Price cannot be negative";
      hasError = true;
    } else if (price > 1000000) {
      currentError.priceError = "Price cannot exceed 1000000";
      hasError = true;
    }

    // validate description
    if (!description.trim()) {
      currentError.descriptionError = "This field is required";
      hasError = true;
    } else if (description.length > 500) {
      currentError.descriptionError =
        "Description must be less than 500 characters";
      hasError = true;
    }

    // validate category
    if (!category.trim()) {
      currentError.categoryError = "This field is required";
      hasError = true;
    } else if (category.length > 100) {
      currentError.categoryError = "Category must be less than 100 characters";
      hasError = true;
    }

    setErrors(currentError);

    if (hasError) {
      return;
    }

    setLoading(true);

    try {
      await axios.post("/items", {
        itemName,
        quantity,
        price,
        description,
        category,
      });
      onFormSubmit();
      handleCloseAddItemForm();
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const message = error.response?.data?.message || "Something went wrong";
      setCommonError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleCloseAddItemForm}
      className="fixed inset-0 p-3 flex justify-center items-center bg-black/20 z-50"
    >
      <form
        className="bg-bgLightGray sm:w-3/4 lg:w-1/2 rounded p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmitForm}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmitForm(e);
          }
        }}
      >
        <div className="flex justify-end">
          <button
            onClick={handleCloseAddItemForm}
            className="rounded-full bg-gray-200 hover:bg-gray-300 p-2"
          >
            <IoClose size={25} />
          </button>
        </div>

        <InputField
          label="Name"
          type="text"
          ref={nameInputRef}
          value={itemName}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setItemName(e.target.value)}
          placeholder="Enter item name"
          error={errors.itemNameError}
        />
        <div className="flex">
          <div className="flex-1 pr-1">
            <InputField
              label="Quantity"
              type="number"
              value={quantity || ""}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                const { value } = e.target;
                const inputNumber = Number(value);
                if (!isNaN(inputNumber)) {
                  setQuantity(inputNumber);
                }
              }}
              placeholder="Enter quantity"
              error={errors.quantityError}
            />
          </div>
          <div className="flex-1 p">
            <InputField
              label="Price"
              type="number"
              value={price || ""}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                const { value } = e.target;
                if (value === "") return setPrice(null);
                const inputNumber = Number(value);
                if (!isNaN(inputNumber)) {
                  setPrice(inputNumber);
                }
              }}
              placeholder="Enter price per item"
              error={errors.priceError}
            />
          </div>
        </div>
        <InputField
          label="Description"
          type="text"
          value={description}
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setDescription(e.target.value)}
          placeholder="Enter a brief description"
          textarea={true}
          error={errors.descriptionError}
        />
        <div>
          <InputField
            label="Category"
            type="text"
            value={category}
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setCategory(e.target.value)}
            placeholder="Enter category (e.g., electronics, groceries)"
            error={errors.categoryError}
          />
        </div>
        <br />
        {commonError && (
          <div className="flex items-center text-red-500">
            <MdError />
            <span>&nbsp;{commonError}</span>
          </div>
        )}
        <Button
          label={"Save"}
          disabled={loading === true}
          onClick={() => handleSubmitForm}
          loading={loading}
        ></Button>
        {loading && <Loader></Loader>}
      </form>
    </div>
  );
}

export default AddItemForm;
