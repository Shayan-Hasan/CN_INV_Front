// import React from "react";

// const LoadingIndicator = () => {
//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <div className="spinner-border text-primary" role="status">
//         <span className="sr-only">Loading...</span>
//       </div>
//     </div>
//   );
// };

// export default LoadingIndicator;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingIndicator = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
    </div>
  );
};

export default LoadingIndicator;

// import React from "react";
// import { PacmanLoader } from "react-spinners";

// const LoadingIndicator = () => {
//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <PacmanLoader color="#36D7B7" size={50} />
//     </div>
//   );
// };

// export default LoadingIndicator;
