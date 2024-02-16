import React, { useState, useEffect } from "react";
import Tailwind from "tailwindcss";

import { ReserveBookAPI, CheckReservationAPI } from "../api/api";

import { BookDetailsProps } from "../types/types";

function BookDetails({ bookDetails }: { bookDetails: BookDetailsProps }) {
  const [isReserved, setIsReserved] = useState(false);

  const handleReserveBookClick = async function () {
    try {
      const response = await ReserveBookAPI(bookDetails);
      if (response) {
        setIsReserved(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkBookReservationStatus = async function () {
    try {
      const response = await CheckReservationAPI(bookDetails);
      if (response) {
        setIsReserved(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   useEffect(() => {
  //     checkBookReservationStatus();
  //   }, []);

  const [selectedTab, setSelectedTab] = useState("description");

  const handleTabChange = (newTab: string) => {
    setSelectedTab(newTab);
  };

  return (
    <div className="container mx-auto p-4 text-center sm:text-left">
      <h1 className="text-3xl font-bold mb-4">{bookDetails.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="h-full flex flex-col justify-between">
          {/* Top left box */}
          <div className="flex flex-col gap-2">
            <p className="mb-2 text-gray-700 font-bold">by {bookDetails.author}</p>
            <span className="text-gray-500">
              {bookDetails.publisher}, {String(bookDetails.year)}
            </span>
            <span className="inline-block mb-2 text-sm font-semibold uppercase tracking-wide bg-green-500 text-white rounded-md py-2 px-4">
              Category: {bookDetails.category}
            </span>
          </div>
          {/* Reserve button */}
          <button
            disabled={isReserved}
            onClick={handleReserveBookClick}
            className="disabled:opacity-50 bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800"
          >
            {isReserved ? "Reserved" : "Reserve Book"}
          </button>
        </div>
        {/* Top right box */}
        <div className="w-full">
          <img
            src={bookDetails.photoUrl}
            alt={bookDetails.name}
            className="w-full h-auto max-w-md mx-auto object-cover rounded-md"
          />
        </div>
      </div>
      <div className="mt-8">
        {/* Tabs */}
        <nav className="flex mb-4">
          <button
            type="button"
            className={`text-gray-500 py-2 px-4 rounded-t-md border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 ${
              selectedTab === "description"
                ? "text-blue-500 border-blue-500"
                : ""
            }`}
            onClick={() => handleTabChange("description")}
          >
            Description
          </button>
          <button
            type="button"
            className={`text-gray-500 py-2 px-4 rounded-t-md border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 ${
              selectedTab === "details" ? "text-blue-500 border-blue-500" : ""
            }`}
            onClick={() => handleTabChange("details")}
          >
            Details
          </button>
        </nav>
        {/* Tab content */}
        {selectedTab === "description" && (
          <p className="text-gray-700">{bookDetails.description}</p>
        )}
        {selectedTab === "details" && (
          <div>
            <p className="text-gray-500 mb-2">
              ISBN: {String(bookDetails.isbn)}
            </p>
            <p className="text-gray-500">Publisher: {bookDetails.publisher}</p>
            <p className="text-gray-500">Year: {String(bookDetails.year)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
