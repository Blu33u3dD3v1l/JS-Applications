function solve() {
       let element = document.querySelector('.info');
       let departBtn = document.getElementById('depart');
       let arriveBtn = document.getElementById('arrive');
       let stop = {
        next:'depot'       
      }

      
        async function depart() {
            const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
                const response = await fetch(url);
                stop = await response.json();
                element.textContent = `Next stop ${stop.name}`;
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            }
        
        function arrive() {                
            element.textContent = `Arrived at ${stop.name}`;
            departBtn.disabled = false;
            arriveBtn.disabled = true;
            }
        
            return {
                depart,
                arrive
            };
}

let result = solve();