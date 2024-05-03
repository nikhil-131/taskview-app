# KanView - A Simple Kanban Board Application

## Table of contents

- [Overview](#overview)
- [Introduction](#introduction)
- [Design Approach](#design-approach)
    - [Component-Based Architecture](#component-based-architecture)
    - [Statement Management](#state-management)
    - [Local Storage](#local-storage)
    - [Drag & Drop](#drag--drop)
- [Component Design](#component-design)
    - [App Component](#app-component)
    - [NavBar Component](#navbar-component)
    - [Main Column](#main-column-component)
- [Conclusion](#conclusion)
- [Useful Resources](#useful-resources)
- [Feedback](#feedback)


## Overview

This documentation aims to provide insights into the design approach and choices made in the development of a KanView application using React.


## Introduction

KanView is a web application aimed at providing a simple and intuitive Kanban board interface for managing tasks. The application is built using:

- Semantic HTML5 Markup
- CSS Custom Properties
- Flexbox
- Grid
- Mobile-First Workflow
- [React](https://reactjs.org/) - JS library
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [Vite](https://vitejs.dev/) - Open-source JavaScript module bundler


## Design Approach

### Component-Based Architecture
The application follows a component-based architecture, leveraging React's declarative and reusable component model. Each UI element is encapsulated within a separate component, promoting modularity and maintainability.

### State Management
React's built-in state management hooks like **'useState'** and **'useEffect'** is utilized for managing component state. This approach simplifies state handling within individual components.

### Local Storage
The application employs local storage for persisting task data across browser sessions. This allows users to retain their task data even after refreshing the page or closing the browser.

### Drag & Drop
The implementation of drag and drop functionality for task cards within columns is achieved using the `react-dnd` library. This enhances user experience by enabling intuitive task management.


## Component Design

### App Component
- Acts as the main entry point for the application.
- Manages the overall layout structure by rendering the navigation bar ('NavBar') and main columns ('MainColumns').
- Utilizes React hooks like **'useState'** and **'useEffect'** for managing state and performing side effects, such as fetching data from local storage.

### NavBar Component
- Displays the application logo and provides functionality for adding new tasks.
- Handles input and submission for creating new tasks.

### Main Column Component
- Renders the columns and its data of the Kanban board.
- Implements drag and drop functionality for task cards using `react-dnd` library.
- Manages task data and handles actions like editing and deleting tasks within columns.


## Conclusion

The design approach and choices outlined in this documentation aim to provide a comprehensive understanding of the KanView application's architecture and implementation details. By leveraging React's component-based design and ecosystem, along with external libraries like `react-dnd`, the application achieves its objectives of providing a user-friendly interface for managing tasks effectively.

## Useful resources

- [Font Awesome](https://fontawesome.com/) - I found "Font Awesome" to be an excellent resource for accessing a diverse range of icons and logos in various styles, and I intend to utilize it frequently.
- [React DnD](https://react-dnd.github.io/react-dnd/about) - I've found the `React-DnD` library to be highly valuable for implementing drag and drop functionality in my project, providing a seamless and intuitive user experience.

## Feedback

I would greatly appreciate feedback on the KanView application. Your insights and suggestions would be invaluable for further enhancement.
