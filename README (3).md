# Python Katas API

FastAPI desplegada en AWS Lambda con API Gateway. Proyecto de práctica para DevOps y cloud deployment.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/dictionary/new-entry` | Agregar una palabra al diccionario |
| `GET` | `/dictionary/look/{word}` | Buscar la definición de una palabra |
| `POST` | `/shopping/total` | Calcular el total de un carrito de compras |
| `POST` | `/words/concatenate` | Concatenar una lista de palabras |

La documentación interactiva está disponible en:
```
https://sneclq4j72.execute-api.us-east-2.amazonaws.com/prod/docs
```

## Ejemplos de uso

**Agregar una palabra:**
```bash
curl -X POST https://sneclq4j72.execute-api.us-east-2.amazonaws.com/prod/dictionary/new-entry \
  -H "Content-Type: application/json" \
  -d '{"word": "ephemeral", "definition": "lasting a very short time"}'
```

**Buscar una palabra:**
```bash
curl https://sneclq4j72.execute-api.us-east-2.amazonaws.com/prod/dictionary/look/ephemeral
```

**Calcular total del carrito:**
```bash
curl -X POST https://sneclq4j72.execute-api.us-east-2.amazonaws.com/prod/shopping/total \
  -H "Content-Type: application/json" \
  -d '{"costs": {"apple": 1.50, "bread": 2.00}, "items": ["apple", "apple", "bread"], "tax": 0.10}'
```

**Concatenar palabras:**
```bash
curl -X POST https://sneclq4j72.execute-api.us-east-2.amazonaws.com/prod/words/concatenate \
  -H "Content-Type: application/json" \
  -d '{"words": ["hello", "world", "foo"]}'
```

## Estructura del proyecto

```
├── api.py                  # FastAPI app y endpoints
├── src/
│   ├── dictionary.py       # Lógica del diccionario
│   ├── costs.py            # Lógica del carrito de compras
│   └── concatenate.py      # Lógica de concatenación
├── tests/
│   └── test_api.py         # Tests de los endpoints
├── .github/
│   └── workflows/
│       └── ci-deploy.yml   # CI + deploy automático
├── Dockerfile              # Imagen Docker para desarrollo local
├── requirements.txt
└── README.md
```

## Correr localmente

```bash
# Crear entorno virtual
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Mac/Linux

# Instalar dependencias
pip install -r requirements.txt

# Correr la API
uvicorn api:app --reload
```

La API estará disponible en `http://localhost:8000/docs`.

## Correr con Docker

```bash
docker build -t python-katas .
docker run -p 8000:8000 python-katas
```

## Tests

```bash
pytest
```

Para ver el reporte de cobertura:
```bash
pytest --cov=src --cov-report=term-missing
```

## Arquitectura AWS

```
Cliente → API Gateway (HTTP API) → Lambda (python-katas-lambda) → FastAPI + Mangum
                                                                 ↓
                                                           CloudWatch Logs
```

- **API Gateway:** recibe los requests HTTPS públicos y los reenvía a Lambda
- **Lambda:** ejecuta FastAPI usando Mangum como adaptador ASGI
- **Mangum:** traduce los eventos de Lambda al formato que FastAPI entiende
- **CloudWatch:** almacena los logs automáticamente

## CI/CD

El pipeline de GitHub Actions en `.github/workflows/ci-deploy.yml` corre automáticamente en cada push:

**En rama `dev`:**
- Corre los tests con pytest
- Verifica el estilo con ruff
- Hace un smoke test del servidor

**En rama `main`** (además de lo anterior):
- Empaqueta las dependencias usando la imagen oficial de Lambda
- Construye el ZIP de deployment
- Sube el código a AWS Lambda automáticamente

El deploy solo ocurre si todos los tests pasan.

## Variables y secrets necesarios

Para el deploy automático, configurar estos secrets en GitHub → Settings → Secrets:

| Secret | Descripción |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | Access key del usuario IAM con permisos Lambda |
| `AWS_SECRET_ACCESS_KEY` | Secret key del usuario IAM |

## Recursos AWS

| Recurso | Nombre |
|---------|--------|
| Lambda function | `python-katas-lambda` |
| API Gateway | `python-katas-api` |
| IAM Role | `python-katas-lambda-role-kmr7pite` |
| Región | `us-east-2` (Ohio) |
