import styles from "./StatusCarrinho.module.css"

function StatusCarrinho() {
    return (
        <section className={`position-fixed d-flex justify-content-center align-items-center ${styles.situacaoCarrinho}`}>
            <i className="bi bi-check-circle"></i>
            Adicionado ao Carrinho
        </section>
    )
}

export default StatusCarrinho