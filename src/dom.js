import { Task, Project, projects } from "./classes";
import { format } from "date-fns";

//Local Storage code below

// Initialize Projects and Tasks
let savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

export function reconstructProjects() {
  // Retrieve projects from localStorage
  let savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

  if (savedProjects.length > 0) {
    savedProjects.forEach((projectData) => {
      const project = new Project(projectData.name); // Re-create the Project instance

      // Re-create Task objects and add them to the project
      projectData.tasks.forEach((taskData) => {
        const task = new Task(
          taskData.title,
          taskData.description,
          taskData.dueDate,
          taskData.priority
        );
        project.addTask(task); // Add each Task to the Project's task list
      });

      projects.push(project); // Push the reconstructed project to the global projects array
    });
  }

  console.log("Reconstructed Projects and Tasks: ", projects); // Check if reconstruction worked
  renderExistingProjects(); // Render the projects after reconstruction
}

function saveToLocalStorageData() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// End of Local Storage section - Fetch, Reconstruct, Save when needed

const projectsListElement = document.querySelector(".projects-list");
const tasksListElement = document.querySelector(".tasks-list");

const taskModal = document.querySelector("#taskModal");
const taskModalSubmit = document.querySelector("#taskModalSubmit");
const taskModalCancel = document.querySelector("#taskModalCancel");

let modalResolve;

// Projects
export function addNewProject() {
  const projectName = prompt("Enter Project Name: ");
  const newProject = new Project(projectName);

  projects.push(newProject);
  saveToLocalStorageData(); //LS SAVE
  renderExistingProjects();
}

export function renderExistingProjects() {
  projectsListElement.innerHTML = "";
  projects.forEach((project) => {
    const projectButton = document.createElement("button");
    projectButton.innerText = project.name;
    projectButton.className = "project-button";
    projectButton.addEventListener("click", () =>
      refreshAndRenderTasks(project)
    );
    projectsListElement.appendChild(projectButton);
  });
}

// Tasks
function refreshAndRenderTasks(project) {
  tasksListElement.innerHTML = "";
  renderAddTaskBtn(project);
  renderExistingTasks(project);
}

function renderAddTaskBtn(project) {
  const addTaskButton = document.createElement("button");
  addTaskButton.innerText = "+ Add Task";
  addTaskButton.className = "add-task-btn";
  addTaskButton.addEventListener("click", () => addNewTaskToProject(project));
  tasksListElement.appendChild(addTaskButton);
}

async function addNewTaskToProject(project) {
  const modalData = await showModalInputs();
  if (!modalData || !modalData.taskTitle) return; // Check for empty title

  const { taskTitle, taskDescription, taskDueDate, taskPriority } = modalData;

  const newTask = new Task(
    taskTitle,
    taskDescription,
    taskDueDate,
    taskPriority
  );
  project.tasks.push(newTask);
  saveToLocalStorageData(); // LS SAVE

  refreshAndRenderTasks(project);
}

function renderExistingTasks(project) {
  project.getTasks().forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
        <h2>${task.title}</h2>
        <p>Description: ${task.description}</p>
        <p>Due Date: ${task.dueDate}</p>
        <p>Priority: ${task.priority}</p>
        <button class="delete-task-btn">Delete</button>
      `;

    tasksListElement.appendChild(taskElement);

    // Delete Task functionality
    taskElement
      .querySelector(".delete-task-btn")
      .addEventListener("click", () => {
        deleteTask(project, index);
        refreshAndRenderTasks(project);
      });
  });
}

function deleteTask(project, index) {
  project.tasks.splice(index, 1);
  saveToLocalStorageData();
}

function showModalInputs() {
  const taskTitleInput = document.querySelector("#taskTitleInput");
  const taskDescriptionInput = document.querySelector("#taskDescriptionInput");
  const dueDateInput = document.querySelector("#dueDateInput");
  const prioritySelect = document.querySelector("#prioritySelect");

  const today = new Date();
  dueDateInput.setAttribute("min", format(today, "yyyy-MM-dd"));

  taskModal.style.display = "block";

  return new Promise((resolve) => {
    modalResolve = resolve;

    taskModalSubmit.onclick = () => {
      taskModal.style.display = "none";
      resolve({
        taskTitle: taskTitleInput.value,
        taskDescription: taskDescriptionInput.value,
        taskDueDate: dueDateInput.value,
        taskPriority: prioritySelect.value,
      });
    };

    taskModalCancel.onclick = () => {
      taskModal.style.display = "none";
      resolve(null);
    };
  });
}
