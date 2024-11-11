const Teste = require('../models/pubs')
const fs = require('fs')

exports.create = async (req, res) => {
  try {
    const { nome, email, descrição } = req.body
    const fotoDePerfil = req.file
    if (!fotoDePerfil) {
      return res.status(400).json({ message: 'foto de perfil ausente.' })
    }
    const fotoData = fs.readFileSync(fotoDePerfil.path)

    const user = await Teste.create({
      nome_usuario: nome,
      email: email,
      descricao: descrição,
      foto_perfil: fotoData
    })
    res.status(200).json(user)
  } catch (error) {
    console.error('erro ao captar dados' + error)
  }
}
exports.findALL = async (req, res) => {
  try {
    const pubs = await Teste.findAll()

    const pubFormat = pubs.map(pub => {
      return {
        ...pub.toJSON(),
        foto_perfil: pub.foto_perfil ? pub.foto_perfil.toString('base64') : null
      }
    })
    res.json({ pubs: pubFormat }) // Retorna o JSON no formato correto
  } catch (error) {
    console.log('erro', error)
    res.status(500).json({ error: 'Erro ao buscar pubs' })
  }
}
