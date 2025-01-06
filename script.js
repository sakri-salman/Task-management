// document.addEventListener('DOMContentLoaded', () => {
//     function TaskManager() {
//         const LOCAL_STORAGE_KEY = 'formData';
//         const COMPLETED_TASKS_KEY = 'completedTasks';
//         let updateIndex = -1;
//         const form = document.getElementById('dataForm');
//         const dataDisplay = document.getElementById('dataDisplay');
//         const completedTasksDisplay = document.getElementById('completedTasksDisplay');
//         const submitButton = document.getElementById('formSubmitButton');
//         const cancelButton = createCancelButton();

//         // Load tasks from local storage
//         const existingData = loadFromLocalStorage(LOCAL_STORAGE_KEY) || [];
//         const completedTasks = loadFromLocalStorage(COMPLETED_TASKS_KEY) || [];

//         // Display tasks
//         displayValues();
//         displayCompletedTasks();

//         // Attach event listeners
//         form.addEventListener('submit', (event) => handleSubmit(event));

//         // Create a cancel button
//         function createCancelButton() {
//             const button = document.createElement('button');
//             button.textContent = 'Cancel';
//             button.type = 'button';
//             button.addEventListener('click', () => confirmCancelUpdate());
//             return button;
//         }

//         // Display tasks in progress
//         function displayValues() {
//             dataDisplay.innerHTML = existingData.map((item, index) => `
//                 <div class="data-entry">
//                     <p><strong>Task Name:</strong> ${item.TaskName}</p>
//                     <p><strong>Description:</strong> ${item.description}</p>
//                     <p><strong>Gender:</strong> ${item.gender}</p>
//                     <p><strong>Start Date:</strong> ${item.startDate}</p>
//                     <p><strong>End Date:</strong> ${item.endDate}</p>
//                     <button class="btn-update" data-index="${index}">Update</button>
//                     <button class="btn-delete" data-index="${index}">Delete</button>
//                     <button class="btn-complete" data-index="${index}">Mark as Completed</button>
//                 </div>
//             `).join('');
//             attachTaskEventListeners();
//         }

//         // Display completed tasks
//         function displayCompletedTasks() {
//             if (!completedTasksDisplay) {
//                 console.error('Missing element with ID "completedTasksDisplay". Please add it to your HTML.');
//                 return;
//             }
//             completedTasksDisplay.innerHTML = completedTasks.map(item => `
//                 <div class="completed-entry" style="background-color: green; padding: 10px; margin-bottom: 10px;">
//                     <p><strong>Task Name:</strong> ${item.TaskName}</p>
//                     <p><strong>Description:</strong> ${item.description}</p>
//                     <p><strong>Gender:</strong> ${item.gender}</p>
//                     <p><strong>Start Date:</strong> ${item.startDate}</p>
//                     <p><strong>End Date:</strong> ${item.endDate}</p>
//                 </div>
//             `).join('');
//         }

//         // Attach event listeners to task action buttons
//         function attachTaskEventListeners() {
//             document.querySelectorAll('.btn-update').forEach(button => {
//                 button.addEventListener('click', () => loadEntryForUpdate(button.dataset.index));
//             });

//             document.querySelectorAll('.btn-delete').forEach(button => {
//                 button.addEventListener('click', () => confirmAndDeleteEntry(button.dataset.index));
//             });

//             document.querySelectorAll('.btn-complete').forEach(button => {
//                 button.addEventListener('click', () => markTaskAsCompleted(button.dataset.index));
//             });
//         }

//         // Populate form with task data
//         function populateForm(data) {
//             document.getElementById('TaskName').value = data.TaskName;
//             document.getElementById('gender').value = data.gender;
//             document.getElementById('discription').value = data.description;
//             document.getElementById('startDate').value = data.startDate;
//             document.getElementById('endDate').value = data.endDate;
//         }

//         // Load task data for update
//         function loadEntryForUpdate(index) {
//             updateIndex = index;
//             const data = existingData[index];
//             populateForm(data);

