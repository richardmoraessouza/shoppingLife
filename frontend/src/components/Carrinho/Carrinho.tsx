import styles from "./Carrinho.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Carrinho() {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [carrinhoVazio, setCarrinhoVazio] = useState<boolean>(true)
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioId = localStorage.getItem('usuario_id');
    if (usuarioId) {
      axios.get(`https://api-shopping-life.onrender.com/carrinho/${usuarioId}`).then((res) => {
        setCarrinho(res.data);
        console.log(res.data)
        setCarrinhoVazio(false);
      }).catch(() => {
        setCarrinhoVazio(false);
      });
    } else {
      setCarrinhoVazio(false);
    }
  }, []);

  function linkProduto(produtoId :number) {
    navigate(`/produto/${produtoId}`);
  }
    return (
        <>
        {/* Voltar para o menu */}
        <section className={`position-fixed p-2 gap-4 ${styles.menuCarrinho}`}>
            <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg></a>
            <h1>Carrinho</h1>
        </section>

        {/* carrinho do usuário */}

        <main className={`d-flex justify-content-center align-items-center ${styles.meuCarrinho}`}>
          {carrinhoVazio ? (
            <p>Carregando...</p>
          ) : carrinho.length === 0 ? (
            <h3>🛒 Seu carrinho está vazio!</h3>
          ) : 
          carrinho.map(item => (
            <article
            className={`col-12 col-sm-6 col-md-4 col-lg-3 ${styles.cardProduto}`}
            key={item.id}
            onClick={() => linkProduto(item.produtos_id)}
          >
            {/* Desconto no canto */}
            {(item.discountpercentage != null && item.discountpercentage > 0) && (
              <div className={styles.desconto}>
                <span>-{Math.round(item.discountpercentage)}%</span>
              </div>
            )}

            {/* Imagem */}
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
            </div>
            
            <p className={styles.frete}><strong>Frete grátis</strong> acima de <strong>R$10</strong></p>

            {/* Informações */}
            <div className={styles.info}>
              <p className={styles.titulo}>{item.title}</p>
              <p className={styles.preco}>R${item.price}</p>
            </div>

          </article>
          ))
        }
        </main>
        </>
    )
}

export default Carrinho