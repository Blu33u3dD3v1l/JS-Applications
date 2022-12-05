import { html } from "../node_modules/lit-html/lit-html.js"
const inputs = document.getElementsByTagName('input');



const login = () => html`
 <section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button  class="btn"   type="submit">login</button>
            <p class="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </section>


    `;
 
export const renderLogin = (ctx) => {

ctx.render(login())


document.querySelector('.btn').addEventListener('click', async(e) => {
    e.preventDefault();
    const url = 'http://localhost:3030/users/login';
    const email = inputs[0].value;
    const password = inputs[1].value;
    
    if(email == '' || password == ''){
        alert("All fields are required!")
        return;
    }
    const resp = await fetch(url, {
        method: 'post',
        headers: {
             'Content-Type': 'aplication/json'
        },
        body: JSON.stringify({email: email, password: password})
     });
     if(!resp.ok){
        alert("Password or Email dont mactch!Please try again.")
        return;
        
     }else{
        const data = await resp.json();
        localStorage.setItem('id', data._id)
        localStorage.setItem('token', data.accessToken)
        ctx.renderNavi();
        ctx.page.redirect('/Dashboard');
     
        
        
     }
    

})



}