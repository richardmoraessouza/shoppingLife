import { useEffect, useState } from 'react'
import styles from './App.module.css'
import axios from 'axios'
import UsuarioLogado from './components/UsuarioLogado/UsuarioLogado'
import StatusCarrinho from './components/StatusCarrinho/StatusCarrinho'

interface Produto {
  id: number
  title: string
  image: string
  price: number
}


function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [descontos, setDescontos] = useState<number[]>([])
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [usuario, setUsuario] = useState<string | null>(null);
  const [modalStatus, setModalStatus] = useState<boolean>(false)

  function campoPesquisar(e: React.FormEvent) {
    e.preventDefault()
  }

  useEffect(() => {
    const nomeUsuario = localStorage.getItem('usuario_nome');
    setUsuario(nomeUsuario);
  }, []);

  useEffect(() => {
    axios.get('https://api-shopping-life.onrender.com/produtos').then((res) => {
      setProdutos(res.data)

      const descontosGerados = res.data.map(() =>
        Math.floor(Math.random() * 95)
      )
      setDescontos(descontosGerados)
    })
  }, [])

  const produtosFiltrados = produtos.filter((produto) =>
    produto.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const adicionarAoCarrinho = (produtoId: number) => {
    const usuarioId = localStorage.getItem('usuario_id')
    
    if (!usuarioId) {
      alert('Você precisa estar logado para adicionar ao carrinho.')
      window.location.href = '/login'
      return
    }
    
    axios
    .post('https://api-shopping-life.onrender.com/carrinho', {
      usuario_id: usuarioId,
      produto_id: produtoId,
      quantidade: 1,
    })
    .then(() => {
        setModalStatus(true)
        setTimeout(() => {
          setModalStatus(false)
        },2500)
      })
      .catch((error) => {
        console.error('Erro ao adicionar ao carrinho:', error)
        alert('Erro ao adicionar ao carrinho.')
      })
  }

  return (
    <main>
      {usuario && <UsuarioLogado usuario={usuario} />}
      <aside className={`position-fixed ${styles.containerMeuCar}`}>
        <a href="/carrinho" className={styles.btnCarrinho}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 3.607 0.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </a>
      </aside>

      <section className={styles.pesquisar}>
        <div className={styles.containerPesquisas}>
          <button className="border-0">
            <a href="/">
              <img src="/teste.png" alt="Logo" />
            </a>
          </button>
          <form onSubmit={campoPesquisar} className="position-relative">
            <input
              type="text"
              className={`form-control p-3 ${styles.btnPesquisar}`}
              placeholder="Buscar Produto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className={`d-flex justify-content-center align-items-center ${styles.submit}`}
            >
              <i className={`bi bi-search ${styles.iconSearch}`}></i>
            </button>
          </form>
        </div>
      </section>

      <div className="p-5"></div>

      <section className="container">
        <div className="row">
          {produtosFiltrados.map((item, index) => (
            <article
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={item.id}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ position: 'relative' }}
            >
              <div className={styles.card}>
                <div className={`position-absolute top-0 ${styles.desconto}`}>
                  <p>-{descontos[index] ?? 0}%</p>
                </div>
                <img src={item.image} alt={item.title} />
                <div className={styles.textos}>
                  <div className={styles.title}>
                    <p>{item.title}</p>
                  </div>
                  <div className={styles.price}>
                    <p>
                      US$ <strong>{item.price}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {hoverIndex === index && (
                <div
                  className={styles.containerCarrinho}
                  style={{
                    bottom: '10px',
                    left: '10px',
                    zIndex: 10,
                    borderRadius: '6px',
                  }}
                >
                  <div
                    className={`p-1 d-flex justify-content-center align-items-center ${styles.carrinho}`}
                  >
                    <button
                      className="btn"
                      onClick={() => adicionarAoCarrinho(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-cart"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 3.607 0.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      {modalStatus && <StatusCarrinho />}
    </main>
    
  )
}

export default App
