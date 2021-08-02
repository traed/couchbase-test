This repo demonstrates an error with Couchbase 7.0 (running in docker) and the Node SDK version 3.2.0.

When running an N1QL query agains a collection and specifying readOnly = true in the query options, the query will time out if it doesn't find any document.

To replicate:
1. Setup couchbase with the default options
2. Create a bucket called "app"
3. Create a collection called "things"
4. Create a document like this:
```
{
	"name": "thing1",
	"type": "whatever"
}
```
5. Add an index to things.name
6. Start the server with `docker-compose up` and go to localhost:3000. You should get a timeout error.
7. Change readOnly to false in index.js and reload the page. You should now get a result with an empty "rows" array.