import React, { useState } from 'react'
import BookDetails from './component/Bookdetails'

import { BookDetailsProps } from './types/types'


function App() {
  
  let tmpBooksProps : BookDetailsProps;

  tmpBooksProps = {
    _id: "001",
    name: "test book",
    author: "me",
    description: "nothing interesting",
    category: "fiction",
    publisher: "ABC",
    photoUrl: "/path/to/photo",
    year: 2025,
    isbn: 1234567890,
  }

  return (
    <div>
      <BookDetails
        key={tmpBooksProps._id}
        bookDetails={tmpBooksProps}
       />
    </div>
  )
}

export default App
