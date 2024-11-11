// Função para buscar os pubs da API
async function carregarPubs() {
  try {
    const response = await fetch('http://localhost:4000/teste', {
      method: 'get'
    }) // URL da sua API que retorna a lista de pubs
    if (!response.ok) {
      throw new Error('Erro ao carregar pubs')
    }

    const { pubs } = await response.json() // Converte a resposta para JSON
    exibirPubs(pubs) // Chama a função para exibir os pubs
  } catch (err) {
    console.error('Erro ao buscar pubs:', err)
    alert('Erro ao carregar os pubs.')
  }
}

// Função para exibir os pubs
function exibirPubs(pubs) {
  const pubsContainer = document.getElementById('livrosContainer') // Confirma o ID correto no HTML

  // Limpa o container antes de adicionar os novos pubs
  pubsContainer.innerHTML = ''

  // Se não houver pubs, exibe uma mensagem
  if (!pubs || pubs.length === 0) {
    pubsContainer.innerHTML = '<p>Nenhum pub encontrado.</p>'
    return
  }

  // Exibe os pubs na tela
  pubs.forEach(pub => {
    const divPub = document.createElement('div')
    divPub.classList.add('pub')
    divPub.style.border = '1px solid #ddd'
    divPub.style.padding = '10px'
    divPub.style.marginBottom = '10px'

    // Adiciona o nome
    const nome = document.createElement('h3')
    nome.textContent = pub.nome
    divPub.appendChild(nome)

    // Adiciona o e-mail
    const email = document.createElement('p')
    email.textContent = `Email: ${pub.email}`
    divPub.appendChild(email)

    // Adiciona a descrição
    const descricao = document.createElement('p')
    descricao.textContent = `Descrição: ${pub.descricao}`
    divPub.appendChild(descricao)

    // Verifica se há uma foto de perfil e a exibe, senão exibe uma mensagem padrão
    const fotoElemento = document.createElement('div')
    if (pub.foto_perfil) {
      const img = document.createElement('img')
      const imgURL = `data:image/jpeg;base64,${pub.foto_perfil}`
      img.src = imgURL
      img.alt = pub.nome
      img.style.maxWidth = '200px' // Ajuste o tamanho da imagem conforme necessário
      img.style.height = 'auto'
      fotoElemento.appendChild(img)
    } else {
      const semFoto = document.createElement('p')
      semFoto.textContent = 'Foto não disponível'
      fotoElemento.appendChild(semFoto)
    }
    divPub.appendChild(fotoElemento)

    // Adiciona a div do pub ao container
    pubsContainer.appendChild(divPub)
  })
}

// Carrega os pubs ao carregar a página
window.onload = carregarPubs

function showLoginModal() {
  document.getElementById('loginModal').style.display = 'flex'
}

// Função para fechar o modal de login
function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none'
}

// Fechar o modal ao clicar fora da área do formulário
window.onclick = function (event) {
  const modal = document.getElementById('loginModal')
  if (event.target === modal) {
    closeLoginModal()
  }
}

function showLoginModal() {
  document.getElementById('loginModal').style.display = 'flex'
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none'
  document.getElementById('loginError').style.display = 'none' // Oculta mensagem de erro
}

// Função de autenticação de login
async function autenticarLogin() {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) throw new Error('Login inválido')

    const result = await response.json()

    if (result.success) {
      closeLoginModal() // Fecha o modal caso o login seja bem-sucedido
      alert('Login realizado com sucesso!')
    } else {
      document.getElementById('loginError').style.display = 'block'
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err)
    document.getElementById('loginError').style.display = 'block'
  }
}

// Fechar o modal ao clicar fora da área do formulário
window.onclick = function (event) {
  const modal = document.getElementById('loginModal')
  if (event.target === modal) {
    closeLoginModal()
  }
}
