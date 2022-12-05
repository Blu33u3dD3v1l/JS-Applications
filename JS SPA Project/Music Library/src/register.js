import { html } from "../node_modules/lit-html/lit-html.js"
const inputs = document.getElementsByTagName('input');
const register = () => html`
<section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button  class="btn" type="submit">register</button>
            <p  class="message">Already registered? <a href="#">Login</a></p>
          </form>
        </div>
      </section>

    `;
 
export const renderRegister = (ctx) => {

ctx.render(register());

document.querySelector('.btn').addEventListener('click', async(e) => {
    e.preventDefault();
    const url = 'http://localhost:3030/users/register';
    const email = inputs[0].value;
    const password = inputs[1].value;
    const repassword = inputs[2].value;

  
    if(email == '' || password == '' || repassword == ''){
        alert("All fields are required!")
        return;
    }
    if(password !== repassword){
        alert('Passwords didnt match')
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
        alert('Error')
        return;
    } else{
        const data = await resp.json();
        localStorage.setItem('id', data._id)
        localStorage.setItem('token', data.accessToken)
        ctx.renderNavi();
        ctx.page.redirect('/Dashboard');
    }
})
}