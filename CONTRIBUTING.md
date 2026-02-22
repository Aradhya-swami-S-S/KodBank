# Contributing to KodBank

Thank you for considering contributing to KodBank! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

1. **Clear title** - Describe the bug briefly
2. **Description** - Detailed explanation of the issue
3. **Steps to reproduce** - How to recreate the bug
4. **Expected behavior** - What should happen
5. **Actual behavior** - What actually happens
6. **Screenshots** - If applicable
7. **Environment** - OS, browser, Node version, etc.

### Suggesting Features

Feature requests are welcome! Please include:

1. **Use case** - Why is this feature needed?
2. **Description** - What should the feature do?
3. **Examples** - How would it work?
4. **Alternatives** - Other solutions you've considered

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## Development Setup

### Prerequisites
- Node.js v14+
- MySQL database
- Git

### Setup Steps

1. Clone your fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/kodbank.git
   cd kodbank
   ```

2. Install dependencies
   ```bash
   npm install
   cd frontend && npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. Run database migrations
   ```bash
   # Execute backend/schema.sql in your MySQL database
   ```

5. Start development servers
   ```bash
   # Terminal 1 - Backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm start
   ```

## Coding Standards

### JavaScript/React

- Use ES6+ syntax
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic

### CSS

- Use consistent naming conventions
- Group related styles together
- Use CSS variables for colors and common values
- Ensure responsive design

### Git Commits

Follow conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(chatbot): add quick questions toggle
fix(auth): resolve JWT expiry validation bug
docs(readme): update setup instructions
style(dashboard): improve glassmorphism effects
```

## Testing

Before submitting a PR:

1. Test all functionality manually
2. Check for console errors
3. Test on different screen sizes
4. Verify database operations
5. Test authentication flows

## Project Structure

```
kodbank/
├── backend/           # Express server
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   ├── db.js         # Database connection
│   └── server.js     # Server entry point
├── frontend/         # React application
│   └── src/
│       ├── pages/    # Page components
│       ├── components/ # Reusable components
│       └── context/  # React context
└── docs/            # Documentation
```

## Areas for Contribution

### High Priority
- [ ] Add unit tests
- [ ] Improve error handling
- [ ] Add input validation
- [ ] Enhance security features
- [ ] Mobile responsiveness improvements

### Features
- [ ] Transaction history functionality
- [ ] Money transfer between accounts
- [ ] Account settings page
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Password reset functionality

### UI/UX
- [ ] Loading states
- [ ] Error boundaries
- [ ] Accessibility improvements
- [ ] Animation enhancements
- [ ] Dark/Light theme toggle

### Documentation
- [ ] API documentation
- [ ] Component documentation
- [ ] Deployment guide
- [ ] Video tutorials

## Questions?

Feel free to:
- Open an issue for questions
- Start a discussion
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to KodBank! 🎉
