import { NextResponse } from 'next/server'

// Define a type for a Book
type Book = {
  id: number
  title: string
  author: string
}

// Use const since books array is never reassigned
const books: Book[] = [
  { id: 1, title: "Next.js Guide", author: "Vercel" },
  { id: 2, title: "React Handbook", author: "Flavio" },
]

// GET: return all books
export async function GET() {
  return NextResponse.json(books)
}

// POST: create a new book
export async function POST(request: Request) {
  const body: { title: string; author: string } = await request.json()
  
  const newBook: Book = {
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

// PUT: update an existing book
export async function PUT(request: Request) {
  const body: { id: number; title: string; author: string } = await request.json()
  const { id, title, author } = body

  const bookIndex = books.findIndex((b) => b.id === id)
  if (bookIndex === -1) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 })
  }

  books[bookIndex] = { id, title, author }
  return NextResponse.json({ message: "Book updated", book: books[bookIndex] })
}
