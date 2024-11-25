const date = document.querySelector('#date')
const tittleField = document.querySelector('#tittle')
const descriptionField = document.querySelector('#Description-input')
const workTeamsField = document.querySelector('#workTeams')
const addButton = document.querySelector('#addButton')
const taskContainer = document.querySelector('#taskContainer')


//Save a new Task

addButton.addEventListener('click', (e) => {
  e.preventDefault()

  fetch('/task/create', {
    method: 'POST',
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify({
      tittle: tittleField.value,
      description: descriptionField.value,
      workTeam: workTeamsField.value, 
      dueDate: new Date(`${date.value}T24:00:00Z`).toISOString()
    })
  }
  )

    .then((res) => {
      if (res.ok) {
        alert(workTeamsField.value)
        setTimeout(() => {
          alert('The new task was saved')
        }, 2000)
    }
  })

})


//show all the teams in the workTeamsField

document.addEventListener('DOMContentLoaded', async () => {
  await insertWorkTeams()
  await getAllTasks()
  })


  //insert all the teams in which the user belongs in the work teams field

function insertWorkTeams() {
    fetch(`/team/filterByUser/${userId}`)
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    console.log('Error fetching teams')
  })

  .then((workteams) => {
    workteams.forEach(element => {
      const newOption = document.createElement('option')


      newOption.value = element._id
      newOption.textContent = element.title

      workTeamsField.appendChild(newOption)
    });
  })
}
  
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
            })
        })
    })
  })
}
