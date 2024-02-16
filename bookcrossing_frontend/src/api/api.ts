import { BookDetailsProps } from "../types/types";

const ReserveBookAPI = async function (bookDetails: BookDetailsProps) {
  try {
    const response = await fetch("/api/reserve-book", {
      method: "POST",
      body: JSON.stringify(bookDetails),
    });

    if (response.ok) {
      console.log("Book reserved successfully!");
      return true;
    } else {
      console.error("Error reserving book:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error reserving book:", error);
    return false;
  }
};

// true if book is reserved
const CheckReservationAPI = async function (bookDetails: BookDetailsProps) {
  try {
    const response = await fetch("/api/check-reservation", {
      method: "POST",
      body: JSON.stringify({ bookId: bookDetails._id }),
    });

    if (!response.ok) {
      console.error("Error checking reservation:", response.statusText);
      throw new Error(`Error checking reservation: ${response.statusText}`);
    }

    const responseBody = await response.json();

    if (responseBody.reserved) {
      return true; // Book is reserved
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking reservation:", error);
    return error;
  }
};

export { ReserveBookAPI, CheckReservationAPI };
