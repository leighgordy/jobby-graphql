# jobby-graphql
A simple graphql express service that will let me experiment on frontend frameworks. 

When served the application can be found on [http://localhost:3000/graphql](http://localhost:3000/graphql).

## instructions
* `npm run serve` - run the application on http://localhost:3000/graphql
* `npm run lint` - runs the linter
* `npm run test` - runs the jest tests
* `npm run coverage` - runs the jest coverage

## Example Graphql Queries
### retrieve 
```
{
    job(id: 123){
        id,
        title,
        description,
        email,
        created
    }
}
```
### retrieve all
```
{
    jobs{
        id,
        title,
        description,
        email,
        created
    }
}
```
### update 
```
mutation{
    updateJob(
        id:123,
        input: {
            title: "A updated Title",
            description: "A updated decription",
            email: "fake@email.com",
        }
    ) {
        id,
        title,
        description,
        email,
        created
    }
}
```
### create
```
mutation{
    createJob(input: {
        title: "A new Title",
        description: "Anew decription",
        email: "fake@email.com",
    }) {
        id,
        title,
        description,
        email,
        created
    }
}
```
### delete
```
mutation{
  deleteJob(
    id:123, 
  )
}
```
