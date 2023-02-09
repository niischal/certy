import React from "react";

const Success = ({ success }) => {
  return (
    <div>
      <div className="alert alert-success text-center" role="alert">
        {success}
      </div>
    </div>
  );
};

export default Success;
