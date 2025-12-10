document.getElementById('contactUsForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Bootstrap validation
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    
    const formData = new FormData(form);
    const feedbackDiv = document.getElementById('feedbackMessage');
    
    try {
        const response = await fetch('../assets/sendEmail.php', {
            method: 'POST',
            body: formData
            // Don't set Content-Type header - let browser set it with boundary
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'success') {
            feedbackDiv.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
            form.reset();
            form.classList.remove('was-validated');
        } else {
            feedbackDiv.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        feedbackDiv.innerHTML = `<div class="alert alert-danger">An error occurred. Please try again later.</div>`;
    }
});