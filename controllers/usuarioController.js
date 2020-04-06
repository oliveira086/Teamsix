const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const adminController = require('./adminController');

const usuarioController = {
  index: (req, res) => {
    res.render('cadastroUsuario', {title: 'Cadastro', verificador: false });
  },

  cadastrar: (req, res) => {
    let {nome, email, senha} = req.body;

    senha = bcrypt.hashSync(senha, 10);

    let infoUsuario = { nome, email, senha };  

    let caminhoUsuario = path.join('db', 'usuarios.json')

    let listaUsuarios = {}

    if(fs.existsSync(caminhoUsuario)){

      listaUsuarios = fs.readFileSync(caminhoUsuario, { encoding: 'utf-8'})
      listaUsuarios = JSON.parse(listaUsuarios)
      listaUsuarios.usuarios.push(infoUsuario)

    }
    else{
      listaUsuarios = {
        usuarios:[infoUsuario]
      }
    }

    listaUsuarios = JSON.stringify(listaUsuarios)
    fs.writeFileSync(caminhoUsuario, listaUsuarios)

    res.render(
      'cadastroUsuario', {title: 'Cadastro', verificador: true})
  },
  login: (req,res) =>{
    res.render('login', {title: 'Login'} )
  },
  autenticar: (req,res) =>{
    let {email, senha} = req.body;
    let caminhoUsuario = path.join('db', 'usuarios.json')
    let usuarios =  fs.readFileSync(caminhoUsuario, { encoding: 'utf-8'})
    let listaUsuarios = JSON.parse(usuarios);
    for( let usuario of listaUsuarios.usuarios){
      if(email == usuario.email && bcrypt.compareSync(senha, usuario.senha)){
        req.session.usuarioLogado = usuario.nome;
        res.redirect('/admin');
      } else{
        res.redirect('/');
      }
    }
  }
}

module.exports = usuarioController;