import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function VerifiedBadge() {
  return (
    <div className="my-badge">
      <FaCheckCircle style={{ marginRight: 5 }} />
      Certificate Verified!
    </div>
  );
}

export default VerifiedBadge;
