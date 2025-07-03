# Project Documentation

This document provides a comprehensive overview of the ML Roadmap project, including its architecture, feature plans, and enhancement history.

---

## 1. Website Architecture Plan

### 1.1. Objective

To transition the current static HTML/JavaScript application into a modern, scalable, and maintainable web application. This new architecture will provide a robust foundation for future enhancements, including user accounts, progress tracking, and an integrated development environment (IDE).

### 1.2. Technology Stack Selection

To achieve our objective, we will adopt a modern JavaScript framework.

-   **Frontend Framework: React**
    -   **Reasoning:** React is the industry standard for building dynamic user interfaces. Its component-based architecture is ideal for our application, allowing us to create reusable UI elements for problems, sessions, and weeks. The vast ecosystem of libraries and strong community support will accelerate development.
-   **Build Tool: Vite**
    -   **Reasoning:** Vite offers a significantly faster development experience compared to traditional bundlers like Webpack, with near-instant hot module replacement (HMR) and optimized build processes.
-   **Styling: Tailwind CSS**
    -   **Reasoning:** A utility-first CSS framework that allows for rapid UI development without writing custom CSS. It's highly customizable and encourages consistency.
-   **Routing: React Router**
    -   **Reasoning:** The de-facto standard for routing in React applications, enabling clean, declarative navigation between different views of the application.

### 1.3. Core Architectural Principles

