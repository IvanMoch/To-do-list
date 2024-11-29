const date = document.querySelector('#date')
const tittleField = document.querySelector('#tittle')
const descriptionField = document.querySelector('#Description-input')
const workTeamsField = document.querySelector('#workTeams')
const taskContainer = document.querySelector('#taskContainer')
const doneButton = document.querySelectorAll('.finishTask')
const logoutButton = document.querySelector('#logout-button')
const createTaskButton = document.querySelector('#createTaskButton')
const taskButton = document.querySelector('#teamsButton')

//Save a new Task

//logout 

logoutButton.addEventListener('click', (e) => {
  e.preventDefault()
  
  fetch('/user/logout', {
    method: 'POST'
  })
    .then((res) => {
      if (res.ok) {
      return window.location.href = '/'
      }

      alert('something goes wrong')
      
  })
})
  

//Go to the create task view

createTaskButton.addEventListener('click', (e) => {
  e.preventDefault()

  fetch('/createTask')
    .then((res) => {
      if (res.ok) {
      return window.location.href = '/createTask'
      }
      
      alert('something goes wrong')
  })
})

//Go to the tasks view

taskButton.addEventListener('click', (e) => {
  e.preventDefault()

  fetch('/teams', { method: 'GET' })
    .then((res) => {
      if (res.ok) {
      return window.location.href = '/teams'
      }
      alert('Error while fetching "/teams"')
  })
})



//Events when the DOm is loaded

document.addEventListener('DOMContentLoaded', () => {
  getAllTasks()
  })



  
// insert all the task in the task List
  
function getAllTasks() { //TODO. solve the problem while fetching this API endpoint I think is cause I am calling it twice at same time
  fetch(`/team/filterByUser/${userId}`)
    .then((res) => {
      if (res.ok) {
      return res.json()
      }
      console.log('Error while fetching')
    })
    .then((workteams) => {
      workteams.forEach((element) => {
        fetch(`/task/team/${element._id}`)
          .then((res) => {
            if (res.ok) {
            return res.json()
            }
            console.log('Error while fetching "/task/team/"')
          })
          .then((tasks) => {
            tasks.forEach((task) => {
              const newTask = document.createElement('div')

              const dueDate = new Date(task.dueDate).toISOString()
              newTask.className = 'taskItem'
              newTask.id = task._id

              newTask.innerHTML = `
              
              <h2>${task.tittle}</h2>
              <h3>${dueDate}</h3>
              <p>${task.description}</p>
              <h3>${element.title}</h3>
              <button class="finishTask">Done</button>
              <button class="deleteTask">delete</button>
              
              `


              taskContainer.appendChild(newTask)

              //Setting a addEventListener to all the "Done" buttons

              newTask.querySelector('.finishTask').addEventListener('click', (e) => {
                e.preventDefault()
                deleteTask(task._id)
              })
            })
        })
    })
  })
}

function deleteTask(id) {

  fetch(`/task/${id}`, {
    method: 'DELETE'
  })
    .then((res) => {
      if (res.ok) {
      return res.json()
      }
      console.log('Error while fetching')
    })
    .then((deletedTask) => {
      alert(`The task "${deletedTask.tittle}" is done`)
      
      const taskElement = document.getElementById(id)

      if (taskElement) {
        taskElement.remove()
      }
  })
  
}
