import Authentication from "../AuthenticationGateway/Authentication";

function Cadastra() {
    const situacao: boolean = false
    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <Authentication situacao={situacao}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cadastra;