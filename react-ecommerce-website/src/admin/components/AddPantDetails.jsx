import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function AddPantDetails() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // You can do additional checks or validations here if needed
      console.log(file);
      setSelectedImage(file);
    }
  };

  async function handleClick(e) {
    e.preventDefault();
    console.log("hello");
    // parsing sizes
    const s = size.split(",");
    console.log(s);
    // parsing quantities
    const qty = quantity.split(",").map((item) => Number(item));
    console.log(qty);

    const data = {
      title,
      size: s,
      quantity: qty,
      color,
      price,
      selectedImage,
      category: "Pants",
    };
    const res = await axios.post(
      "http://localhost:5000/api/products/add-pant",
      data
    );

    setSize("");
    setQuantity("");
    setTitle("");
    setColor("");
    setSelectedImage(null);
    setPrice("");
  }
  // const
  return (
    <form className="d-flex flex-column gap-4 fade-in">
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        style={{ width: "100%" }}
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Color"
        variant="outlined"
        required
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Pant Size"
        variant="outlined"
        required
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Quantity"
        variant="outlined"
        required
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Price"
        variant="outlined"
        type="number"
        InputProps={{
          startAdornment: <div style={{ marginRight: "8px" }}>$</div>,
          inputProps: {
            step: 1, // Set the step for decimal places if needed
          },
        }}
        value={price === 0 ? null : price}
        required
        onChange={(e) => setPrice(e.target.value)}
      />

      <div>
        <div>
          <label htmlFor="imageInput">Select an image:</label>
        </div>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{
            width: "100%",
            height: "40px",
            marginBottom: "16px",
          }}
        />

        {selectedImage && (
          <div>
            <p>Selected Image:</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ width: "100%", maxHeight: "150px" }}
            />
          </div>
        )}
      </div>
      <button style={{ width: 300 }} className="m-1 bg-warning" type="submit">
        Add Pant
      </button>
    </form>
  );
}

export default AddPantDetails;
