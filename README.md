<h1> <span style="color:blue">Strathmore Connects⚡⚡ </span></h1>


## 📋 Quick Summary

Strathmore Connects is a full-stack community platform that centralizes communication for Strathmore University clubs and societies. Built with React, Node.js/Express, and MongoDB, it provides role-based access control, post management, nested comments, and notifications. The platform features JWT authentication, Firebase image storage, and automated CI/CD pipelines that run unit tests and deploy to Netlify (frontend) and Render (backend) on every push.

**Live Site:** [strathmoreconnects.netlify.app](https://strathmoreconnects.netlify.app/)



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

## 🎯 Features

### Authentication & Authorization
- JWT-based secure authentication
- Password encryption using bcrypt
- Role-based access control (Student, Admin, Main Admin)
- Protected routes with middleware validation

### Community Management
- Create and delete communities
- Join/leave communities
- Browse all communities
- Admin-controlled community moderation

### Content & Engagement
- Create posts with image uploads (Firebase storage)
- Nested comments and replies
- Delete posts and comments with role validation
- Author-based content ownership

### Notifications
- Automated notifications when communities create posts
- User-specific notification feeds
- Notification management (mark read/delete)

### CI/CD Pipeline
- Automated testing on every push
- Unit tests for backend routes
- ESLint and Prettier checks
- Automatic deployment to Netlify (frontend) and Render (backend)
- GitHub Actions workflow integration

### User Experience
- Unified dashboard for all club activities
- Real-time-style updates
- Responsive design
- Centralized communication hub

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
