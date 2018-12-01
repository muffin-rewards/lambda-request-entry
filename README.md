# AWS Lambda: Request Entry

Publishes SNS message.

`requires authorization token`

## Enviroment variables

* `SNS_TOPIC` that the lamba should publish to.

## Responses

### 500, 403
### 202
```
{
  "status": Number
}
```

## Deployment
Deploy with `npm run deploy:{env}`.
