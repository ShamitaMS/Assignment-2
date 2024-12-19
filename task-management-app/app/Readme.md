Assignment 3:

Task Management App
3.1 Objective
This task management app is designed to provide users with an easy-to-use interface to manage tasks effectively. The app is divided into two main sections: All Tasks and Priority Section. The All Tasks section allows users to filter tasks based on their status, while the Priority Section helps in organizing tasks by their assigned priority level.

3.2 Technologies Used
1. Frontend
•	React: A popular JavaScript library for building user interfaces. It was used to create interactive UI components for the app, such as the task list, filters, and pop-up forms.
•	Next.js: A React framework used for server-side rendering and static site generation. It helps in creating a fast, SEO-friendly app, and also manages routing, making it easier to handle pages like the task list and pop-up form.
2. State Management
•	MobX: A state management library that helps in managing application state in a reactive and efficient way. It was used to store and update task data in the app, ensuring that the UI stays in sync with the state of tasks. MobX provides features such as observable data, actions for modifying state, and computed values for derived state, making it ideal for this app.
3. CSS Framework
•	Tailwind CSS: A utility-first CSS framework that allows for easy styling by applying utility classes directly in the HTML. Tailwind CSS was used to design a clean, responsive, and modern user interface. The app uses utility classes for layout (e.g., flex, gap-4, px-4), spacing, typography, and colors.
4. Pop-up Component
•	React Modal (or similar): A React component used to implement the pop-up form for adding a new task. It provides an easy way to display a modal window with a form, keeping the user experience smooth and efficient.
5. Other Tools
•	JavaScript (ES6+): Modern JavaScript features like arrow functions, template literals, destructuring, and async/await were used throughout the app to ensure clean and efficient code.
•	HTML5: For structuring the web page and ensuring semantic markup that is accessible and SEO-friendly.

3.3 Features
1. Welcome Message
•	At the top of the screen, users are greeted with a Welcome Message that provides a friendly introduction to the app, such as "Welcome to Your Task Management Dashboard."
2. All Tasks Section
•	Task Filters: Users can filter tasks by three categories:
o	All Tasks: Displays all tasks.
o	Completed: Displays only completed tasks.
o	In Progress: Displays tasks that are currently in progress.
•	Add Task Button: This button, located in the All Tasks section, opens a pop-up that allows users to add a new task. The task creation form includes:
o	Task Name: A text input field for the user to enter the task's name.
o	Task Description: A text area where the user can add a description for the task.
o	Due Date: A date picker for the user to select the task's due date.
o	Priority Dropdown: A dropdown menu to assign a priority level to the task, with options for:
	High
	Medium
	Low
•	Task Submission: Upon filling out the task details, users can submit the form to add the task to the list.
3. Priority Section
•	The Priority Section is displayed on the right side of the screen. It shows tasks organized by priority in descending order (High > Medium > Low).
•	Task Display: Each task is displayed with:
o	Task Name: The name of the task.
o	Priority Color Box: A colored box around the task's name that corresponds to the task's priority:
	Red for High priority.
	Yellow for Medium priority.
	Green for Low priority.
•	Priority Dropdown for Tasks: Each task in the Priority Section has a dropdown menu to change its priority. When the priority is changed, the task moves to the appropriate position in the list based on its new priority.
•	Task Ordering: When a task's priority is changed to High, it automatically moves to the top of the list. Similarly, tasks with Medium or Low priorities are arranged accordingly.
User Flow:
1.	Navigating to the App:
o	The user lands on the home screen, which displays the Welcome Message.
o	Below the welcome message is the All Tasks Section, where tasks can be filtered based on their status (All, Completed, In Progress).
2.	Adding a Task:
o	The user clicks on the Add Task button in the All Tasks Section.
o	A pop-up opens with a form to input the task's details: name, description, due date, and priority (using a dropdown menu for priority).
o	After submitting, the new task appears in the All Tasks section.
3.	Filtering Tasks:
o	The user can filter tasks in the All Tasks Section by selecting the desired status: All, Completed, or In Progress.
4.	Viewing Tasks by Priority:
o	The Priority Section on the right side of the screen automatically displays tasks sorted by their priority level.
o	Each task is shown with its name and a color-coded priority box. Users can change the priority of tasks using the dropdown menu. When the priority changes, the task is moved to its new correct position in the list.
5.	Task statistics:  Used to track the progress of the task completion



 
                                            
4.4 Conclusion
This task management app provides an efficient way to organize and manage tasks based on their priority and status. The combination of filters, task priority management, and a responsive interface ensures that users can easily track and update their tasks.


