import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './App.module.css'
import axios from 'axios'
import UsuarioLogado from './components/UsuarioLogado/UsuarioLogado'
import StatusCarrinho from './components/StatusCarrinho/StatusCarrinho'

interface Produto {
  id: number
  title: string
  image?: string | null
  images?: string[] | string | null
  thumbnail?: string | null
  price: number
  discountpercentage?: number | null
}

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const navigate = useNavigate()
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [usuario, setUsuario] = useState<string | null>(null)
  const [modalStatus, setModalStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  function campoPesquisar(e: React.FormEvent) {
    e.preventDefault()
  }

  function linkProduto(produtoId: number) {
    navigate(`/produto/${produtoId}`) // redireciona para a página do produto
  }

  useEffect(() => {
    const nomeUsuario = localStorage.getItem('usuario_nome')
    setUsuario(nomeUsuario)
  }, [])

  useEffect(() => {
    setLoading(true) 
    axios.get('https://api-shopping-life.onrender.com/produtos')
      .then((res) => {
        setProdutos(res.data)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
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
    axios.post('https://api-shopping-life.onrender.com/carrinho', {
      usuario_id: usuarioId,
      produto_id: produtoId,
      quantidade: 1,
    })
    .then(() => {
      setModalStatus(true)
      setTimeout(() => setModalStatus(false), 2500)
    })
    .catch((error) => {
      console.error('Erro ao adicionar ao carrinho:', error)
      alert('Erro ao adicionar ao carrinho.')
    })
  }

  return (
    <main>
      {usuario && <UsuarioLogado usuario={usuario} />}

      {/* Botão do carrinho fixo */}
      <aside className={`position-fixed ${styles.containerMeuCar}`}>
        <a href="/carrinho" className={styles.btnCarrinho}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 3.607 0.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
        </a>
      </aside>
      
      {/* Campo de pesquisar */}
      <section className={styles.pesquisar}>
        <div className={styles.containerPesquisas}>
        
            <a href="/"><img src="/teste.png" alt="Logo" /></a>
        
          <form onSubmit={campoPesquisar} className="position-relative">
            <input
              type="text"
              className={`form-control p-3 ${styles.btnPesquisar}`}
              placeholder="Buscar Produto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className={`d-flex justify-content-center align-items-center ${styles.submit}`}>
              <i className={`bi bi-search ${styles.iconSearch}`}></i>
            </button>
          </form>
        </div>
      </section>

      <div className="p-5"></div>
      <div className="p-3"></div>

      <section className="container">
      {/* Mostra carregando produtos enquanto a api não carrega */}
          {loading ? (
            <div className="text-center my-5" style={{ padding: '60px 20px' }}>
              <div 
                className="spinner-border" 
                role="status"
                style={{
                  width: '48px',
                  height: '48px',
                  borderWidth: '4px',
                  borderColor: 'var(--cor-principal)',
                  borderRightColor: 'transparent',
                  animation: 'spin 0.8s linear infinite'
                }}
              ></div>
              <p className="mt-4" style={{ 
                color: 'var(--cor-texto-secundario)', 
                fontSize: '16px',
                fontWeight: 500
              }}>
                Carregando produtos...
              </p>
            </div>

            ) : (
              // card dos produtos
              <div className={`row ${styles.gridProdutos}`}>
                {produtosFiltrados.map((item, index) => (
                  <article
                    key={item.id}
                    onClick={() => linkProduto(item.id)}
                    className={`col-12 col-sm-6 col-md-4 col-lg-3 ${styles.cardProduto}`}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {/* Desconto no canto (usa discountpercentage da API) */}
                    {(item.discountpercentage != null && item.discountpercentage > 0) && (
                      <div className={styles.desconto}>
                        <span>-{Math.round(item.discountpercentage)}%</span>
                      </div>
                    )}

                    {/* Imagem do produto */}
                    <div className={styles.imgContainer}>
                      <img
                        src={
                          item.image ??
                          (Array.isArray(item.images) ? item.images[0] : (typeof item.images === 'string' ? item.images : null)) ??
                          item.thumbnail ??
                          ''
                        }
                        alt={item.title}
                      />
                      <p className={styles.frete}><strong>Frete grátis</strong> acima de <strong>R$10</strong></p>
                    </div>
                    

                    {/* Informações */}
                    <div className={styles.info}>
                      <p className={styles.titulo}>{item.title}</p>
                      <p className={styles.preco}>R$ {Number(item.price).toFixed(2)}</p>
                    </div>

                    {/* Botão carrinho aparece ao passar o mouse */}
                    {hoverIndex === index && (
                      <div className={styles.containerCarrinho}>
                        <button className={`${styles.carrinho} p-2`} onClick={(e) => { e.stopPropagation(); adicionarAoCarrinho(item.id); }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 3.607 0.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                          </svg>
                        </button>
                    </div>
                    )}
                    </article>
                ))}
              </div>
                )}
      </section>
      {modalStatus && <StatusCarrinho />}
    </main>
  )
}

export default App