//             submitButton.textContent = 'Save';
//             if (!form.contains(cancelButton)) form.appendChild(cancelButton);
//             form.scrollIntoView({ behavior: 'smooth' });
//         }

//         // Confirm cancellation of update
//         function confirmCancelUpdate() {
//             if (window.confirm('Are you sure you want to cancel the update?')) {
//                 resetForm();
//             }
//         }

//         // Delete a task
//         function confirmAndDeleteEntry(index) {
//             if (window.confirm('Are you sure you want to delete this task?')) {
//                 existingData.splice(index, 1);
//                 saveToLocalStorage(LOCAL_STORAGE_KEY, existingData);
//                 displayValues();
//                 alert('Task deleted successfully!');
//             }
//         }

//         // Mark a task as completed
//         function markTaskAsCompleted(index) {
//             if (window.confirm('Are you sure your Task is Completed ?')) {
//             const task = existingData.splice(index, 1)[0];
//             completedTasks.push(task);
//             saveToLocalStorage(LOCAL_STORAGE_KEY, existingData);
//             saveToLocalStorage(COMPLETED_TASKS_KEY, completedTasks);
//             displayValues();
//             displayCompletedTasks();
//             }
//         }

//         // Collect form data
//         function collectFormData() {
//             return {
//                 TaskName: document.getElementById('TaskName').value.trim(),
//                 gender: document.getElementById('gender').value.trim(),
//                 startDate: document.getElementById('startDate').value.trim(),
//                 endDate: document.getElementById('endDate').value.trim(),
//                 description: document.getElementById('discription').value.trim(),
//             };
//         }

//         // Validate form data
//         function validateForm() {
//             let isValid = true;
//             clearErrors();

//             const fields = [
//                 { id: 'TaskName', message: 'Task Name is required.' },
//                 { id: 'gender', message: 'Gender selection is required.' },
//                 { id: 'startDate', message: 'Start date is required.' },
//                 { id: 'endDate', message: 'End date is required.' },
//                 { id: 'discription', message: 'Description is required.' },
//             ];

//             fields.forEach(({ id, message }) => {
//                 const value = document.getElementById(id).value.trim();
//                 if (!value) {
//                     isValid = false;
//                     document.getElementById(`${id}Error`).textContent = message;
//                 }
//             });

//             const startDate = document.getElementById('startDate').value;
//             const endDate = document.getElementById('endDate').value;

//             if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
//                 isValid = false;
//                 document.getElementById('startDateError').textContent = 'Start Date cannot be later than End Date.';
//             }

//             return isValid;
//         }

//         // Clear form error messages
//         function clearErrors() {
//             document.querySelectorAll('.error').forEach(error => (error.textContent = ''));
//         }

//         // Reset the form
//         function resetForm() {
//             form.reset();
//             submitButton.textContent = 'Submit';
//             updateIndex = -1;
//             if (form.contains(cancelButton)) form.removeChild(cancelButton);
//         }

//         // Handle form submission
//         function handleSubmit(event) {
//             event.preventDefault();
//             if (!validateForm()) return;

//             const formData = collectFormData();
//             if (updateIndex === -1) {
//                 existingData.push(formData);
//                 saveToLocalStorage(LOCAL_STORAGE_KEY, existingData);
//                 alert('Are you sure you want add this task !');
//             } else if (window.confirm('Do you want to update this task?')) {
//                 existingData[updateIndex] = formData;
//                 saveToLocalStorage(LOCAL_STORAGE_KEY, existingData);
//                 alert('Task updated successfully!');
//                 resetForm();
//             }
//             displayValues();
//         }

//         // Save data to local storage
//         function saveToLocalStorage(key, data) {
//             localStorage.setItem(key, JSON.stringify(data));
//         }

//         // Load data from local storage
//         function loadFromLocalStorage(key) {
//             return JSON.parse(localStorage.getItem(key));
//         }
//     }

//     // Initialize TaskManager
//     TaskManager();
// });

// function Navbar(toggleButtonId, navbarId) {
//   const toggleButton = document.getElementById(toggleButtonId);
//   const navbar = document.getElementById(navbarId);

