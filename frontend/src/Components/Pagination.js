import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Pagination({ number }) {
  number = Number(number);
  const pre = number - 1;
  const next = number + 1;

  const preComponent =
    number > 0 ? (
      <Button aria-label="Search database" startIcon={<ArrowBackIosIcon />}>
        <Link to={`/browse-products/${pre}`} className="paginationLink">
          Prev
        </Link>
      </Button>
    ) : (
      <div></div>
    );

  const nextComponent =
    number >= 0 ? (
      <Button endIcon={<ArrowForwardIosIcon />}>
        <Link to={`/browse-products/${next}`} className="paginationLink">
          Next
        </Link>
      </Button>
    ) : (
      <div></div>
    );

  return (
    <div className="pagination">
      <span>{preComponent}</span>
      <span>{`${number + 1}`}</span>
      <span>{nextComponent}</span>
    </div>
  );
}

export default Pagination;
