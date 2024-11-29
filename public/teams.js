const taskButton = document.querySelector('#taskButton')
const taskContainer = document.querySelector('#teamsContainer')

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