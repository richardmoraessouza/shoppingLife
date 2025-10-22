import styles from "./Carrinho.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

function Carrinho() {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [carrinhoVazio, setCarrinhoVazio] = useState<boolean>(true)

  useEffect(() => {
    const usuarioId = localStorage.getItem('usuario_id');
    if (usuarioId) {
      axios.get(`https://api-shopping-life.onrender.com/carrinho/${usuarioId}`).then((res) => {
        setCarrinho(res.data);
        setCarrinhoVazio(false);
      }).catch(() => {
        setCarrinhoVazio(false);
      });
    } else {
      setCarrinhoVazio(false);
    }
  }, []);

    return (
        <>
        {/* Voltar para o menor */}
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
            <article key={item.id} className={styles.produto}>
              <div className={styles.produtoImagem}>
                <img src={item.image} alt={item.title} width={100} />
                <p><strong>Frete Grátis</strong> acima de <strong>10 US$</strong></p>
              </div>
              <div className={styles.sobreProduto}>
                <p>{item.title}</p>
                <p>Quantidade: {item.quantidade}</p>
                <p><strong>US$ {item.price}</strong> no Pix</p>
              </div>
            </article>
          ))
        }
        </main>
        </>
    )
}

export default Carrinho