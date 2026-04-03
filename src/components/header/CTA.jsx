import React from "react";
import CV from "../../assets/Ayan_Maiti_Overleaf_CV_v17.pdf";

const CTA = ({ onOpenMoonmind }) => {
  return (
    <div className="cta">
      <a href={CV} download className="btn">
        Download CV
      </a>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onOpenMoonmind}
      >
        Moonmind AI
      </button>
    </div>
  );
};

export default CTA;
