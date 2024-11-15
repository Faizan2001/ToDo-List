import "./styles.css";
import {renderExistingProjects, addNewProject} from './dom';



const addProjectBtn = document.querySelector(".add-project-btn");
// const addTaskBtn = document.querySelector(".add-task-btn");

document.addEventListener("DOMContentLoaded", () => {
    renderExistingProjects();
    addProjectBtn.addEventListener('click', addNewProject);
   // addTaskBtn.addEventListener('click', addTaskBtn);
});

console.log("Hello!")