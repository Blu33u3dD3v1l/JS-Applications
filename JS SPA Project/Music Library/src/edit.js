import { html } from "../node_modules/lit-html/lit-html.js"
const inputs = document.getElementsByTagName('input');


const edit = (data) => html`
  <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value="${data.singer}" />
            <input type="text" name="album" id="album-album" placeholder="Album" value="${data.album}" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value="${data.imageUrl}" />
            <input type="text" name="release" id="album-release" placeholder="Release date" value="${data.release}"/>
            <input type="text" name="label" id="album-label" placeholder="Label" value="${data.label}" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value="${data.sales}" />

            <button  class="btn" type="submit">post</button>
          </form>
        </div>
      </section>

`;
export const renderEdit = async(ctx) => {            
  const url = `http://localhost:3030/data/albums/${ctx.params.id}`;
  const resp = await fetch(url);
  const data = await resp.json(); 
  ctx.render(edit(data));
  

  document.querySelector('.btn').addEventListener('click', async(e) => {
    e.preventDefault();

    const singer = inputs[0].value;
    const album = inputs[1].value;
    const imageUrl  = inputs[2].value;            
    const release = inputs[3].value;    
    const label = inputs[4].value   
    const sales = inputs[5].value;    

    
    let token = localStorage.getItem('token');

    if(singer == '' || album == '' || imageUrl == '' || release == '' || label == '' || sales == ''){
        alert('All fields are required!')
        return;
    }else{
        let url = `http://localhost:3030/data/albums/${ctx.params.id}`;
        const resp = await fetch(url, {
            method: 'PUT',
            headers: {
                 'Content-Type': 'aplication/json',
                 'X-Authorization': token
            },
            body: JSON.stringify({singer, album, imageUrl, release, label, sales})
         });
         const data = await resp.json();
        }
        ctx.page.redirect(`/albums/${ctx.params.id}`);
  });
}
      
