const url = `http://localhost:3030/jsonstore/messenger`;
const messages = document.getElementById('messages');
const refersh = document.getElementById('refresh');
const submit = document.getElementById('submit');
const input = document.getElementsByTagName('input')[0];
const input1 = document.getElementsByTagName('input')[1];
let arr = [];
function attachEvents() {

      refersh.addEventListener('click', () =>{
          return toRefresh();
         
      });
      submit.addEventListener('click', () =>{
          return toSend();
      });
}
async function toSend(){
       const resp = await fetch(url, {
          method: 'post',
          headers: {
               'Content-Type': 'aplication/json'
          },
          body: JSON.stringify({author: input.value, content: input1.value})
       });
       const data = await resp.json();
       return data;
}
async function toRefresh(){
     const resp = await fetch(url);
     const data = await resp.json();
    
     Object.entries(data).forEach(x => {
          arr.push(`${x[1].author}: ${x[1].content}`);
          
     })
     messages.value = arr.join('\n');
}
attachEvents();