//   if (!toggleButton || !navbar) {
//     console.error("Navbar: Missing required elements.");
//     return;
//   }

//   function toggleNavbar(e) {
//     try {
//       navbar.classList.toggle("open");
//       e.stopPropagation();
//     } catch (error) {
//       console.error("Navbar: Error toggling navbar.", error);
//     }
//   }

//    function closeNavbar(e) {
//      if (navbar.classList.contains("open")) {
//        navbar.classList.remove("open");
//        console.log("Navbar closed");
//      }
//    }

//   toggleButton.addEventListener("click", toggleNavbar);
//   document.addEventListener("click", closeNavbar);

//   navbar.addEventListener("click", (e) => e.stopPropagation());
// }

//     Navbar("btn", "open-navbar");

// document.addEventListener('DOMContentLoaded', () => {

//     function Navbar(toggleButtonId, navbarId) {
//       const toggleButton = document.getElementById(toggleButtonId);
//       const navbar = document.getElementById(navbarId);

//       if (!toggleButton || !navbar) {
//         console.error("Navbar: Missing required elements.");
//         return;
//       }

//       // Function to toggle the navbar visibility
//       function toggleNavbar(e) {
//         e.stopPropagation(); // Prevent event propagation
//         navbar.classList.toggle("open");
//       }

//       // Function to close the navbar
//       function closeNavbar() {
//         if (navbar.classList.contains("open")) {
//           navbar.classList.remove("open");
//         }
//       }

//       // Add event listeners
//       toggleButton.addEventListener("click", toggleNavbar);
//       document.addEventListener("click", closeNavbar);

//       // Prevent clicks inside the navbar from closing it
//       navbar.addEventListener("click", (e) => e.stopPropagation());

//       // Close the navbar when clicking on a list item or link
//       navbar.querySelectorAll("li, a").forEach((item) => {
//         item.addEventListener("click", closeNavbar);
//       });
//     }

//     // Initialize the Navbar function
//     Navbar("btn", "open-navbar");

//     function TaskManager() {
//         const LOCAL_STORAGE_KEY = 'formData';
//         const COMPLETED_TASKS_KEY = 'completedTasks';
//         let updateIndex = -1;
//         const form = document.getElementById('dataForm');
//         const dataDisplay = document.getElementById('dataDisplay');
//         const completedTasksDisplay = document.getElementById('completedTasksDisplay');
//         const submitButton = document.getElementById('formSubmitButton');
//         const cancelButton = createCancelButton();

//         const existingData = loadFromLocalStorage(LOCAL_STORAGE_KEY) || [];
//         const completedTasks = loadFromLocalStorage(COMPLETED_TASKS_KEY) || [];

//         displayValues();
//         displayCompletedTasks();

//         form.addEventListener('submit', (event) => handleSubmit(event));

//         function createCancelButton() {
//             const button = document.createElement('button');
//             button.textContent = 'Cancel';
//             button.type = 'button';
//             button.addEventListener('click', () => confirmCancelUpdate());
//             return button;
//         }

//         function displayValues() {
//             dataDisplay.innerHTML = existingData.map((item, index) => `
//                 <div class="data-entry">
//                     <p><strong>Task Name:</strong> ${item.TaskName}</p>
//                     <p><strong>Description:</strong> ${item.description}</p>
//                     <p><strong>Gender:</strong> ${item.gender}</p>
//                     <p><strong>Start Date:</strong> ${item.startDate}</p>
//                     <p><strong>End Date:</strong> ${item.endDate}</p>
//                     <button class="btn-update" data-index="${index}">Update</button>
//                     <button class="btn-delete" data-index="${index}">Delete</button>
//                     <button class="btn-complete" data-index="${index}">Mark as Completed</button>
//                 </div>
//             `).join('');
//             attachTaskEventListeners();
//         }

