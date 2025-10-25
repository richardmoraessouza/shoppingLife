import styles from './UsuarioLogado.module.css'

type props = {
    usuario: string
}

function UsuarioLogado({usuario}: props) {
    return (
        <header className={`${styles.header}`}>
        <nav>
            <ul>
                <li className={styles.itemNav}>
                    <div className={styles.imgUsuario}><img src="/usuario.png" alt="foto de perfil" /></div>
                    {usuario}
                </li>
            </ul>
        </nav>
    </header>
    )
}
export default UsuarioLogado
