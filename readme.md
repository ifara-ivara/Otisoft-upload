# File Upload Service

A secure and efficient file upload service built with TypeScript, Express, and MongoDB. This service provides a token-based authentication system for file uploads and deletions, ensuring secure file management.

## Features

- 🔒 Secure file uploads with token-based authentication
- 📤 File upload with metadata storage
- 🔍 File retrieval and metadata access
- 🗑️ Secure file deletion with token validation
- ⏱️ Token expiration system
- 📝 Comprehensive logging
- 🛡️ Security best practices with Helmet
- ✅ Input validation with Zod
- 🧪 Test suite with Jest

## Tech Stack

- Node.js (v18+)
- TypeScript
- Express.js
- MongoDB with Mongoose
- Zod for validation
- Jest for testing
- Pino for logging
- Express FileUpload for file handling

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- pnpm (v9.14.2 or higher)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/upload-service
   BASE_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build the project
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm test-watch` - Run tests in watch mode
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## API Endpoints

### Token Management

- `POST /tokens/upload` - Generate an upload token
  - Response: `{ message: string, data: string }` (token)
- `POST /tokens/delete/:fileId` - Generate a delete token for a specific file
  - Response: `{ message: string, data: string }` (token)

### File Operations

- `POST /files/upload` - Upload a file
  - Headers: `x-token: <upload-token>`
  - Body: `file` (multipart/form-data)
  - Response: `{ message: string, data: FileMetadata }`

- `GET /files/:id` - Download a file
  - Response: File stream with appropriate content type

- `GET /files/:id/metadata` - Get file metadata
  - Response: `{ message: string, data: FileMetadata }`

- `DELETE /files/:id` - Delete a file
  - Headers: `x-token: <delete-token>`
  - Response: `{ message: string, data: boolean }`

## Security Features

- Token-based authentication for uploads and deletions
- Tokens expire after 1 hour
- One-time use tokens
- File-specific delete tokens
- Secure file storage with unique IDs
- Helmet for HTTP security headers

## Project Structure

```
src/
├── lib/           # Core utilities and configurations
├── middlewares/   # Express middlewares
├── res/          # Resources (routes, controllers, services)
│   ├── files/    # File management module
│   └── tokens/   # Token management module
└── index.ts      # Application entry point
```

## File Model

```typescript
interface File {
  userId?: Types.ObjectId;  // Optional user reference
  mimeType: string;        // File MIME type
  filename: string;        // Original filename
  size: number;           // File size in bytes
  url: string;            // Public URL for the file
  createdAt: Date;        // Upload timestamp
  updatedAt: Date;        // Last update timestamp
}
```

## Token Model

```typescript
interface Token {
  token: string;          // Unique token string
  type: "upload" | "delete"; // Token type
  fileId?: string;        // Required for delete tokens
  expiresAt: Date;        // Token expiration
  createdAt: Date;        // Token creation timestamp
}
```