//         function displayCompletedTasks() {
//             completedTasksDisplay.innerHTML = completedTasks.map(item => `
//                 <div class="completed-entry" style="background-color: green; padding: 10px; margin-bottom: 10px;">
//                     <p><strong>Task Name:</strong> ${item.TaskName}</p>
//                     <p><strong>Description:</strong> ${item.description}</p>
//                     <p><strong>Gender:</strong> ${item.gender}</p>
//                     <p><strong>Start Date:</strong> ${item.startDate}</p>
//                     <p><strong>End Date:</strong> ${item.endDate}</p>
//                 </div>
//             `).join('');
//         }

//         function attachTaskEventListeners() {
//             document.querySelectorAll('.btn-update').forEach(button => {
//                 button.addEventListener('click', () => loadEntryForUpdate(button.dataset.index));
//             });

//             document.querySelectorAll('.btn-delete').forEach(button => {
//                 button.addEventListener('click', () => confirmAndDeleteEntry(button.dataset.index));
//             });

//             document.querySelectorAll('.btn-complete').forEach(button => {
//                 button.addEventListener('click', () => markTaskAsCompleted(button.dataset.index));
//             });
//         }

//         function populateForm(data) {
//             document.getElementById('TaskName').value = data.TaskName;
//             document.getElementById('gender').value = data.gender;
//             document.getElementById('discription').value = data.description;
//             document.getElementById('startDate').value = data.startDate;
//             document.getElementById('endDate').value = data.endDate;
//         }

//         function loadEntryForUpdate(index) {
//             updateIndex = index;
//             const data = existingData[index];
//             populateForm(data);

//             submitButton.textContent = 'Save';
//             if (!form.contains(cancelButton)) form.appendChild(cancelButton);
//             form.scrollIntoView({ behavior: 'smooth' });
//         }

//         function confirmCancelUpdate() {
//             if (window.confirm('Are you sure you want to cancel the update?')) {
//                 resetForm();
//             }
//         }

//         function confirmAndDeleteEntry(index) {
//             if (window.confirm('Are you sure you want to delete this task?')) {
//                 existingData.splice(index, 1);
//                 saveToLocalStorage(LOCAL_STORAGE_KEY, existingData);
//                 displayValues();
//                 alert('Task deleted successfully!');
//             }
//         }

//         function markTaskAsCompleted(index) {
//             if (window.confirm('Are you sure your Task is Completed?')) {
//                 const task = existingData.splice(index, 1)[0];
//                 completedTasks.push(task);
//                 saveToLocalStorage(LOCAL_STORAGE_KEY, existingData);
//                 saveToLocalStorage(COMPLETED_TASKS_KEY, completedTasks);
//                 displayValues();
//                 displayCompletedTasks();
//             }
//         }

//         function collectFormData() {
//             return {
//                 TaskName: document.getElementById('TaskName').value.trim(),
//                 gender: document.getElementById('gender').value.trim(),
//                 startDate: document.getElementById('startDate').value.trim(),
//                 endDate: document.getElementById('endDate').value.trim(),
//                 description: document.getElementById('discription').value.trim(),
//             };
//         }

//         function validateForm() {
//             let isValid = true;
//             clearErrors();

//             const fields = [
//                 { id: 'TaskName', message: 'Task Name is required.' },
//                 { id: 'gender', message: 'Gender selection is required.' },
//                 { id: 'startDate', message: 'Start date is required.' },
//                 { id: 'endDate', message: 'End date is required.' },
//                 { id: 'discription', message: 'Description is required.' },
//             ];

//             fields.forEach(({ id, message }) => {
//                 const value = document.getElementById(id).value.trim();
//                 if (!value) {
//                     isValid = false;
//                     document.getElementById(`${id}Error`).textContent = message;
//                 }
//             });

//             const startDate = document.getElementById('startDate').value;
//             const endDate = document.getElementById('endDate').value;

//             if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
//                 isValid = false;
//                 document.getElementById('endDateError').textContent = 'End Date cannot be later than Start Date.';

//             }

//             return isValid   ;
//         }

//         function clearErrors() {
//             document.querySelectorAll('.error').forEach(error => (error.textContent = ''));
//         }

