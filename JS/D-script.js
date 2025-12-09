
// ============================================================
// MAIN FUNCTION: SHOW USER FREQUENCY
// ============================================================

function showUserFrequency() {
    // Get all users from localStorage
    let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    
    // Calculate gender statistics
    calculateGenderStats(users);
    
    // Calculate age group statistics
    calculateAgeGroupStats(users);
    
    // Display user list
    displayUserList(users);
}

// ============================================================
// GENDER STATISTICS CALCULATION
// ============================================================

function calculateGenderStats(users) {
    let maleCount = 0;
    let femaleCount = 0;
    let otherCount = 0;
    
    // Count by gender
    users.forEach(user => {
        if (user.gender) {
            const gender = user.gender.toLowerCase();
            if (gender === 'male') {
                maleCount++;
            } else if (gender === 'female') {
                femaleCount++;
            } else {
                otherCount++;
            }
        }
    });
    
    // Update display
    document.getElementById('maleCount').querySelector('.stat-value').textContent = maleCount;
    document.getElementById('femaleCount').querySelector('.stat-value').textContent = femaleCount;
    document.getElementById('totalUsers').querySelector('.stat-value').textContent = users.length;
    
    // Calculate percentages
    const total = users.length;
    const malePercent = total > 0 ? Math.round((maleCount / total) * 100) : 0;
    const femalePercent = total > 0 ? Math.round((femaleCount / total) * 100) : 0;
    
    // Update gender chart
    document.getElementById('maleBar').style.width = malePercent + '%';
    document.getElementById('maleBar').querySelector('.chart-label').textContent = `Male: ${malePercent}%`;
    
    document.getElementById('femaleBar').style.width = femalePercent + '%';
    document.getElementById('femaleBar').querySelector('.chart-label').textContent = `Female: ${femalePercent}%`;
}

// ============================================================
// AGE GROUP STATISTICS CALCULATION
// ============================================================

function calculateAgeGroupStats(users) {
    // Initialize age groups
    const ageGroups = {
        '18-25': { min: 18, max: 25, count: 0 },
        '26-35': { min: 26, max: 35, count: 0 },
        '36-50': { min: 36, max: 50, count: 0 },
        '50+': { min: 51, max: 150, count: 0 },
        'Under 18': { min: 0, max: 17, count: 0 }
    };
    
    // Calculate age for each user and categorize
    users.forEach(user => {
        if (user.DOB) {
            const birthDate = new Date(user.DOB);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            
            // Adjust for month/day
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            // Categorize by age group
            for (const [group, range] of Object.entries(ageGroups)) {
                if (age >= range.min && age <= range.max) {
                    range.count++;
                    break;
                }
            }
        }
    });
    
    // Create or update age group display
    updateAgeGroupDisplay(ageGroups, users.length);
}

// ============================================================
// UPDATE AGE GROUP DISPLAY
// ============================================================

function updateAgeGroupDisplay(ageGroups, totalUsers) {
    // Check if age group section already exists
    let ageGroupSection = document.querySelector('.age-stats-section');
    
    if (!ageGroupSection) {
        // Create new section after gender distribution
        const genderSection = document.querySelector('.stats-section');
        ageGroupSection = document.createElement('div');
        ageGroupSection.className = 'stats-section age-stats-section';
        
        ageGroupSection.innerHTML = `
            <h3>Age Group Distribution</h3>
            <div class="age-stats-grid" id="ageGroupStats">
                <!-- Age groups will be loaded here -->
            </div>
        `;
        
        // Insert after gender section
        genderSection.insertAdjacentElement('afterend', ageGroupSection);
    }
    
    // Update age group cards
    const ageGroupGrid = document.getElementById('ageGroupStats');
    if (ageGroupGrid) {
        let html = '';
        
        for (const [group, data] of Object.entries(ageGroups)) {
            const percentage = totalUsers > 0 ? Math.round((data.count / totalUsers) * 100) : 0;
            
            html += `
                <div class="age-stat-card">
                    <span class="age-group-label">${group}</span>
                    <div class="age-group-value">${data.count}</div>
                    <div class="age-group-percentage">${percentage}%</div>
                </div>
            `;
        }
        
        ageGroupGrid.innerHTML = html;
    }
}

// ============================================================
// DISPLAY USER LIST
// ============================================================

function displayUserList(users) {
    const userListDiv = document.getElementById('userList');
    
    if (users.length === 0) {
        userListDiv.innerHTML = '<div class="no-data">No users found. Register some users first!</div>';
        
        // Clear age group section if no users
        const ageGroupSection = document.querySelector('.age-stats-section');
        if (ageGroupSection) {
            const ageGroupGrid = document.getElementById('ageGroupStats');
            if (ageGroupGrid) {
                ageGroupGrid.innerHTML = '';
            }
        }
        
        return;
    }
    
    let html = '<div class="user-list">';
    
    users.forEach((user, index) => {
        // Calculate age if DOB exists
        let age = 'N/A';
        let ageGroup = 'Unknown';
        if (user.DOB) {
            const birthDate = new Date(user.DOB);
            const today = new Date();
            age = today.getFullYear() - birthDate.getFullYear();
            
            // Adjust for month/day
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            // Determine age group
            if (age >= 18 && age <= 25) ageGroup = '18-25';
            else if (age >= 26 && age <= 35) ageGroup = '26-35';
            else if (age >= 36 && age <= 50) ageGroup = '36-50';
            else if (age > 50) ageGroup = '50+';
            else if (age < 18) ageGroup = 'Under 18';
        }
        
        // Determine gender color
        let genderClass = 'gender-other';
        let genderIcon = '👤';
        if (user.gender) {
            if (user.gender.toLowerCase() === 'male') {
                genderClass = 'gender-male';
                genderIcon = '👨';
            } else if (user.gender.toLowerCase() === 'female') {
                genderClass = 'gender-female';
                genderIcon = '👩';
            }
        }
        
        // Format registration date
        let regDate = 'N/A';
        if (user.registrationDate) {
            regDate = new Date(user.registrationDate).toLocaleDateString();
        } else if (user.DOB) {
            // Use DOB as fallback for registration date
            regDate = new Date(user.DOB).toLocaleDateString();
        }
        
        html += `
            <div class="user-card">
                <div class="user-info">
                    <div class="user-header">
                        <span class="user-gender ${genderClass}">${genderIcon}</span>
                        <span class="user-name">${user.username || 'Unknown User'}</span>
                    </div>
                    <div class="user-details">
                        <p><strong>Email:</strong> ${user.email || 'N/A'}</p>
                        <p><strong>Gender:</strong> ${user.gender || 'N/A'}</p>
                        <p><strong>Age:</strong> ${age} years (${ageGroup})</p>
                        <p><strong>TRN:</strong> ${user.TRN || 'N/A'}</p>
                        <p><strong>Registered:</strong> ${regDate}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    userListDiv.innerHTML = html;
}




// ============================================================
// INITIALIZE DASHBOARD ON PAGE LOAD
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Load statistics when page loads
    showUserFrequency();
});