from flask import Flask, jsonify, render_template
import requests
from flask_cors import CORS
import random
import time 
from connectDb import conectar
from datetime import datetime, timezone
import threading

app = Flask(__name__)
CORS(app)


API_KEY = "ONMQFXRGT1IVYGCT"
channel_id = "3305472"
numero_de_leituras = 10

def salvar_banco(temperatura, umidade, entry):
    agora = datetime.now(timezone.utc)
    data_hora = agora.strftime("%Y-%m-%dT%H:%M:%SZ")
    
    conexao = conectar()
    cursor = conexao.cursor()

    cursor.execute(
        "INSERT INTO dados (data_hora, temperatura, umidade, entry)  VALUES ( %s, %s, %s, %s)",
        (data_hora, temperatura, umidade, entry)
    )

    conexao.commit()

    cursor.close()
    conexao.close()
    print("Salvo no banco de dados")

def enviar_dados(temperatura, umidade):
    
    url = f"https://api.thingspeak.com/update?api_key={API_KEY}&field1={temperatura}&field2={umidade}"
    
    resposta = requests.get(url)
    
    print("Temperatura:", temperatura, "°C")
    print("Umidade:", umidade, "%")
    
    print("Resposta da API:", resposta.text)

    entry = int(resposta.text)

    if (entry > 0 ):
        salvar_banco(temperatura, umidade, entry)
    else:
        print("Erro ao enviar dados ao thingSpeak")
    
    print("-------------------------------")

def gerar_dados():
    while True:
        temperatura = round(random.uniform(20, 30), 2)
        umidade = round(random.uniform(50, 70), 2)
        
        enviar_dados(temperatura, umidade)
        
        time.sleep(15)

#rota para a pagina inicial
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dadossql")
def get_dados():
    
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)
    
    cursor.execute("SELECT * from dados;")
    
    dados = cursor.fetchall()

    cursor.close()
    conexao.close()
    
    print(jsonify(dados))
    return jsonify(dados)

if __name__ == "__main__":
    t = threading.Thread(target=gerar_dados, daemon=True) 
    t.start()
    app.run(host="0.0.0.0", port=5050, debug=True, use_reloader=False)
    


    
    
