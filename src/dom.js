import { Task, Project, projects } from "./classes";

const projectsListElement = document.querySelector(".projects-list");
const tasksListElement = document.querySelector(".tasks-list");

// Projects

export function addNewProject() {
  const projectName = prompt("Enter Project Name: ");
  const newProject = new Project(projectName);

  projects.push(newProject);
  renderExistingProjects();
}

export function renderExistingProjects() {
  projectsListElement.innerHTML = "";

  if (projects.length !== 0) {
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
  addTaskButton.addEventListener("click", () => addNewtaskToProject(project));

  tasksListElement.appendChild(addTaskButton);
}

function showInputPrompts() {
  const taskTitle = prompt("Enter Task Title: ");
  const taskDescription = prompt("Enter Task Description: ");
  const taskDueDate = prompt("Enter Task due date: ");
  const taskPriority = prompt("Enter Task Priority(H/M/L): ");

  return { taskTitle, taskDescription, taskDueDate, taskPriority };
}

function addNewtaskToProject(project) {
  const { taskTitle, taskDescription, taskDueDate, taskPriority } =
    showInputPrompts();

  const newTask = new Task(
    taskTitle,
    taskDescription,
    taskDueDate,
    taskPriority
  );
  project.tasks.push(newTask);
  console.log(project.tasks);
  console.log("Above should work^");

  refreshAndRenderTasks(project);
}

function renderExistingTasks(project) {
  project.getTasks().forEach((task, index) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
          <h2>Title: ${task.title}</h2>
          <p>Description: ${task.description}</p>
          <p>Due Date: ${task.dueDate}</p>
          <p>ID: ${task.priority}</p>
          <button class="delete-task-btn">Delete</button>
        `;

    tasksListElement.appendChild(taskElement);

    //Delete Button for each task
    const deleteTaskBtn = taskElement.querySelector(".delete-task-btn");
    deleteTaskBtn.addEventListener("click", () => {
      deleteTask(project, index);
      refreshAndRenderTasks(project);
    });
  });
}

function deleteTask(project, index) {
  project.tasks.splice(index, 1);
}
