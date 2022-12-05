import { html } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"
const inputs = document.getElementsByTagName('input');




const create = (onSubmit) => html`              
              <section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
        `;



  
async function onSubmit(e){
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
                    let url = 'http://localhost:3030/data/albums';
                    const resp = await fetch(url, {
                        method: 'POST',
                        headers: {
                             'Content-Type': 'aplication/json',
                             'X-Authorization': token
                        },
                        body: JSON.stringify({singer, album, imageUrl, release, label, sales})
                     });
                     const data = await resp.json();
                    }
                    page.redirect("/Dashboard");
                     
        }
     
    export const renderCreate = (ctx) => {
    
    ctx.render(create(onSubmit))
    }
 
