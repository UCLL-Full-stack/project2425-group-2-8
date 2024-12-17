import React from "react";

const DeleteButton: React.FC = () => {
  const handleDelete = () => {
    console.log("e")
  };

  return (
    <button
    className="btn btn-primary"
      onClick={handleDelete}
    >
        Delete
    </button>
  );
};

export default DeleteButton;
