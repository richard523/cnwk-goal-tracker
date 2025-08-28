# Overview

This is a goal tracking application built with React, Express, and TypeScript. The app allows users to create, view, and manage goal entries for a coaching or mentoring system where "senseis" set goals for "ninjas" based on their current project status. The application features a clean UI built with shadcn/ui components and Tailwind CSS.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Vite**: Build tool and development server for fast development experience
- **shadcn/ui + Radix UI**: Comprehensive component library providing accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TanStack Query**: Data fetching and state management for server state
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Form handling with validation

## Backend Architecture
- **Express.js**: RESTful API server with TypeScript
- **Memory Storage**: In-memory data storage using Map data structure for goal entries
- **Zod**: Runtime type validation for API requests and responses
- **Session-based Architecture**: Simple stateless API design

## Database Design
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **Schema Definition**: Centralized schema in `shared/schema.ts` for type safety across frontend and backend
- **Goal Entries Table**: Core entity storing date, sensei name, ninja name, current project, and two goals

## API Structure
- **REST Endpoints**:
  - `GET /api/goal-entries`: Retrieve all goal entries
  - `POST /api/goal-entries`: Create new goal entry with validation
  - `DELETE /api/goal-entries/:id`: Delete specific goal entry
  - `DELETE /api/goal-entries`: Clear all goal entries
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Request Validation**: Zod schema validation for all incoming requests

## Key Features
- **Goal Entry Management**: Create, view, and delete goal entries
- **Project Status Mapping**: Predefined goal templates based on project completion status
- **Data Export**: CSV export functionality for goal entries
- **Responsive Design**: Mobile-first responsive UI
- **Real-time Updates**: Optimistic updates with TanStack Query

## Development Tools
- **TypeScript**: Full type safety across the entire stack
- **ESLint + Prettier**: Code quality and formatting
- **Hot Module Replacement**: Development experience with Vite
- **Path Aliases**: Clean import paths using TypeScript path mapping

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for Neon
- **drizzle-orm**: Type-safe database ORM
- **drizzle-kit**: Database migration and introspection tools

## UI and Styling
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

## State Management and Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers

## Development and Build Tools
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

## Utility Libraries
- **zod**: Runtime type validation
- **date-fns**: Date manipulation utilities
- **clsx**: Conditional className utility
- **nanoid**: Unique ID generation
- **wouter**: Lightweight routing library