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
    const verificar = situacao
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
                const res = await axios.post('http://localhost:3000/usuarios', { gmail, senha, nome });
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
         <section className={`container mt-5 ${styles.containerLogin} p-5`}>
            <div className="mb-4">
                <h2 className="text-center mb-4" style={{ color: 'var(--cor-texto)', fontWeight: 700, fontSize: '28px' }}>
                    {verificar ? 'Bem-vindo de volta!' : 'Criar conta'}
                </h2>
                {loginErro && (
                    <div className="alert alert-danger text-center" role="alert" style={{ 
                        borderRadius: '12px', 
                        border: 'none',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#dc2626',
                        padding: '12px'
                    }}>
                        {loginErro}
                    </div>
                )}
            </div>

            {/* formulario para cadastra ou entrar */}
            <form onSubmit={handleSubmit}>
                <div className={`mb-4`}>
                    {!verificar && (
                        <>
                            <label htmlFor="exampleInputName" className="form-label" style={{ 
                                fontWeight: 600, 
                                color: 'var(--cor-texto)',
                                marginBottom: '8px',
                                display: 'block'
                            }}>Nome</label>
                            <input 
                                type="text" 
                                name="nome" 
                                className="form-control" 
                                onChange={(e) => setNome(e.target.value)} 
                                value={nome} 
                                required 
                                placeholder="Digite seu nome"
                                style={{
                                    borderRadius: '12px',
                                    border: '2px solid #e5e7eb',
                                    padding: '12px 16px',
                                    fontSize: '15px',
                                    transition: 'all 0.2s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--cor-principal)'}
                                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                            />
                        </>
                    )}

                    <label htmlFor="exampleInputEmail1" className="form-label" style={{ 
                        fontWeight: 600, 
                        color: 'var(--cor-texto)',
                        marginBottom: '8px',
                        marginTop: '16px',
                        display: 'block'
                    }}>E-mail</label>
                     <input
                         type="email"
                         className="form-control"
                         id="exampleInputEmail1"
                         value={gmail}
                         onChange={(e) => setGmail(e.target.value)}
                         placeholder="Digite seu email"
                         aria-describedby="emailHelp"
                         required
                         style={{
                            borderRadius: '12px',
                            border: '2px solid #e5e7eb',
                            padding: '12px 16px',
                            fontSize: '15px',
                            transition: 'all 0.2s ease'
                         }}
                         onFocus={(e) => e.target.style.borderColor = 'var(--cor-principal)'}
                         onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                     />
                </div>
                <div className={`mb-4`}>
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{ 
                        fontWeight: 600, 
                        color: 'var(--cor-texto)',
                        marginBottom: '8px',
                        display: 'block'
                    }}>Senha</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        style={{
                            borderRadius: '12px',
                            border: '2px solid #e5e7eb',
                            padding: '12px 16px',
                            fontSize: '15px',
                            transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--cor-principal)'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                </div>
                <div className={`mb-4 form-check`}>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        required
                        style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            accentColor: 'var(--cor-principal)'
                        }}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1" style={{
                        marginLeft: '8px',
                        color: 'var(--cor-texto-secundario)',
                        cursor: 'pointer'
                    }}>
                        {verificar ? "Lembrar login?" : "Lembrar de mim?"}
                    </label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    style={{
                        background: 'var(--gradiente-principal)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '14px',
                        fontSize: '16px',
                        fontWeight: 600,
                        boxShadow: 'var(--sombra-media)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--sombra-forte)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'var(--sombra-media)';
                    }}
                >
                    {verificar ? 'Entrar' : 'Criar conta'}
                </button>
            </form>

            {/* link para entrar ou criar conta */}
            <section className={`container d-flex justify-content-center align-items-center gap-2 mt-4`}>
                <p style={{ margin: 0, color: 'var(--cor-texto-secundario)' }}>
                    {verificar ? "Não possui conta?" : "Já possui uma conta?"}
                </p>

                <Link 
                    to={verificar ? "/cadastra" : "/login"}
                    style={{
                        color: 'var(--cor-principal)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                    {verificar ? "Crie a sua" : "Entrar"}
               </Link>
            </section>
         </section>
        </>
    )
}
export default Authentication;