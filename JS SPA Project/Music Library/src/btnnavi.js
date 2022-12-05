import {html, render} from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";


const nav = document.querySelector('header');



const navi = (hasUser) => html `

   <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
  <div>
    <a href="/Dashboard">Dashboard</a>
  </div>

 
  ${hasUser ? html ` 
  <div class="user">
    <a href="/Create">Add Album</a>
    <a  @click=${logout}  href="javascript:void(0)">Logout</a>
  </div> 
  `
  : html`
  
  <div class="guest">
    <a href="/Login">Login</a>
    <a href="/Register">Register</a>
  </div>
  `
  }
</nav>
`;

export const renderNavi = () => {
    const hasUser = localStorage.getItem('token');
    render(navi(hasUser),nav);
    
 
}

export const logout = async() => {   

    const hasUser = localStorage.getItem('token');
    let url = 'http://localhost:3030/users/logout';
    const resp = await fetch(url, {
              headers: {
                'X-Authorization': hasUser
              }
    })
    localStorage.clear();
    renderNavi();
    page.redirect('/Dashboard')
}
