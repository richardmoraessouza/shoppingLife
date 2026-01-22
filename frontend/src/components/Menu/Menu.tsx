import { Link } from 'react-router-dom'
import styles from './styles.module.css'


function Menu () {
    return (
    <header className={`position-fixed top-0 ${styles.header}`}>
        <nav>
            <ul>
                <li>
                    <Link to="/" className={styles.itemNav}>Home</Link>
                </li>
                
                <div className={styles.separacao}>|</div>

                <li>
                    <Link to="/login" className={styles.itemNav}>Entrar</Link>
                </li>

                <div className={styles.separacao}>|</div>

                <li>
                    <Link to="/cadastra" className={styles.itemNav}>Cadastrar</Link>
                </li>
            </ul>
        </nav>
    </header>
    )
}
export default Menu