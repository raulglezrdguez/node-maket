# Market web service api

## Install

- Clone or download repo.
- Inside folder. With npm

```
npm i
```

With yarn

```
yarn
```

## Run

- With npm

```
npm start
```

With yarn

```
yarn start
```

## Postman tests

### POST: http://localhost:4000/markets

- Body - raw - JSON

```
{
    "id": 1,
    "symbol": "a added",
    "name": "a added",
    "country": "a ",
    "industry": "a",
    "ipoYear": 20,
    "marketCap": 10,
    "sector": "12h a",
    "volume": 10,
    "netChange": 0,
    "netChangePercent": 5,
    "lastPrice": 30
}
```

### POST: http://localhost:4000/markets/bulk

- Body - raw - JSON

```
{
    "bulk": [
        {
            "id": "1",
            "symbol": "efg",
            "name": "efg",
            "country": "efg",
            "industry": "efg",
            "ipoYear": 10,
            "marketCap": 0,
            "sector": "12g",
            "volume": 0,
            "netChange": 20,
            "netChangePercent": 0,
            "lastPrice": 30
        }
    ]
}
```

### PATCH: http://localhost:4000/markets/{id}

- Body - raw - none: returns the same market
- Body - raw - JSON: you can change the market fields you need

```
{
    "symbol": "a changed",
    "name": "a changed",
    "country": "a changed"
}
```

- Returns the same market; "a" is not a market field

```
{"a": 10}
```

- Returns the same market

```
{}
```

### PUT: http://localhost:4000/markets/{id}

#### if {id} exists patch market else post market

### DELETE: http://localhost:4000/markets/{id}

#### if {id} exists delete market else error

### GET: http://localhost:4000/markets/{id}

#### if {id} exists return the market else error

### GET: http://localhost:4000/markets/?page={page}&limit={limit}...

#### Optional query parameters

- page: minimum value 0
- limit: minimum value 1
- sort_by: a valid field, for example: id
- sort_order: asc or desc
- pdf: true or false

#### Default query parameters

- page: 0
- limit: 10
- sort_by: id
- sort_order: asc
- pdf: false
