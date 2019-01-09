const ONE_PROJECT_BODY = [{
	"id": "1",
	"titulo": "Testeo",
	"descripcion": "Testeroni",
	"fechaInicio": "2018-12-11T23:00:00.000Z",
	"fechaFin": "2018-12-12T23:00:00.000Z",
	"organismo": "ETSII",
	"investigadorResponsable": "1",
	"investigadores": ["2, 3"],
	"presupuesto": "1",
	"estado": "Concedido"
}]

module.exports = {
    getProject: {
        state: 'it has one project',
        uponReceiving: 'a request to retrieve a specific project',
        withRequest: {
            method: 'GET',
            path: '/api/v1/proyects/1'
        },
        willRespondWith: {
            status: 200,
            body: ONE_PROJECT_BODY
        }
    }
}