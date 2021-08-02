import express from 'express'
import { connect } from 'couchbase'

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
	try {
		const cluster = await connect('couchbase://db', {
			username: 'Administrator',
			password: 'Password',
			queryTimeout: 5000
		})

		const query = `
		SELECT META(\`things\`).id, name FROM app._default.\`things\`
		WHERE name=$1 AND type=$2
		`;

		// readOnly = true causes the query to time out if it doesn't find any documents
		const options = { parameters: ['thing', 'none'], readOnly: true }

		let result = await cluster.query(query, options)
		res.send("Result: " + JSON.stringify(result))
	} catch(error) {
		res.send('Error: ' + error)
	}
})

app.listen(port, () => console.log(`Listening on port ${port}...`))