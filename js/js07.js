document.addEventListener("DOMContentLoaded", function() {
    const url = "https://reqres.in/api/users?delay=3";
    const cacheKey = "userData";
    const cacheTime = 60 * 1000;  // 1 minute
    const fetchUsersBtn = document.getElementById('fetchUsersBtn');
    const timestampDiv = document.getElementById('dataTimestamp'); 


    fetchUsersBtn.addEventListener('click', function() {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            if (Date.now() - parsedData.time < cacheTime) {
                displayData(parsedData.data);
            } else {
                localStorage.removeItem(cacheKey);  // Remove expired data
                fetchAndDisplayData();
            }
        } else {
            fetchAndDisplayData();
        }
    });

    function fetchAndDisplayData() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayData(data.data);
                localStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), data: data.data }));
                displayCacheTimestamp();  
            });
    }

    function displayData(users) {
        const tableBody = document.getElementById('userTable').querySelector('tbody');
        tableBody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td><img src="${user.avatar}" alt="${user.first_name}" class="rounded-circle" width="50"></td>
            `;
            tableBody.appendChild(row);
        });
    }
    function displayCacheTimestamp() {  // Añadimos esta función
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const date = new Date(parsedData.time);
            timestampDiv.textContent = `Datos guardados el: ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`;
        } else {
            timestampDiv.textContent = "No hay datos guardados en el almacenamiento local.";
        }
    }
});
