from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
from predict import MakePrediction
from flask_cors import CORS
import os
import tensorflow as tf
tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)

app = Flask(__name__)
CORS(app)

app.tom_model = load_model('models/tomato_new.h5')
apple_model = load_model('models/apple_new.h5')
app.wheat_model = load_model('models/wheat_new.keras')
cherry_model = load_model('models/cherry.keras')
peach_model = load_model('models/peach.keras')
app.grape_model = load_model('models/grapes.keras')

def predict(model, classes):
    image = request.files.get('image')
    if not image:
        return "No image found", 0
    else:
        UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
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
        if model in ('tomato', 'apple', 'wheat', 'cherry', 'grape', 'peach'):
            if(model == 'tomato'):
                classes = ['Bacterial_spot', 'Early_blight', 'Healthy', 'Late_blight', 'Leaf_Mold', 'Septoria_leaf_spot', 'Target_Spot', 'Tomato_mosaic_virus', 'Tomato Yellow leaf Curl Virus', 'Two-spotted_spider_mite']
                result=predict(app.tom_model, classes)
            elif(model == 'apple'):
                classes = ['Apple Scab', 'Black Rot', 'Cedar Apple Rust', 'Healthy']
                result=predict(apple_model, classes)
            elif(model == 'wheat'):
                classes = ['Brown Rust', 'Healthy', 'Yellow Rust']
                result=predict(app.wheat_model, classes)
            elif(model == 'cherry'):
                classes = ['Cherry Powdery mildew', 'Cherry healthy']
                result=predict(cherry_model, classes)
            elif(model == 'grape'):
                classes = ['Black Rot', 'Esca (Black Measles)', 'Leaf Blight (Isariopsis Leaf Spot)', 'Healthy']
                result=predict(app.grape_model, classes)
            elif(model == 'peach'):
                classes = ['Bacterial Spot', 'Healthy']
                result=predict(peach_model, classes)
            else:
                result=("Server Error", 0)
            return jsonify(result=result)
        elif(model == 'select'):
            return jsonify(result=('Select the plant', 0))
        else:
            return jsonify(result=('No model found', 0))
        
# PaudhLearn
@app.route('/paudhlearn')
def paudhlearn():
    return render_template('paudhlearn.html')

@app.errorhandler(404) 
def not_found(e): 
  return render_template("404.html") 

# if __name__ == '__main__':
#     app.run(debug=True)
