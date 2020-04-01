const path = require('path');
const fs = require('fs');

const homeController = {
  index: (req, res) => {
    let servicos = [
      { nome: 'Dev Full Stack', imagem: '/imagens/undraw_dev_focus.svg'},
      { nome: 'Marketing Digital', imagem: '/imagens/undraw_social_dashboard.svg'},
      { nome: 'Consultoria UX', imagem: '/imagens/undraw_mobile_apps.svg'}
    ];

    let banners = [
      '/imagens/banner.jpg', 
      '/imagens/banner3.jpg', 
    ];

    res.render(
      'index', 
      { title: 'Home', listaServicos: servicos, listaBanners: banners }
    );
  },
  contato: (req, res) => {

    let {nome, email, mensagem} = req.body;

    let infoContato = { nome, email, mensagem };

    let caminhoContato = path.join('db', 'contatos.json')

    let listaContatos = {}

    if(fs.existsSync(caminhoContato)){

      console.log(infoContato)

      listaContatos = fs.readFileSync(caminhoContato, { encoding: 'utf-8'})
      listaContatos = JSON.parse(listaContatos)
      listaContatos.contatos.push(infoContato)

    }
    else{
      listaContatos = {
        contatos:[infoContato]
      }
    }

    listaContatos = JSON.stringify(listaContatos)
    fs.writeFileSync(caminhoContato, listaContatos)
    

    res.render('contato', {nome, email, mensagem, title: 'Contato'});
  },


  newsletter: (req, res) => {
    let {email} = req.query;

    const fileNewsletter = path.join('db', 'newsletter.json')

    let listaNewsletter = {}
    if(fs.existsSync(fileNewsletter)){
      listaNewsletter = fs.readFileSync(fileNewsletter, { encoding: 'utf-8'})
      listaNewsletter = JSON.parse(listaNewsletter)
      listaNewsletter.inscritos.push(email)
      
    }
    else {
      listaNewsletter = {
        inscritos: [email]
      }
      
    }

    listaNewsletter = JSON.stringify(listaNewsletter)
    fs.writeFileSync(fileNewsletter, listaNewsletter)

  
    res.render('newsletter', {email, title: 'Newsletter'});
  }
};

module.exports = homeController;