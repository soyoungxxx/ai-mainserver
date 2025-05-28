document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the table
    const projects = [];
    
    // Generate 23 sample projects
    for (let i = 1; i <= 23; i++) {
        projects.push({
            id: i,
            name: 'OO사업',
            startDate: '2025-05-05',
            endDate: '2027-12-05'
        });
    }
    
    // Populate the table
    populateTable(projects);
    
    // Add event listeners
    document.querySelectorAll('.page-number').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.page-number').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // In a real application, this would fetch data for the selected page
            // For this demo, we'll just keep showing the same data
        });
    });
    
    // Setup date inputs to show date picker on focus
    setupDateInputs();
});

function populateTable(projects) {
    const tableBody = document.getElementById('projectTableBody');
    tableBody.innerHTML = '';
    
    // Display only the first 10 projects (for pagination demo)
    const displayProjects = projects.slice(0, 10);
    
    displayProjects.forEach(project => {
        const row = document.createElement('tr');
        
        // Create cells
        const idCell = document.createElement('td');
        idCell.textContent = project.id;
        
        const nameCell = document.createElement('td');
        nameCell.textContent = project.name;
        
        const startDateCell = document.createElement('td');
        startDateCell.textContent = project.startDate;
        
        const endDateCell = document.createElement('td');
        endDateCell.textContent = project.endDate;
        
        // Create empty cells for the "..." columns
        const emptyCell1 = document.createElement('td');
        emptyCell1.textContent = '...';
        
        const emptyCell2 = document.createElement('td');
        emptyCell2.textContent = '...';
        
        const emptyCell3 = document.createElement('td');
        emptyCell3.textContent = '...';
        
        // Append cells to row
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(startDateCell);
        row.appendChild(endDateCell);
        row.appendChild(emptyCell1);
        row.appendChild(emptyCell2);
        row.appendChild(emptyCell3);
        
        // Append row to table body
        tableBody.appendChild(row);
    });
}

function setupDateInputs() {
    const dateInputs = document.querySelectorAll('#startDate, #endDate');
    
    dateInputs.forEach(input => {
        // Simple date picker simulation
        input.addEventListener('focus', function() {
            // In a real application, this would show a date picker
            // For this demo, we'll just set a placeholder date
            this.type = 'date';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.type = 'text';
            }
        });
    });
}

function showDatePicker(inputId) {
    const input = document.getElementById(inputId);
    input.type = 'date';
    input.focus();
}