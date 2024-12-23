

# **Job Finder Portal**

This project is a **Job Finder Portal** built using **React.js**, **Node.js (Express.js)**, and **MySQL**. It is designed to simplify job search and application processes
for candidates while providing an easy-to-use admin interface for managing job listings. Additionally, a **chatbot frontend** is integrated to assist users in exploring job opportunities and navigating the 
platform.

---

Features

### **1. Candidate Portal**
- **Job Search**: 
  - Search for jobs by title or location using a search bar.
  - View job details, including title, description, location, and salary.
- **Job Application**:
  - Apply for jobs with a simple form collecting the candidate's name and contact information.
  - Application data is submitted to the backend and stored in the database.
- **Dynamic Job Listings**: Automatically fetches and displays job listings from the backend.

### **2. Admin Panel**
- **Manage Job Listings**:
  - Add new job postings with fields like title, description, location, salary, and contact email.
  - Listings are stored in a MySQL database and reflected dynamically in the Candidate Portal.

### **3. Chatbot Frontend**
- A simple chatbot interface (frontend only) is integrated into the Candidate Portal.
- The chatbot provides an interactive user experience by guiding candidates through job searches and applications.

---

## **Tech Stack**

### **Frontend**:
- **React.js**: For building dynamic and responsive user interfaces.
- **CSS**: For styling components and ensuring a consistent design.

### **Backend**:
- **Node.js (Express.js)**: For RESTful API development.
- **MySQL**: For database storage and management of job listings and applications.

---

## **Functionalities**

### **Backend (Express.js)**:
1. **Job Listings API**:
   - `GET /api/jobs`: Fetch all job listings.
   - `POST /api/jobs`: Add a new job listing (Admin functionality).
2. **Application Submission API**:
   - `POST /api/applications`: Submit a job application with candidate details and the selected job.

### **Frontend (React.js)**:
1. **Candidate Portal**:
   - Fetches job data from the backend using Axios.
   - Displays job listings in a card format.
   - Provides a dynamic form for job applications.
2. **Chatbot Frontend**:
   - A visually appealing chatbot component guides users through job-related queries (frontend-only functionality).

### **Database (MySQL)**:
- **Jobs Table**:
  - Stores job postings with fields for title, description, location, salary, and contact email.
- **Applications Table**:
  - Tracks job applications with fields for job ID, candidate name, and contact details.

---

## **How to Run the Project**

### **Prerequisites**
- Node.js (version 18.x or above recommended)
- MySQL
- A package manager like npm or yarn

### **Steps**:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/job-finder-portal.git
   ```
2. Navigate to the project directory:
   ```bash
   cd job-finder-portal
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
4. Configure the MySQL database:
   - Create a database named `job_finder`.
   - Import the provided `schema.sql` file into the database to set up tables.
   - Update `db.js` in the backend `models` folder with your database credentials.
5. Start the backend server:
   ```bash
   cd server
   node server.js
   ```
6. Start the React frontend:
   ```bash
   cd client
   npm start
   ```

---

## **Project Highlights**
- **Dynamic Job Portal**: Candidates can browse and apply for jobs seamlessly, while admins can easily manage job postings.
- **Chatbot Frontend**: Adds an interactive element to assist users in navigating the platform.
- **Clean and Modular Code**: The project follows clean coding principles with reusable components and RESTful APIs.
- **Responsive Design**: Ensures a smooth user experience across devices.

---

## **Future Enhancements**
- Implement backend functionality for the chatbot using OpenAI's API for job suggestions and guidance.
- Add authentication and role-based access for candidates and admins.
- Enhance the filtering options for job searches.

---

