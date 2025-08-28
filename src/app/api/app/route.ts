// File: app/api/books/route.ts

import { NextResponse } from 'next/server'

// Fake in-memory storage for demo (replace with DB later)
let books: { id: number; title: string; author: string }[] = [
  { id: 1, title: "Next.js Guide", author: "Vercel" },
  { id: 2, title: "React Handbook", author: "Flavio" },
]

// Handle GET requests - return all books
export async function GET() {
  return NextResponse.json(books)
}

// Handle POST requests - create a new book
export async function POST(request: Request) {
  const body = await request.json()
  const newBook = {
    id: books.length + 1,
    title: body.title,
    author: body.author,
  }
  books.push(newBook)

  return NextResponse.json(
    { message: "Book created successfully", book: newBook },
    { status: 201 }
  )
}

// Handle PUT requests - update a book
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, title, author } = body

  const bookIndex = books.findIndex((b) => b.id === id)
  if (bookIndex === -1) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 })
  }

  books[bookIndex] = { id, title, author }
  return NextResponse.json({ message: "Book updated", book: books[bookIndex] })
}
