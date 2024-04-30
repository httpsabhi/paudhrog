import numpy as np
import tensorflow as tf
from PIL import Image

def MakePrediction(image_path, model, classes):
    img_open = Image.open(image_path)
    img_open = img_open.resize((256, 256))
    
    img_arr = np.array(img_open)
    
    img_arr = tf.keras.applications.densenet.preprocess_input(img_arr)
    img_arr = np.array([img_arr])
    
    pred = model.predict(img_arr)
    max_element = float(np.max(pred)*100) 
    print(pred)
    print(max_element)
    category = classes[np.argmax(pred)]
    return category, max_element
