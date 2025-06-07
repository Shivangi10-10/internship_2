# Micro Learning
Micro Learning is a LinkedIn-inspired platform for bite-sized skill tutorials. Learn in-demand skills in just 2 minutes, boost your freelance career, and share your knowledge with others.

## 🚀 Features
- *Quick Learning*: Master new skills in just 2 minutes per video
- *Category-Based Organization*: Browse skills by programming, video editing, cooking, design, and more
- *AI-Powered Recommendations*: Get personalized content suggestions based on your interests
- *Multilingual Support*: Access content in 50+ languages with AI translation
- *Creator Platform*: Share your expertise by uploading your own micro-tutorials
- *Progress Tracking*: Track your learning journey across different skill categories
- *Responsive Design*: Seamless experience across desktop, tablet, and mobile devices
## 📋 Tech Stack
- *Frontend*: React, TypeScript, Tailwind CSS, shadcn/UI
- *Backend*: Node.js, Express
- *State Management*: TanStack Query (React Query)
- *Routing*: wouter
- *Animation*: Framer Motion
- *AI Integration*: OpenAI API (GPT-4o)
- *Storage*: In-memory with option to expand to PostgreSQL
## 📦 Installation
1. *Clone the repository*
```bash
git clone https://github.com/yourusername/micro-learning.git
cd micro-learning
Install dependencies
npm install
Set up environment variables
Create a .env file in the project root and add:

OPENAI_API_KEY=your_openai_api_key
Installing dotenv for environment variables
npm install dotenv
Update server code to use dotenv
Add the following at the top of server/index.ts:

import 'dotenv/config';
🚀 Running the App
Development Mode
For Windows:

# Using cross-env (recommended)
npm install --save-dev cross-env
Update your package.json scripts:

"scripts": {
  "dev": "cross-env NODE_ENV=development tsx server/index.ts"
}
Then run:

npm run dev
Or:

# Directly setting environment variables
set NODE_ENV=development
npx tsx server/index.ts
For macOS/Linux:

npm run dev
Production Mode
npm run build
npm start
🛣 Project Structure
micro-learning/
├── client/                  # Frontend code
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── layout/      # Layout components (header, footer)
│   │   │   ├── sections/    # Page sections
│   │   │   ├── skills/      # Skill-related components
│   │   │   ├── ui/          # UI components
│   │   │   └── upload/      # Upload-related components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   └── App.tsx          # Main App component
├── server/                  # Backend code
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Data storage logic
│   └── index.ts             # Server entry point
└── shared/                  # Shared code
    └── schema.ts            # Data models and validation
🔌 API Endpoints
User Management
POST /api/users: Create a new user
GET /api/users/:id: Get user details
Skills
GET /api/skills: List all skills (with optional filters)
GET /api/skills/featured: Get featured skill
GET /api/skills/:id: Get skill details
POST /api/skills: Create a new skill
Categories
GET /api/categories: List all categories
GET /api/categories/:id: Get category details
AI Features
POST /api/translate: Translate text to different languages
POST /api/recommend: Get personalized skill recommendations
User Progress
GET /api/users/:userId/progress: Get user's learning progress
POST /api/progress: Update user's progress
Saved Skills
GET /api/users/:userId/saved-skills: Get user's saved skills
POST /api/saved-skills: Save a skill
DELETE /api/users/:userId/saved-skills/:skillId: Unsave a skill
🧠 AI Features
Multilingual Support
Automatic translation of content into 50+ languages
Powered by OpenAI's GPT-4o model
Client-side caching for performance
Smart Recommendations
AI-driven skill suggestions based on:
Previously watched content
Expressed interests
Learning goals
JSON-formatted structured recommendations
🛠 Extending the Project
Adding a Database

