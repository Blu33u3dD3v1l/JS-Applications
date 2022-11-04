async function getInfo() {
    let stopId = document.getElementById('stopId');
    let stop = stopId.value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stop}`;
    let stopNameElement = document.getElementById('stopName');
    let buses = document.getElementById('buses');
    buses.innerHTML ="";
    stopId.value ="";
    try {
        const response = await fetch(url);
        const data = await response.json();
         
        stopNameElement.textContent = data.name;
        Object.entries(data.buses).forEach(([x, y]) =>{
                  const li = document.createElement('li');
                  li.textContent = `Bus ${x} arrives in ${y} minutes`;
                  buses.appendChild(li);

        })
    
    } catch (error) {
        stopNameElement.textContent = 'Error';
    }
    
}