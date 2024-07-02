const form = document.querySelector('#login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.message === 'Login successful') {
      window.location.href = '/protected'; // Redirect to protected page on successful login
    } else {
      alert(data.message); // Display error message if login failed
    }
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error with your login request. Please try again later.');
  }
});
