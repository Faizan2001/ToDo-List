import "./styles.css";
import {reconstructProjects, addNewProject} from './dom';



const addProjectBtn = document.querySelector(".add-project-btn");
// const addTaskBtn = document.querySelector(".add-task-btn");

document.addEventListener("DOMContentLoaded", () => {
    reconstructProjects();
    addProjectBtn.addEventListener('click', addNewProject);
   // addTaskBtn.addEventListener('click', addTaskBtn);
});

console.log("Hello!")