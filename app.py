from flask import Flask, render_template, request
from tensorflow.keras.models import load_model
from predict import MakePrediction
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

tom_model = load_model('models/tomato_new.h5')
apple_model = load_model('models/apple_new.h5')

def predict(model, classes):
    image = request.files['image']
    if not image:
        return "No image found"
    else:
        UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
        if not os.path.exists(UPLOAD_FOLDER):
            os.makedirs(UPLOAD_FOLDER)

        image_filename = os.path.join(UPLOAD_FOLDER, image.filename)
        image.save(image_filename)
        return MakePrediction(image_filename, model, classes)

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/result", methods=["POST"])
def Result():
    if request.method == 'POST':
        model = request.form.get('plant')
        if(model == 'tomato'):
            classes = ['Bacterial_spot', 'Early_blight', 'Healthy', 'Late_blight', 'Leaf_Mold', 'Septoria_leaf_spot', 'Target_Spot', 'Tomato_mosaic_virus', 'Tomato_Yellow_leaf_Curl_Virus', 'Two-spotted_spider_mite']
            return render_template('home.html', result=predict(tom_model, classes))
        elif(model == 'apple'):
            classes = ['Apple Scab', 'Black Rot', 'Cedar Apple Rust', 'Healthy']
            return render_template('home.html', result=predict(apple_model, classes))
        else:
            return render_template('home.html', result='Server Error')

@app.errorhandler(404) 
def not_found(e): 
  return render_template("404.html") 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
