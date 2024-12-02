const addButton = document.querySelector('#addButton')
const workTeamsField = document.querySelector('#taskTeam')
const taskTittleField = document.querySelector('#taskTitle')
const taskDueDateFIeld = document.querySelector('#taskDueDate')
const taskDescription = document.querySelector('#taskDescription')
const taskButton = document.querySelector('#taskButton')
const logoutButton = document.querySelector('#logout-button')




// Events when the DOM is loaded
document.addEventListener('DOMContentLoaded', (e) => {
    insertWorkTeams()
})

//logout 

//logout 

logoutButton.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('/user/logout', {method : 'POST'})
        .then((res) => {
            if (res.ok) {
            window.location.href = '/'
        }
    })
})

//create the new Task

addButton.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('/task/create', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            tittle: taskTittleField.value,
            description: taskDescription.value,
            workTeam: workTeamsField.value,
            dueDate: new Date(taskDueDateFIeld.value).toISOString()
        })
    })
        .then((res) => {
            if (res.ok) {
            return showNotification('Task was created successfully', 'success')
            }
            return showNotification('Unexpected error occurred', 'error')
    })
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

//Go to the main page

taskButton.addEventListener('click', (e) => {
  e.preventDefault()

  fetch('/main', { method: 'GET' })
    .then((res) => {
      if (res.ok) {
      return window.location.href = '/main'
    }
  })
})

//function to show a notification if the task was created

function showNotification(message, type) {
  const notificationArea = document.getElementById('notificationArea');
  notificationArea.textContent = message;
  notificationArea.className = `notification ${type}`; // Add success/error class
  notificationArea.style.display = 'block'; // Show the notification

  // Automatically hide the notification after 3 seconds
  setTimeout(() => {
    notificationArea.style.display = 'none';
  }, 3000);
}