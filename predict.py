import numpy as np
import tensorflow as tf
from PIL import Image

def MakePrediction(image_path, model, classes):
    img_open = Image.open(image_path)
    img_open = img_open.resize((256, 256))
    
    img_arr = np.array(img_open)
    
    # Preprocess the image array as needed by your model
    img_arr = tf.keras.applications.densenet.preprocess_input(img_arr)
    img_arr = np.array([img_arr])
    
    # Make predictions using the model
    pred = model.predict(img_arr)
    
    # Get the predicted category
    category = classes[np.argmax(pred)]
    
    return category
