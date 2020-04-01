const path = require('path');
const fs = require('fs');

const adminController = {
    index: (req, res) => {
        let caminhoContato = path.join('db', 'contatos.json')
        let lerArquivo = fs.readFileSync(caminhoContato, {encoding: 'utf-8'})
        let listaContatoObjeto = JSON.parse(lerArquivo)

        res.render(
          'admin', 
          { title: 'Admin', listaDeContato:listaContatoObjeto.contatos}
        );
      }
}

module.exports = adminController;