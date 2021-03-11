FROM python:3.8

RUN pip install pipenv 

COPY ./ ./

RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

ENTRYPOINT ["pipenv", "run", "uvicorn", "app.main:app"]

CMD ["--host", "0.0.0.0", "--port", "8000"]
