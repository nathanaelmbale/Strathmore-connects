<h1> <span style="color:blue">Strathmore Connects⚡⚡ </span></h1>



Here is the link to the website
```
https://strathmoreconnects.netlify.app/
```

# Strathmore University Community Platform

A full-stack web platform designed to centralize communication for Strathmore University clubs and societies. It replaces scattered announcements across email, WhatsApp, Teams, and Slack with a single place for communities, posts, comments, membership, and notifications.

## 🔍 Problem

Students miss important updates, deadlines, and opportunities because communication is spread across multiple platforms. Email overload is common and students often ignore messages. There is no unified system for:

- Event announcements
- Club membership management
- Community interactions
- Centralized updates

This project solves the communication gap by giving students and club leaders a single structured platform.

## 🎯 Objectives

- Provide a unified dashboard for all clubs and societies
- Allow students to join, follow, and interact with communities
- Give admins tools to manage posts, comments, and membership
- Support secure authentication with proper access control
- Enable real-time-style updates through a notification system

## 🏗️ Features

### Authentication
- Signup and login
- JWT-based authentication
- Password encryption using bcrypt
- Role-based access control
- Protected routes using middleware

### User Roles
- **Student** — join communities, view posts, comment  
- **Admin** — manage communities, posts, and members  
- **Main Admin** — full platform control

### Communities
- Create community
- Delete community
- Join / unjoin functions
- View all communities
- Role-based admin actions

### Posts
- Create posts with images (Firebase storage)
- Delete posts
- View posts by community
- Author validation rules

### Comments
- Add comments
- Delete comments
- Nested replies
- Moderation tied to user roles

### Notifications
- Triggered when communities create posts
- User-specific notifications
- Delete notifications

## 🧰 Tech Stack

### Frontend
- React
- Context API for state management
- Firebase for image storage
- Fetch API for server communication

### Backend
- Node.js
- Express.js
- JWT for authentication
- bcrypt for hashing
- Middleware for protected routes

### Database
- MongoDB
- Mongoose ORM

### Tools
- Postman for API testing
- Git + GitHub
- VS Code
- Draw.io for diagrams

### Deployment
- Frontend: Netlify
- Backend: Render

## 🔐 API Structure (Simplified)

### `/user`
- `POST /signup`
- `POST /login`
- `GET /current` (Protected)

### `/community`
- `POST /create`
- `DELETE /:id`
- `GET /all`
- `POST /join/:id`
- `POST /leave/:id`

### `/post`
- `POST /create`
- `DELETE /:id`
- `GET /community/:id`

## 🧪 Testing

### API Testing
- Postman used for route responses
- JWT expiry tested
- Unauthorized route restrictions tested
- Error handling validated with try/catch

### Security Testing
- Password hashing verified
- JWT integrity tested
- Validation for missing fields
- Admins cannot delete content in other communities

### Frontend Testing
- Manual component testing
- State verification using Context API
- Form validation and image uploads tested

## 🧱 System Architecture

### Main Components
- Client (React)
- Server (Express)
- Database (MongoDB)
- Storage (Firebase)

### Flow
1. User interacts with React UI
2. Frontend sends requests to Express API
3. Middleware validates JWT tokens
4. MongoDB stores and returns structured data
5. Firebase stores static files
6. React renders updated state

## 🔄 CI/CD (In Progress)

GitHub Actions pipeline includes:
- Linting with ESLint
- Formatting with Prettier
- Install dependencies
- Build frontend
- Test backend routes
- Push to Netlify / Render

Planned:
- Backend unit tests
- E2E tests
- Docker support

## 🧗 Challenges
- Designing secure JWT authentication
- Handling Firebase uploads inside post creation
- Managing state across authentication, posts, communities, and comments
- Handling role-based permissions
- Debugging MongoDB validation errors
- Synchronizing frontend state after backend mutations

## 📚 What I Learned
- Full-stack web systems from architecture to deployment
- Real authentication patterns using JWT + bcrypt
- Building modular Express routes with middleware
- Structuring MongoDB schemas
- State management strategies in React
- Writing secure APIs
- Planning and diagramming systems (ERD, Use Cases, Sequence)
- Agile iteration and testing cycles

## 🚀 Future Improvements
- Rewrite frontend in Next.js
- Rewrite backend in Rust for speed and safety
- Add TypeScript for type safety
- Replace Firebase with unified backend storage
- Add real-time notifications (websockets)
- Implement automated testing
- Add Docker for local dev and deployment
- Improve UI/UX design

## 📦 Installation

Clone repo:

```bash
git clone https://github.com/yourusername/yourrepo.git