The application will be built on the following principles, drawing inspiration from the article on [Website Architecture Best Practices](https://www.webfx.com/blog/web-design/website-architecture/).

1.  **Component-Based Architecture:** The UI will be decomposed into small, reusable components (e.g., `ProblemCard`, `WeekAccordion`, `SearchBar`, `NavBar`). This promotes separation of concerns and simplifies maintenance.
2.  **Clear URL Structure:** We will implement a clean and intuitive routing hierarchy that reflects the structure of the content.
    -   `domain.com/` - The main dashboard/overview page.
    -   `domain.com/week/:weekId` - A view dedicated to a specific week.
    -   `domain.com/problem/:problemId` - A detailed view for a single problem (future enhancement).
3.  **Centralized State Management:** For complex application state (like user progress, search filters, etc.), we will use a state management library like **Zustand** or **Redux Toolkit**. This provides a single source of truth and makes state changes predictable.
4.  **Data Abstraction:** Data fetching logic will be abstracted away from UI components using custom hooks (e.g., `useRoadmapData`). This will keep our components clean and focused on presentation.

### 1.4. Directory Structure

The project will follow a standard, feature-driven directory structure:

```
/src
|-- /assets           # Static assets like images, fonts
|-- /components       # Reusable UI components (e.g., Button, Modal)
|-- /features         # Feature-specific components and logic
|   |-- /roadmap      # Components related to the roadmap view
|   |-- /search       # Components for the search functionality
|-- /hooks            # Custom React hooks (e.g., useRoadmapData)
|-- /lib              # Utility functions, API clients
|-- /pages            # Top-level page components for routing
|-- /store            # State management store (Zustand/Redux)
|-- App.jsx           # Main application component
|-- main.jsx          # Application entry point
```

### 1.5. Implementation Phases

The migration will be executed in the following phases:

1.  **Phase 1: Project Scaffolding:**
    -   Initialize a new React project using Vite.
    -   Install and configure React Router, Tailwind CSS, and other core dependencies.
    -   Set up the directory structure.

2.  **Phase 2: Componentization:**
    -   Re-implement the existing UI elements from `index.html` as React components.
    -   Develop the core components: `NavBar`, `WeekAccordion`, `SessionCard`, `ProblemItem`, `SearchBar`.

3.  **Phase 3: Data & Logic Integration:**
    -   Implement the `useRoadmapData` hook to fetch and provide the `roadmap_data.json` to the application.
    -   Wire up the components with the data and implement the core application logic (e.g., expanding weeks, filtering problems).

4.  **Phase 4: Routing & Navigation:**
    -   Define the application routes using React Router.
    -   Implement navigation logic, such as the week jumper and direct links to sessions.

---

## 2. Advanced Platform Plan: Self-Sufficiency and Multi-User Functionality

### 2.1. Objective

To evolve the application from a single-user, static content viewer into a dynamic, multi-tenant platform that is self-sufficient for a user's learning journey. This plan outlines the features and technical considerations required to support user accounts, personalization, and in-browser coding capabilities.

### 2.2. Core Features

#### 2.2.1. User Authentication and Profiles
-   **Functionality:** Users must be able to sign up, log in, and manage a simple profile.
-   **Technical Solution:**
    -   **Service:** Implement **Firebase Authentication**.
    -   **Reasoning:** It provides a complete, easy-to-use authentication system with built-in support for email/password, social logins (Google, GitHub), and secure user management, significantly reducing development overhead.

#### 2.2.2. Personalized Progress Tracking
-   **Functionality:** The platform must save each user's progress, including which problems they have marked as "complete".
-   **Technical Solution:**
    -   **Service:** Use **Cloud Firestore** (part of Firebase).
    -   **Database Schema:** Create a `users` collection. Each user document will contain a `completedProblems` array storing the unique IDs of the problems they have solved.
    ```json
    /users/{userId}/
      - email: "user@example.com"
      - name: "User Name"
      - completedProblems: ["problem_id_1", "problem_id_2"]
    ```
    -   **Reasoning:** Firestore is a NoSQL, real-time database that integrates seamlessly with Firebase Authentication. It is highly scalable and perfect for storing user-specific data like this.

#### 2.2.3. In-Browser Note-Taking
-   **Functionality:** Allow users to write and save personal, markdown-enabled notes for each problem.
-   **Technical Solution:**
    -   **Database Schema:** Extend the Firestore schema. Create a `notes` sub-collection within each user's document.
    ```json
    /users/{userId}/notes/{problemId}
      - content: "This is my markdown-enabled note for this problem..."
      - lastUpdated: "2025-07-04T10:00:00Z"
    ```
    -   **Frontend:** Use a lightweight markdown editor component like **`react-markdown`** or **`react-simplemde-editor`**.
    -   **Reasoning:** This schema efficiently links notes to a specific user and problem, making it easy to query and display.

#### 2.2.4. Integrated Coding Environment (IDE)
-   **Functionality:** Provide a code editor next to each problem, allowing users to write and practice code directly in the browser.
-   **Technical Solution:**
    -   **Phase 1 (Simple Editor):**
        -   **Component:** Embed the **Monaco Editor** (the engine that powers VS Code). It offers syntax highlighting, autocompletion, and a familiar editing experience.
        -   **Execution:** Code will *not* be executed. This phase focuses on providing a high-quality editor for drafting solutions. The user's code for each problem can be saved to Firestore, similar to notes.
    -   **Phase 2 (Code Execution):**
        -   **Service:** Integrate with a secure code execution API like **Judge0** or **Piston**.
        -   **Process:** When a user clicks "Run", the code from the Monaco editor is sent to the execution API. The API compiles and runs the code against predefined test cases (which we would also need to store) and returns the output (stdout, stderr, errors).
    -   **Reasoning:** A phased approach de-risks the implementation. Starting with a non-executing editor provides immediate value, while deferring the complexity of secure code execution.

### 2.3. Backend Architecture

While Firebase handles authentication and the database, a lightweight backend will eventually be needed for custom logic.

-   **Technology:** **Node.js** with **Express.js** hosted on a serverless platform.
-   **Service:** **Firebase Cloud Functions** or a similar service (Vercel Serverless Functions, AWS Lambda).
-   **Purpose:**
    -   To interact with the code execution API (to protect API keys).
    -   To handle any custom business logic that doesn't fit in the frontend.
    -   To potentially serve the main `roadmap_data.json` from a secure endpoint.

### 2.4. Implementation Plan

1.  **Milestone 1: Authentication & User State:**
    -   Integrate Firebase Auth.
    -   Build login, signup, and profile pages in React.
    -   Set up the Firestore database and implement progress tracking.
2.  **Milestone 2: Note-Taking:**
    -   Integrate a markdown editor component.
    -   Implement the logic to save and retrieve notes from Firestore.
3.  **Milestone 3: Basic IDE:**
    -   Embed the Monaco Editor.
    -   Implement the logic to save code drafts to Firestore.
4.  **Milestone 4: Backend & Code Execution:**
    -   Set up a serverless backend.
    -   Integrate a code execution service.
    -   Implement the "Run Code" functionality.

---

## 3. Content Expansion Plan

### 3.1. Objective

The primary objective of this plan is to strategically expand the existing problem set of the ML Roadmap beyond the NeetCode 150 list. The goal is to incorporate a wider variety of problems from multiple platforms, providing users with a more comprehensive and diverse preparation experience for FAANG and other top-tier tech company interviews, specifically for roles at the intersection of Machine Learning and Software Engineering.

### 3.2. Problem Sources

While LeetCode is a primary source, we will expand to include problems from other reputable platforms to ensure diversity in problem style and focus. The target platforms are:

-   **HackerRank:** Known for its strong focus on domain-specific tracks, including Algorithms, Data Structures, and Mathematics.
-   **CodeSignal:** Often used for technical assessments and known for its real-world-style problems.
-   **TopCoder:** A classic platform with a rich history of competitive programming problems.
-   **GeeksforGeeks:** Provides a vast collection of interview questions categorized by company and topic.

### 3.3. Problem Inclusion Criteria

To maintain the high quality and relevance of the roadmap, every new problem must meet the following criteria:

1.  **ML/DS Relevance:** The problem must test a fundamental concept that is frequently applied in Machine Learning or Data Science.
2.  **Problem Quality:** The problem statement must be clear, unambiguous, and well-defined.
3.  **Educational Value:** The problem should have high educational value, with accessible high-quality solutions and discussions available.
4.  **No Duplication:** The problem should not be a trivial variation of an existing problem in the roadmap.

### 3.4. Data Structure for New Problems

All new problems will be added to the `app/roadmap_data.json` file, adhering to the existing JSON structure to ensure seamless integration. A new field, `source_platform`, will be added.

```json
{
  "name": "Problem Name",
  "difficulty": "Medium",
  "url_problem": "https://<platform>.com/problems/problem-name",
  "url_solution": "https://<platform>/solution-or-discussion-link",
  "source_platform": "HackerRank",
  "description_ml": "How this problem's concepts relate to Machine Learning.",
  "ai_coaching_prompt": "An AI prompt to guide the user."
}
```

### 3.5. Integration Process

1.  **Phase 1: Research & Curation:** Curate a list of 50-100 high-quality problems.
2.  **Phase 2: Data Formatting & Enrichment:** Convert the curated list into the specified JSON format.
3.  **Phase 3: Integration & Validation:** Merge the new problems into the main `app/roadmap_data.json` file.

---

## 4. User-Specific Functionality Plan

This section outlines a comprehensive plan to transform the static website into a fully personalized, user-centric platform.

### 4.1. Phase 1: User Management & Authentication (Weeks 1-2)
-   **Authentication System:** Firebase Authentication (Google OAuth, Email/Password, Social Logins).
-   **User Profile Management:** Personal info, learning preferences, skill assessment, target companies.
-   **Data Migration:** Automatic import of local storage progress to the cloud.

### 4.2. Phase 2: Personalization Engine (Weeks 3-4)
-   **Adaptive Learning Algorithm:** Skill assessment quiz, dynamic difficulty, personalized study paths.
-   **Smart Scheduling System:** Calendar integration (Google, Outlook), Pomodoro timer.

### 4.3. Phase 3: Advanced Analytics & Insights (Weeks 5-6)
-   **Performance Analytics Dashboard:** Detailed progress tracking, predictive analytics, peer comparisons.
-   **AI-Powered Coaching:** Intelligent feedback, real-time code review, adaptive AI prompts.

### 4.4. Phase 4: Customization & User Experience (Weeks 7-8)
-   **Interface Customization:** Multiple themes, customizable dashboard, mobile optimization.
-   **Content Customization:** Custom problem lists, note-taking system.

### 4.5. Phase 5: Collaboration & Community (Weeks 9-10)
-   **Study Groups & Partnerships:** Algorithm-based partner matching, group study features.
-   **Community Platform:** Discussion forums, mentorship program.

### 4.6. Phase 6: Interview Preparation Tools (Weeks 11-12)
-   **Mock Interview System:** AI-powered interview simulator, system design practice, behavioral prep.

### 4.7. Phase 7: Advanced Features & Integrations (Weeks 13-14)
-   **External Platform Integration:** LeetCode API integration, GitHub integration.
-   **Mobile Application:** React Native mobile app or a Progressive Web App (PWA).

### 4.8. Phase 8: Machine Learning & AI Enhancement (Weeks 15-16)
-   **Intelligent Recommendation Engine:** Problem recommendation ML model, study path optimization.

---

## 5. Enhancement and Documentation Summary

### 5.1. Core Enhancements Summary
-   **Comprehensive Problem Links:** All 194 problems now have direct links to LeetCode and NeetCode.
-   **Analytics Dashboard:** Interactive charts for progress visualization.
-   **Export/Import Functionality:** For progress backup and restoration.
-   **Study Calendar System:** Interactive monthly view of study sessions.
-   **Progressive Web App (PWA):** For a native app-like experience.
-   **Enhanced AI Integration:** Full-screen prompt modals and batch operations.
-   **Advanced Navigation & UI:** Tab system, progress rings, and interactive cards.
-   **Timer & Session Management:** Integrated Pomodoro timer.

### 5.2. Documentation Updates Summary
-   **Hyperlinked Problems:** All problem references are now clickable.
-   **Platform Integration:** Direct links to LeetCode, NeetCode, HackerRank, CodeForces, etc.
-   **Educational Resources:** Links to MIT OCW, Stanford CS161, and classic textbooks.
-   **Contest Platforms:** Schedules and links for major coding contests.
-   **New Reference Documents:** Created `PROBLEM_LINKS_REFERENCE.md` and this consolidated document.
-   **Improved File Organization:** Moved scripts and tests to dedicated directories.

This consolidated document provides a single source of truth for the project's planning, architecture, and features, ensuring alignment and a clear vision for future development. 