import { html } from "../node_modules/lit-html/lit-html.js";

const dash = (allPosts) => html`
<section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
                    ${allPosts.length == 0 ? html `
                    <h2>There are no albums added yet.</h2>
                    
                    `
                    : html `
                       ${allPosts.map(postPrev)}
                    
                    `
                    }
        </ul>
</section>
`;

const postPrev = (allPosts) => html`
  <li class="card">
            <img src="${allPosts.imageUrl}" alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${allPosts.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${allPosts.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${allPosts.sales}</span></p>
            <a class="details-btn" href="/albums/${allPosts._id}">Details</a>
          </li>
`;      

const getAllPosts = async() => {
    const url = 'http://localhost:3030/data/albums?sortBy=_createdOn%20desc';
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

export const renderDash = async(ctx) =>{
    const allPosts = await getAllPosts();
    ctx.render(dash(allPosts));  
}