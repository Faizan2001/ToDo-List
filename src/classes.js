export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }



}

export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = []
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getTasks() {
        return this.tasks;
    }
}

//Main Array to store all projects
export const projects = [];