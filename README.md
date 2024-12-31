## 1. Project Overview

The Inventory Management System is a full-stack web application that helps users manage their inventory efficiently. The system allows users to perform essential CRUD (Create, Read, Update, Delete) operations on inventory items through an intuitive and responsive user interface. Built using **React.js** for the frontend and **Node.js** with **Express** for the backend, the application stores inventory data in a **MongoDB** database.

---

## 2. Project Setup Instructions

To run this project locally, you need to set up both the **backend** and **frontend** components. The file structure of the project is as follows:

backend/
frontend/

### Clone the Repository

1. Clone the repository to your local machine
   ```bash
   git clone <repository-url>

   ```
2. Navigate into the project folder:
   ```bash
   cd <project-folder>
   ```

#### Backend Setup

1. Navigate to the **backend** directory:

   ```bash
   cd backend

   ```

2. Install the necessary dependencies:

   ```bash
   npm install

   ```

3. Create a .env file in the backend directory with the following environment variables:
   ```bash
   PORT=4000
   CLIENT_URL=http://localhost:3000
   MONGODB_URL=<your-mongodb-connection-url>
   JWT_SECRET=<your-secret-key>

   ```
4. Start the back end server:
   ```bash
   npm run build
   npm start
   ```

The backend server will run on http://localhost:4000.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend

   ```

2. Install the necessary dependencies:

   ```bash
   npm install

   ```

3. Create a .env file in the frontend directory with the following environment variable:

   ```bash
   REACT_APP_BASE_URL=http://localhost:4000

   ```

4. Start the frontend server:
   ```bash
   npm start
   ```

The frontend application will run on http://localhost:3000.

---

## 3. Overview of the System Architecture and How the Components Interact

The Inventory Management System is designed using a **full-stack architecture** with the following components:

### 1. Backend (Node.js with Express)

The backend is built with **Node.js** and **Express** following the **MVC (Model-View-Controller)** architecture. This design pattern separates the logic into three parts:

- **Model**: Defines the data structure and handles interactions with the database. In this case, the data models represent inventory items and user authentication details.
- **View**: While the view in MVC typically refers to the UI, in this case, it is managed by the frontend React application. The backend sends responses in JSON format, which the frontend uses to render the UI.
- **Controller**: Contains the logic for handling requests and interacting with the model. Controllers handle CRUD operations for managing inventory items and user authentication.

The backend is responsible for:

- Serving the RESTful API endpoints for managing inventory.
- Validating incoming requests, handling errors, and interacting with the database.
- Managing user authentication using JWT (JSON Web Tokens) for secure API access.

The backend communicates with a **MongoDB** database, where inventory data is stored and managed.

### 2. Frontend (React.js)

The frontend is built using **React.js**, which provides a responsive and dynamic user interface. The application uses **state management** to handle inventory data and UI changes, making use of React's built-in state management and Redux.js toolkit for managing global state.

Key frontend features include:

- A form for adding and editing inventory items.
- A list view to display all inventory items with options to update, view, or delete each item.
- Input validation to ensure correct data is submitted.
- Axios is used for making HTTP requests to the backend to interact with the inventory data.

### 3. Database (MongoDB)

The system uses **MongoDB** for storing inventory items. Each item is represented as a document in the database with fields such as:

- **itemName**: Name of the inventory item.
- **quantity**: The quantity of the item in stock.
- **price**: The price of the item.
- **description**: Optional description of the item.
- **category**: Category the item belongs to (e.g., electronics, furniture, etc.).

The database allows CRUD operations through the API, enabling seamless retrieval, updating, and deletion of inventory data.

### 4. How the Components Interact

- When a user interacts with the frontend (e.g., adding a new inventory item), the frontend sends an HTTP request (usually POST) to the backend API.
- The backend receives the request, processes it, interacts with the database, and returns the appropriate response to the frontend.
- The frontend then updates the UI based on the response received, such as displaying a new item or updating the item list.
- For actions like updating or deleting items, the frontend sends the corresponding PUT or DELETE requests to the backend, and the backend handles the database updates.

This architecture allows for a clean separation of concerns, ensuring maintainability and scalability of the application.

---

## 4. Instructions for Using the Inventory Management System

### 1. Register and Login

- When you first visit the application, you'll be prompted to register or log in.
- **Registration**: Provide a valid email and password to create an account.
- **Login**: Use the registered credentials to log in and access the system.
- Upon successful login, you'll be redirected to the inventory page.

### 2. Inventory Management

Once logged in, you will be directed to the **Inventory Page**, where you can view, add, update, or delete inventory items.

- **Viewing Items**: The inventory list is displayed, showing all the items in the database along with their details such as item name, quantity, price, and category.
- **Add Item**: Click the **Add Item** button to open a form where you can add a new item to the inventory. You need to enter the item’s name, quantity, price, description, and category.
- **Edit Item**: Click the **Edit** button next to any item in the list to update its details. Modify the fields as needed and save the changes.
- **Delete Item**: Click the **Delete** button next to any item to remove it from the inventory.

The UI provides intuitive buttons for each action, and the page updates dynamically as you perform any action (add, update, or delete) on the inventory.

The system ensures all CRUD operations are seamless and secure, with data validation on the frontend and backend.
