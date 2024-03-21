import { BookDetailsProps } from "../types/types";

import db from './db'
import Book from '../types/model'

const reserveBookAPI = async function (userId: string, bookId: string) {
  try {
    const book = await Book.findById(bookId);

    if (!book) {
      console.error('Book not found');
      return;
    }
    if (!book.reservations) {
      book.reservations = [];
    }

    // Add the user ID to the reservations array
    book.reservations.push(userId);

    // Save the updated book document
    await book.save();

    console.log('Reservation successful');
    return true
  } catch (error) {
    console.error('Error reserving book:', error);
    return false
  }
  //   const response = await fetch("/api/reserve-book", {
  //     method: "POST",
  //     body: JSON.stringify(bookDetails),
  //   });

  //   if (response.ok) {
  //     console.log("Book reserved successfully!");
  //     return true;
  //   } else {
  //     console.error("Error reserving book:", response.statusText);
  //     return false;
  //   }
  // } catch (error) {
  //   console.error("Error reserving book:", error);
  //   return false;
  }
};

// true if book is reserved
const checkReservationAPI = async function (bookDetails: BookDetailsProps) {
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

export { reserveBookAPI, checkReservationAPI };
