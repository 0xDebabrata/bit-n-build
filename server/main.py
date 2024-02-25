from fastapi import FastAPI
from model import generate_prediction
import tensorflow.keras.models import load_model

model = tf.keras.models.load_model('outputname.h5')

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/predict")
def read_item(forecast_input: list[list[float]]):
    results = generate_prediction(forecast_input)
    return results
