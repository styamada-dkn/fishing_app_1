"use client";
import React from "react";

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <div className="bg-error border-error text-error mt-4 rounded shadow-md ">
      <h3>errorが発生しました</h3>
      <button
        onClick={() => reset()}
        className="mt-4 bg-neutral pd-4 rounded-sm hover:opacity-40 transition duration-100"
      >
        もう一度試す
      </button>
    </div>
  );
};

export default Error;
