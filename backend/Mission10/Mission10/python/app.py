from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # this allows requests from React

import osgit
base_path = os.path.dirname(__file__)

df_content = pd.read_csv(os.path.join(base_path, "content_filtering_recommendations.csv"), index_col=0)


# Content-based recommendations
@app.route("/api/recommend/content/<content_id>", methods=["GET"])
def recommend_content(content_id):
    if content_id not in df_content.columns:
        return jsonify([])
    recommendations = df_content[content_id].sort_values(ascending=False).head(6)[1:].index.tolist()
    return jsonify(recommendations)

# Collaborative recommendations
@app.route("/api/recommend/collab/<user_id>", methods=["GET"])
def recommend_collab(user_id):
    if user_id not in df_collab.columns:
        return jsonify([])
    recommendations = df_collab[user_id].sort_values(ascending=False).head(5).index.tolist()
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)



