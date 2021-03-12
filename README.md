# Challenge one

## Docker
### Running in containers
* Set up the environment variables. Follow `.env.example` in the directories as an example
* Run `docker-compose up`

```
                Browser
                 ▲  ▲
                 │  │
                 │  │
         ┌───────┘  └────────┐
         ▼                   ▼
    ┌───────────┐      ┌───────────┐
    │(Frontend) │      │ (Backend) │
    │           │      │           │
    │   Nginx   │      │  Uvicorn  │
    │           │      │           │
    │    80     │      │    8000   │
    └───────────┘      └───────────┘
                             ▲
                             │
                             ▼
                       ┌───────────┐
                       │(Database) │
                       │           │
                       │ Postgres  │
                       │           │
                       │   5432    │
                       └───────────┘
```
