import { useState } from "react";
import styles from './Authentication.module.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Props = {
    situacao: boolean
   
}

function Authentication( {situacao}: Props ) {
    const [gmail, setGmail] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [verificar, setVerificar] = useState<boolean>(situacao)
    const [senha, setSenha] = useState<string>('');
    const [loginErro, setLoginErro] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

         try {
            if (verificar) {
                // LOGIN
                const res = await axios.get('https://api-shopping-life.onrender.com/usuarios');
                const usuario = res.data.find((u: any) => u.gmail === gmail && u.senha === senha);
                if (usuario) {
                    localStorage.setItem('usuario_id', usuario.id);
                    localStorage.setItem('usuario_nome', usuario.nome);
                    navigate('/', { replace: true }); 
                } else {
                    setLoginErro("Email ou senha inválidos");
                }
            } else {
                // CADASTRO
                const res = await axios.post('https://api-shopping-life.onrender.com/usuarios', { gmail, senha, nome });
                localStorage.setItem('usuario_id', res.data.id);
                localStorage.setItem('usuario_nome', nome);
                alert("Conta criada com sucesso!");
                navigate('/', { replace: true });
            }
        } catch (err) {
            console.error(err);
            setLoginErro("Erro para Entrar. tente mais tarder!");
        }
    }
    
    return (
        <>
         <section className={`container mt-5 ${styles.containerLogin} p-5 rounded-3`}>
            <div>
                {loginErro && <p className="text-danger text-center ">{loginErro}</p>}
            </div>

            {/* formulario para cadastra ou entrar */}
            <form onSubmit={handleSubmit}>
                <div className={`mb-3`}>
                    {!verificar && (
                        <>
                            <label htmlFor="exampleInputName" className="form-label">Nome</label>
                            <input 
                                type="text" 
                                name="nome" 
                                className="form-control" 
                                onChange={(e) => setNome(e.target.value)} 
                                value={nome} 
                                required 
                                placeholder="Digite seu nome"
                            />
                        </>
                    )}

                    <label htmlFor="exampleInputEmail1" className="form-label">E-mail</label>
                     <input
                         type="email"
                         className="form-control"
                         id="exampleInputEmail1"
                         value={gmail}
                         onChange={(e) => setGmail(e.target.value)}
                         placeholder="Digite seu email"
                         aria-describedby="emailHelp"
                         required
                     />
                </div>
                <div className={`mb-3`}>
                    <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <div className={`mb-3 form-check`}>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        required
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        {verificar ? "Lembrar login?" : "lembra de mim?"}
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Entrar
                </button>
            </form>

            {/* link para entrar ou criar conta */}
            <section className={`container d-flex justify-content-center mt-5`}>
                <p>
                    {verificar ? "Não possui conta?" : "Já possui uma conta?"}
                </p>

                <Link to={verificar ? "/cadastra" : "/login"}>
                    {verificar ? "Crie A sua" : "Entrar"}
               </Link>
            </section>
         </section>
        </>
    )
}
export default Authentication;