### Technologies used
1) Expressjs
2) Docker
3) Kubernetes
4) NATS (event bus)
5) minikube (run Kubernetes locally)
6) skaffold (automate deployment locally)

### Setup project
1) Start minikube
```
minikube start --profile=minikube
```
2) Deploy microservices
```
skaffold dev
```

### How to setup host locally
1) This project is using order.dev as host (refer to ingress-srv.yaml)
2) Get minikube IP address with the following command
```
minikube ip
```
3) Add it to `/etc/hosts`
```
example: 172.17.0.2	order.dev
```

### Order Application API endpoints

1) Create an order
```
POST /v1/orders

example payload:
{
    "status": "created",
    "amount": 12.10,
    "customerId": 6
}
```
2) Cancel an order
```
POST /v1/orders/cancel/:orderId
```
3) Check order status
```
GET /v1/orders/:orderId/status
```
