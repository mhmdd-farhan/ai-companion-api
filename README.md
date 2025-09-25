# AI Companion Backend

A smart AI chatbot backend that allows custom AI roles for each chat, providing highly specific interactions tailored to the persona. This is the backend/API service for the AI Companion frontend application.

## Features

- **User Authentication**: Automatic registration and login system - if a username is registered, it automatically logs in
- **Multi-Chat Support**: Each user can have multiple chat sessions
- **Custom Personas**: Each chat can have its own specific AI persona and personality
- **Security Features**:
  - CORS configuration
  - Rate limiting for chat and message endpoints
  - API key header authentication
- **Testing**: Comprehensive test suite using Jest to prevent bugs and errors
- **Scalable Architecture**: Built with modern backend best practices

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Hono.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL

## Integrated Frontend Application

[AI Companion Frontend](https://github.com/mhmdd-farhan/ai-companion-frontend)

## API Documentation

### Quick Reference

| URL                                        | Method | Headers                                        | Body                   |
| ------------------------------------------ | ------ | ---------------------------------------------- | ---------------------- |
| `http://<<local-endpoint>>/users`          | POST   | `x-api-key` & `Content-Type: application/json` | `{ "name": "string" }` |
| `http://<<local-endpoint>>/users`          | GET    | `x-api-key` & `Content-Type: application/json` | -                      |
| `http://<<local-endpoint>>/users/:user_id` | GET    | `x-api-key` & `Content-Type: application/json` | -                      |

### Complete API Documentation

For full API documentation including all endpoints, request/response examples, and error codes, please send an email to [fmuh8402@gmail.com](mailto:fmuh8402@gmail.com) to request an invitation to our Hoppscotch documentation workspace.

## How to Contribute

We welcome contributions! Please follow these steps to set up the development environment:

1. **Clone the repository**

   ```bash
   git clone https://github.com/mhmdd-farhan/ai-companion-api.git
   cd ai-companion-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Run tests**

   ```bash
   npm test
   ```

7. **Create a pull request**
   - Create a feature branch: `git checkout -b feature/your-feature-name`
   - Make your changes and commit them
   - Push to your fork and submit a PR

### Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npx prisma studio` - Open Prisma database GUI

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
