import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import StatusCarrinho from '../StatusCarrinho/StatusCarrinho'
import styles from './PaginaProduto.module.css'

/** API api-shopping-life retorna campos em minúsculas */
interface Review {
  rating: number
  comment: string
  date: string
  reviewername: string
  revieweremail?: string
}

interface ProdutoDummy {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountpercentage: number | null
  rating: number | null
  stock: number | null
  tags: string[] | null
  brand: string | null
  sku: string | null
  weight: number | null
  width: number | null
  height: number | null
  depth: number | null
  warrantyinformation: string | null
  shippinginformation: string | null
  availabilitystatus: string | null
  returnpolicy: string | null
  minimumorderquantity: number | null
  image: string | null
  images: string[] | null
  thumbnail: string | null
  reviews: Review[] | null
}

const API_BASE = 'https://api-shopping-life.onrender.com/produtos'

function PaginaProdutos() {
  const { id } = useParams<{ id: string }>()
  const [produto, setProduto] = useState<ProdutoDummy | null>(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [modalStatus, setModalStatus] = useState(false)
  const [imagemAtual, setImagemAtual] = useState(0)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setErro(null)
    setImagemAtual(0)
    axios
      .get(API_BASE)
      .then((res) => {
        const lista = Array.isArray(res.data) ? res.data : []
        const encontrado = lista.find((p: ProdutoDummy) => String(p.id) === id)
        setProduto(encontrado ?? null)
        if (!encontrado) setErro('Produto não encontrado.')
      })
      .catch(() => setErro('Erro ao carregar o produto.'))
      .finally(() => setLoading(false))
  }, [id])

  const adicionarAoCarrinho = () => {
    const usuarioId = localStorage.getItem('usuario_id')
    if (!usuarioId) {
      alert('Você precisa estar logado para adicionar ao carrinho.')
      window.location.href = '/login'
      return
    }
    if (!produto) return
    axios
      .post('https://api-shopping-life.onrender.com/carrinho', {
        usuario_id: usuarioId,
        produto_id: produto.id,
        quantidade: 1,
      })
      .then(() => {
        setModalStatus(true)
        setTimeout(() => setModalStatus(false), 2500)
      })
      .catch(() => {
        alert('Erro ao adicionar ao carrinho.')
      })
  }

  const temDesconto = produto != null && produto.discountpercentage != null && produto.discountpercentage > 0
  const discount = produto?.discountpercentage ?? 0
  const precoComDesconto = produto
    ? produto.price * (1 - discount / 100)
    : 0
  const imagens = produto?.images && Array.isArray(produto.images) ? produto.images : []
  const imagemPrincipal =
    imagens.length > 0
      ? imagens[imagemAtual]
      : produto?.image ?? produto?.thumbnail ?? ''

  if (loading) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.loading}>
          <div
            className="spinner-border"
            role="status"
            style={{
              width: '48px',
              height: '48px',
              borderWidth: '4px',
              borderColor: 'var(--cor-principal)',
              borderRightColor: 'transparent',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <p className={styles.loadingText}>Carregando produto...</p>
        </div>
      </section>
    )
  }

  if (erro || !produto) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.erro}>
          <p>{erro ?? 'Produto não encontrado.'}</p>
          <Link to="/" className={styles.btnVoltar}>
            Voltar à loja
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className={styles.wrapper}>
        <Link to="/" className={styles.voltar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>

        <article className={styles.card}>
          <div className={styles.colunaImagem}>
            <div className={styles.imagemContainer}>
              <img src={imagemPrincipal} alt={produto.title} />
              {discount > 0 && (
                <span className={styles.badgeDesconto}>
                  -{Math.round(discount)}%
                </span>
              )}
            </div>
            {imagens.length > 1 && (
              <div className={styles.galeria}>
                {imagens.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`${styles.miniImg} ${i === imagemAtual ? styles.miniImgAtivo : ''}`}
                    onClick={() => setImagemAtual(i)}
                  >
                    <img src={img} alt={`${produto.title} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.meta}>
              <span className={styles.categoria}>{produto.category}</span>
              {produto.brand && (
                <span className={styles.brand}> · {produto.brand}</span>
              )}
            </div>
            <h1 className={styles.titulo}>{produto.title}</h1>

            {(produto.rating != null && produto.rating > 0) && (
              <div className={styles.rating}>
                <span className={styles.stars}>
                  {'★'.repeat(Math.round(produto.rating))}
                  {'☆'.repeat(5 - Math.round(produto.rating))}
                </span>
                <span className={styles.ratingNum}>{produto.rating}</span>
              </div>
            )}

            <div className={styles.precos}>
              {temDesconto ? (
                <>
                  <span className={styles.preco}>R$ {precoComDesconto.toFixed(2)}</span>
                  <span className={styles.precoAntigo}>R$ {Number(produto.price).toFixed(2)}</span>
                </>
              ) : (
                <span className={styles.preco}>R$ {Number(produto.price).toFixed(2)}</span>
              )}
            </div>

            <p className={styles.descricao}>{produto.description}</p>

            {(produto.tags?.length ?? 0) > 0 && (
              <div className={styles.tags}>
                {(produto.tags ?? []).map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}
            
            <button
              type="button"
              className={styles.btnProduto}
              onClick={adicionarAoCarrinho}
              disabled={(produto.stock ?? 0) === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L1.01 3.607 0.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
              {(produto.stock ?? 0) === 0 ? 'Indisponível' : 'Adicionar ao carrinho'}
            </button>
             <button className={styles.btnProduto}>Comprar Agora</button>
          </div>
        </article>

        <section className={styles.detalhesProduto}>
          <h2 className={styles.tituloDetalheProduto}>Detalhes Do Produto</h2>
              {produto.sku && <p><strong>SKU:</strong> {produto.sku}</p>}
              {(produto.stock != null) && <p><strong>Estoque:</strong> {produto.stock} unidades</p>}
              {produto.availabilitystatus && <p><strong>Status:</strong> {produto.availabilitystatus}</p>}
              {produto.shippinginformation && <p><strong>Envio:</strong> {produto.shippinginformation}</p>}
              {produto.warrantyinformation && <p><strong>Garantia:</strong> {produto.warrantyinformation}</p>}
              {produto.returnpolicy && <p><strong>Política de devolução:</strong> {produto.returnpolicy}</p>}
              {(produto.minimumorderquantity != null && produto.minimumorderquantity > 1) && (
                <p><strong>Quantidade mínima:</strong> {produto.minimumorderquantity}</p>
              )}
              {(produto.width != null && produto.height != null && produto.depth != null) && (
                <p>
                  <strong>Dimensões (cm):</strong>{' '}
                  {produto.width} × {produto.height} × {produto.depth}
                </p>
              )}
              {(produto.weight != null && produto.weight > 0) && (
                <p><strong>Peso:</strong> {produto.weight} kg</p>
              )}
        </section>

        {(produto.reviews?.length ?? 0) > 0 && (
          <section className={styles.reviews}>
            <h2 className={styles.reviewsTitulo}>Avaliações</h2>
            <ul className={styles.reviewsLista}>
              {produto.reviews!.map((rev, i) => (
                <li key={i} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewStars}>
                      {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                    </span>
                    <span className={styles.reviewAuthor}>{rev.reviewername}</span>
                  </div>
                  <p className={styles.reviewComment}>{rev.comment}</p>
                  <time className={styles.reviewDate}>
                    {new Date(rev.date).toLocaleDateString('pt-BR')}
                  </time>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
      {modalStatus && <StatusCarrinho />}
    </>
  )
}

export default PaginaProdutos
