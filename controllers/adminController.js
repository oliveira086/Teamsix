const path = require('path');
const fs = require('fs');

const adminController = {
    index: (req, res) => {
        let caminhoContato = path.join('db', 'contatos.json')
        let lerArquivo = fs.readFileSync(caminhoContato, {encoding: 'utf-8'})
        let listaContatoObjeto = JSON.parse(lerArquivo)

        let caminhoNews = path.join('db', 'newsletter.json')
        let lerArquivoNews = fs.readFileSync(caminhoNews, {encoding: 'utf-8'})
        let listaNewsObjeto = JSON.parse(lerArquivoNews)

        res.render(
          'admin', 
          { title: 'Admin', listaDeContato:listaContatoObjeto, listaDeNews: listaNewsObjeto}
        );
      }
}

module.exports = adminController;