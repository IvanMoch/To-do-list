const taskButton = document.querySelector('#taskButton')
const taskContainer = document.querySelector('#teamsContainer')
const createTeamModal = document.querySelector('#createTeamModal')
const teamForm = document.querySelector('#createTeamForm')
const createTeamButton = document.querySelector('#createButton')

//Show main view

taskButton.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('/main', { method: 'GET' })
        .then((res) => {
            if (res.ok) {
            return window.location.href ='/main'
            }
            
    } )
})

// Events when the DOM is loaded

document.addEventListener('DOMContentLoaded', (e) => {
    showTeams()
})

// show the form to create a new team

createTeamButton.addEventListener('click', (e) => {
    e.preventDefault()
    showCreateTeamModal()
})



function showTeams() {
    fetch(`/team/filterByUser/${userId}`, {method: 'GET'})
        .then((res) => {
            if (res.ok) {
            return res.json()
            }
            alert('Error while fetching')
        })
        .then((workteams) => {
            workteams.forEach(element => {
                const newTeam = document.createElement('div')
                newTeam.className = 'team-card'
                newTeam.id = element._id

                newTeam.innerHTML = `
                <h3 class="team-title">${element.title}</h3>
                <p class="team-description">${element.description}</p>
                <button class="view-details-button">View Details</button>
                `

                taskContainer.appendChild(newTeam)

            });
        })
}

// Show the modal
function showCreateTeamModal() {
  createTeamModal.style.display = 'flex';
}

// Close the modal
function closeCreateTeamModal() {
  createTeamModal.style.display = 'none';
}

// Clear the form
function clearCreateTeamForm() {
  teamForm.reset();
}