//         function resetForm() {
//             form.reset();
//             submitButton.textContent = 'Submit';
//             updateIndex = -1;
//             if (form.contains(cancelButton)) form.removeChild(cancelButton);
//         }

//         // Handle updating a task
//         function updateTask(index, formData) {
//             existingData[index] = formData;
//             saveToLocalStorage(LOCAL_STORAGE_KEY, existingData);
//             alert('Task updated successfully!');
//             resetForm();
//             displayValues();
//         }

//         function handleSubmit(event) {
//             event.preventDefault();
//             if (!validateForm()) return;

//             const formData = collectFormData();
//             if (updateIndex === -1) {
//                 existingData.push(formData);
//                 saveToLocalStorage(LOCAL_STORAGE_KEY, existingData);
//                 // alert('Task added successfully!');
//             } else {
//                 // Call the separate updateTask function for updates
//                 if (window.confirm('Do you want to update this task?')) {
//                     updateTask(updateIndex, formData);
//                 }
//             }
//             displayValues();
//         }

//         function saveToLocalStorage(key, data) {
//             localStorage.setItem(key, JSON.stringify(data));
//         }

//         function loadFromLocalStorage(key) {
//             return JSON.parse(localStorage.getItem(key));
//         }
//     }

//     TaskManager();
// });

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Navbar functionality
  function Navbar(toggleButtonId, navbarId) {
    const toggleButton = document.getElementById(toggleButtonId); // Retrieve the toggle button element
    const navbar = document.getElementById(navbarId); // Retrieve the navbar element

    if (!toggleButton || !navbar) {
      console.error("Navbar: Missing required elements."); // Log error if elements are missing
      return;
    }

    // Function to toggle the navbar visibility
    function toggleNavbar(e) {
      e.stopPropagation(); // Prevent event propagation to avoid unintended closures
      navbar.classList.toggle("open"); // Toggle the "open" class to show/hide the navbar
    }

    // Function to close the navbar
    function closeNavbar() {
      if (navbar.classList.contains("open")) {
        navbar.classList.remove("open"); // Remove "open" class to hide the navbar
      }
    }

    // Add event listeners for toggling and closing the navbar
    toggleButton.addEventListener("click", toggleNavbar);
    document.addEventListener("click", closeNavbar);

    // Prevent clicks inside the navbar from closing it
    navbar.addEventListener("click", (e) => e.stopPropagation());

    // Close the navbar when clicking on a list item or link
    navbar.querySelectorAll("li, a").forEach((item) => {
      item.addEventListener("click", closeNavbar);
    });
  }

  // Initialize the Navbar function
  Navbar("btn", "open-navbar");







  
  // Initialize Task Manager functionality
  function TaskManager() {
    const LOCAL_STORAGE_KEY = "formData"; // Key for storing task data in local storage
    const COMPLETED_TASKS_KEY = "completedTasks"; // Key for storing completed tasks
    let updateIndex = -1; // Index of the task being updated
    const form = document.getElementById("dataForm"); // Retrieve the form element
    const dataDisplay = document.getElementById("dataDisplay"); // Element to display tasks
    const completedTasksDisplay = document.getElementById(
      "completedTasksDisplay"
    ); // Element to display completed tasks
    const submitButton = document.getElementById("formSubmitButton"); // Form submit button
    const cancelButton = createCancelButton(); // Create cancel button for updates

    const existingData = loadFromLocalStorage(LOCAL_STORAGE_KEY) || []; // Load tasks from local storage
    const completedTasks = loadFromLocalStorage(COMPLETED_TASKS_KEY) || []; // Load completed tasks

    displayValues(); // Display existing tasks
    displayCompletedTasks(); // Display completed tasks




    form.addEventListener("submit", (event) => handleSubmit(event)); // Handle form submission






    // Function to create a cancel button for updates
    function createCancelButton() {
      const button = document.createElement("button"); // Create a button element
      button.textContent = "Cancel"; // Set button text
      button.type = "button"; // Set button type to "button" to avoid form submission
      button.addEventListener("click", () => confirmCancelUpdate()); // Add click listener for cancel
      return button; // Return the created button
    }

    // Function to display all tasks
    function displayValues() {
      dataDisplay.innerHTML = existingData
        .map(
          (item, index) => `
        <div class="data-entry">
          <p><strong>Task Name:</strong> ${item.TaskName}</p>
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Gender:</strong> ${item.gender}</p>
          <p><strong>Start Date:</strong> ${item.startDate}</p>
          <p><strong>End Date:</strong> ${item.endDate}</p>
          <button class="btn-update" data-index="${index}">Update</button>
          <button class="btn-delete" data-index="${index}">Delete</button>
          <button class="btn-complete" data-index="${index}">Mark as Completed</button>
        </div>
      `
        )
        .join(""); // Map tasks to HTML and join them as a string
      attachTaskEventListeners(); // Attach event listeners to buttons
    }

    // Function to display completed tasks
    function displayCompletedTasks() {
      completedTasksDisplay.innerHTML = completedTasks
        .map(
          (item) => `
        <div class="completed-entry" style="background-color: green; padding: 10px; margin-bottom: 10px;">
          <p><strong>Task Name:</strong> ${item.TaskName}</p>
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Gender:</strong> ${item.gender}</p>
          <p><strong>Start Date:</strong> ${item.startDate}</p>
          <p><strong>End Date:</strong> ${item.endDate}</p>
        </div>
      `
        )
        .join(""); // Map completed tasks to HTML and join them as a string
    }

    // Attach event listeners to task action buttons
    function attachTaskEventListeners() {
      document.querySelectorAll(".btn-update").forEach((button) => {
        button.addEventListener("click", () =>
          loadEntryForUpdate(button.dataset.index)
        ); // Load task for updating
      });

      document.querySelectorAll(".btn-delete").forEach((button) => {
        button.addEventListener("click", () =>
          confirmAndDeleteEntry(button.dataset.index)
        ); // Delete task
      });

      document.querySelectorAll(".btn-complete").forEach((button) => {
        button.addEventListener("click", () =>
          markTaskAsCompleted(button.dataset.index)
        ); // Mark task as completed
      });
    }

    // Populate the form with task data for editing
    function populateForm(data) {
      document.getElementById("TaskName").value = data.TaskName; // Set Task Name
      document.getElementById("gender").value = data.gender; // Set Gender
      document.getElementById("discription").value = data.description; // Set Description
      document.getElementById("startDate").value = data.startDate; // Set Start Date
      document.getElementById("endDate").value = data.endDate; // Set End Date
    }

    // Load a task into the form for updating
    function loadEntryForUpdate(index) {
      updateIndex = index; // Set update index
      const data = existingData[index]; // Retrieve task data by index
      populateForm(data); // Populate form with data

      submitButton.textContent = "Save"; // Change button text to "Save"
      if (!form.contains(cancelButton)) form.appendChild(cancelButton); // Add cancel button if not already present
      form.scrollIntoView({ behavior: "smooth" }); // Scroll to form
    }

    // Confirm cancellation of update
    function confirmCancelUpdate() {
      if (window.confirm("Are you sure you want to cancel the update?")) {
        // Confirm action
        resetForm(); // Reset form
      }
    }

    // Confirm and delete a task
    function confirmAndDeleteEntry(index) {
      if (window.confirm("Are you sure you want to delete this task?")) {
        // Confirm action
        existingData.splice(index, 1); // Remove task from array
        saveToLocalStorage(LOCAL_STORAGE_KEY, existingData); // Update local storage
        displayValues(); // Refresh task list
        alert("Task deleted successfully!"); // Notify user
      }
    }

    // Mark a task as completed
    function markTaskAsCompleted(index) {
      if (window.confirm("Are you sure your Task is Completed?")) {
        // Confirm action
        const task = existingData.splice(index, 1)[0]; // Remove task from array
        completedTasks.push(task); // Add task to completed list
        saveToLocalStorage(LOCAL_STORAGE_KEY, existingData); // Update local storage
        saveToLocalStorage(COMPLETED_TASKS_KEY, completedTasks); // Save completed tasks
        displayValues(); // Refresh task list
        displayCompletedTasks(); // Refresh completed task list
      }
    }

    // Collect form data into an object
    function collectFormData() {
      return {
        TaskName: document.getElementById("TaskName").value.trim(), // Trim whitespace for Task Name
        gender: document.getElementById("gender").value.trim(), // Trim whitespace for Gender
        startDate: document.getElementById("startDate").value.trim(), // Trim whitespace for Start Date
        endDate: document.getElementById("endDate").value.trim(), // Trim whitespace for End Date
        description: document.getElementById("discription").value.trim(), // Trim whitespace for Description
      };
    }

    // Validate form data before submission
    function validateForm() {
      let isValid = true; // Initialize validation status
      clearErrors(); // Clear previous error messages

      const fields = [
        { id: "TaskName", message: "Task Name is required." }, // Validate Task Name
        { id: "gender", message: "Gender selection is required." }, // Validate Gender
        { id: "startDate", message: "Start date is required." }, // Validate Start Date
        { id: "endDate", message: "End date is required." }, // Validate End Date
        { id: "discription", message: "Description is required." }, // Validate Description
      ];

      fields.forEach(({ id, message }) => {
        const value = document.getElementById(id).value.trim(); // Trim input value
        if (!value) {
          // Check for empty value
          isValid = false; // Mark as invalid
          document.getElementById(`${id}Error`).textContent = message; // Display error message
        }
      });

      const startDate = document.getElementById("startDate").value; // Retrieve Start Date
      const endDate = document.getElementById("endDate").value; // Retrieve End Date

      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        // Validate date range
        isValid = false; // Mark as invalid
        document.getElementById("endDateError").textContent =
          "End Date cannot be earlier than Start Date."; // Display error
      }

      return isValid; // Return validation status
    }

    // Clear all error messages
    function clearErrors() {
      document
        .querySelectorAll(".error")
        .forEach((error) => (error.textContent = "")); // Clear all error text
    }

    // Reset the form to its initial state
    function resetForm() {
      form.reset(); // Clear form inputs
      submitButton.textContent = "Submit"; // Reset button text
      updateIndex = -1; // Reset update index
      if (form.contains(cancelButton)) form.removeChild(cancelButton); // Remove cancel button
    }

    // Update an existing task
    function updateTask(index, formData) {
      existingData[index] = formData; // Update task in array
      saveToLocalStorage(LOCAL_STORAGE_KEY, existingData); // Save updated tasks
      alert("Task updated successfully!"); // Notify user
      resetForm(); // Reset form
      displayValues(); // Refresh task list
    }

    // Handle form submission
    function handleSubmit(event) {
      event.preventDefault(); // Prevent default form submission
      if (!validateForm()) return; // Validate form data

      const formData = collectFormData(); // Collect form data
      if (updateIndex === -1) {
        // Check if adding a new task
        existingData.push(formData); // Add new task
        saveToLocalStorage(LOCAL_STORAGE_KEY, existingData); // Save to local storagefff
        alert("Task added successfully!"); // Confirmation message for new tasksfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
      } else {
        // Updating an existing task
        if (window.confirm("Do you want to update this task?")) {
          // Confirm update
          updateTask(updateIndex, formData); // Update task
        }
      }
      displayValues(); // Refresh task list
    }

    // Save data to local storage
    function saveToLocalStorage(key, data) {
      try {
        localStorage.setItem(key, JSON.stringify(data)); // Save serialized data
      } catch (error) {
        console.error("Error saving to local storage:", error); // Log errors to console
      }
    }

    // Load data from local storage
    function loadFromLocalStorage(key) {
      try {
        return JSON.parse(localStorage.getItem(key)); // Parse stored data
      } catch (error) {
        console.error("Error loading from local storage:", error); // Log errors to console
        return null; // Return null on failure
      }
    }
  }

  TaskManager();
});
