

import { html, nothing } from "../node_modules/lit-html/lit-html.js"
import page from  "../node_modules/page/page.mjs"


let postId = '';
const shoDetails = (data, user, owner, remove) => html`  
       <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="${data.imageUrl}" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${data.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">0</span></div>

       
          <div id="action-buttons">
            ${owner ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a  @click=${remove} href="" id="delete-btn">Delete</a>
              `
              : nothing
           }  
            ${user && !owner ? html`
            <a href="" id="like-btn">Like</a>
              `
              : nothing
           }  
           
          </div>
        </div>
      </section> 
  `;


export const renderDetails = async(ctx) => {        
  const url = `http://localhost:3030/data/albums/${ctx.params.id}`;
  const resp = await fetch(url);
  const data = await resp.json(); 
  const user = localStorage.getItem('token');
  postId = data._id;
  const userId = localStorage.getItem('id');
  const ownerId = data._ownerId;
  const owner = Boolean(userId == ownerId);
  ctx.render(shoDetails(data, user, owner, remove)) 
  
}



async function remove(e){
    e.preventDefault();    
        
        
        let conf = confirm('Are you sure?')
        if(conf){   
            let user = localStorage.getItem('token');      
            let url = `http://localhost:3030/data/albums/${postId} `;       
            const resp = await fetch(url, {
              method: 'DELETE' ,
              headers: {
                'X-Authorization': user
              }  
            })
          
             page.redirect('/Dashboard')
        }        
          
      }
      

 
