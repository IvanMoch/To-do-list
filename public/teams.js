const taskButton = document.querySelector('#taskButton')
const taskContainer = document.querySelector('#teamsContainer')
const createTeamModal = document.querySelector('#createTeamModal')
const createTeamContainer = document.querySelector('#createTeamContainer')
const teamInfContainer = document.querySelector('#teamInfContainer')
const teamForm = document.querySelector('#createTeamForm')
const createTeamButton = document.querySelector('#createButton')
const searchResult = document.querySelector('#searchResults')
const teamMembersField = document.querySelector('#teamMembers')
const modalContent = document.querySelector('.modal-content')
let membersList = document.querySelector('#membersList')
const teamTitleField = document.querySelector('#teamTitle')
const teamDescriptionField = document.querySelector('#teamDescription')
const logoutButton = document.querySelector('#logout-button')

let selectedMembers = [];

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

// show the form to create a new team

createTeamButton.addEventListener('click', (e) => {
    e.preventDefault()
    showCreateTeamModal()
})

//Show the results

teamMembersField.addEventListener('input', (e) => {
    e.preventDefault()

    searchResult.innerHTML = ''

    if (teamMembersField.value.length < 2) {
        return
    }

    fetch(`/user/search/${teamMembersField.value}`, { method: 'GET' })
        .then((res) => {
            if (res.ok) {
            return res.json()
            }
            console.log('Error while fetching results')
        })
        .then((result) => {
            result.forEach((user) => {
            const li = document.createElement('li');
            li.textContent = user.username;
            li.dataset.userId = user._id; 

            li.addEventListener('click', () => {
            addMember(user.username, user._id);
    });

                searchResult.appendChild(li);
                searchResult.style.display = ''
        })
        })
    
})

// This function show all the teams the use belongs

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
                <button class="view-details-button" onclick="showTeamDetails('${element._id}')">View Details</button>
                `

                taskContainer.appendChild(newTeam)

            });
        })
}

//Create a new team

teamForm.addEventListener('submit', (e) => {
    e.preventDefault()
    selectedIds = selectedMembers.map((member) => { return member.id })
    selectedIds.push(userId) // adding the user ID

    fetch('/team/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: teamTitleField.value,
            description: teamDescriptionField.value,
            members: selectedIds
        })
            
    })
    .then((res) => {
                if (res.ok) {
                return res.json()
                }
                console.log('error while creating the new task')
            })
            .then((team) => {
            const newTeam = document.createElement('div')
                newTeam.className = 'team-card'
                newTeam.id = team._id

                newTeam.innerHTML = `
                <h3 class="team-title">${team.title}</h3>
                <p class="team-description">${team.description}</p>
                <button class="view-details-button" onclick="showTeamDetails('${team._id}')">View Details</button>
                `

                taskContainer.appendChild(newTeam)
            })
    clearCreateTeamForm()
    closeCreateTeamModal()  
    selectedMembers = []
})

// Show the modal
function showCreateTeamModal() {
    createTeamModal.style.display = 'flex';
    createTeamContainer.style.display = ''
}

// Close the form
function closeCreateTeamModal() {
    createTeamModal.style.display = 'none';
    createTeamContainer.style.display = 'none'
}

//close the description

function closeTeamInfModal() {
    createTeamModal.style.display = 'none'
    teamInfContainer.style.display = 'none'
}

// Clear the form
function clearCreateTeamForm() {
    teamForm.reset();
    if (membersList) {
        membersList.innerHTML = ''
    }
}

function addMember(username, userId) {
    if (selectedMembers.some((member) => member.id === userId)) return;

    selectedMembers.push({username, id: userId});
  updateSelectedMembers(); 
  searchResult.innerHTML = ''; // Clear dropdown
    teamMembersField.value = ''; // Clear input field
    searchResult.style.display = 'none'
}

/**
 * Update the UI to show selected members.
 */
function updateSelectedMembers() {

    if (!membersList) {
        membersList = document.createElement('ul');
        membersList.id = 'membersList'
    }
    
    
    const member = selectedMembers[selectedMembers.length - 1]
    const li = document.createElement('li')
    li.textContent = `${member.username}`
    membersList.appendChild(li)

    modalContent.appendChild(membersList);
}


// Show team details

function showTeamDetails(id) {
    createTeamModal.style.display = 'flex'
    teamInfContainer.style.display = ''

    fetch(`/team/id/${id}`, { method: 'GET' })
        .then((res) => {
            if (res.ok) {
            return res.json()
        }
        })
        .then((team) => {
            //TODO : Take the html of the description and insert it here in the description container
            teamInfContainer.innerHTML = `
            <span class="close-button" onclick="closeTeamInfModal()">×</span>

            <!-- Team Title -->
            <h2 id="teamTitle">${team.title}</h2>

            <!-- Team Description -->
            <p id="teamDescription">${team.description}</p>

            <!-- Team Members -->
            <h3>Members</h3>
            <ul id="membersDescription">
            </ul>
            <button class="erase-team-button" onclick="deleteTeam('${team._id}')">Erase Team</button>
            `;

            const teamMembers = document.querySelector('#membersDescription')
            
                team.members.forEach((member) => {
                    const newMember = document.createElement('li')
                    newMember.textContent = `${member.username}`
                    teamMembers.appendChild(newMember)
                })
            
    })
}

//delete a team and remove

function deleteTeam(id) {
    fetch(`/team/${id}`, { method: 'DELETE' })
        .then((res) => {
            if (res.ok) {
                const teamCard = document.getElementById(id)
                if (teamCard) {
                    teamCard.remove()
                    closeTeamInfModal()
                }
        }
    })
}