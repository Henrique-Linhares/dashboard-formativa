const API_NUVEM = "https://api.thingspeak.com/channels/3305472/feeds.json?api_key=ONMQFXRGT1IVYGCT&results=10"; 
const API_MYSQL = "http://localhost:5050/dadossql";

const tbodyNuvem = document.querySelector(".table-nuvem");
const tbodySql = document.querySelector(".table-sql");
const btn = document.querySelector(".btn-leitura");
const ultimaTemperatura = document.querySelector(".ultima-temperatura");
const ultimaUmidade = document.querySelector(".ultima-umidade");
const quantidadeDisplay = document.querySelector(".quantidade");

async function atualizaTableNuvem() {
    try {
        const response = await fetch(API_NUVEM);
        const data = await response.json();
        console.log(data);
        tbodyNuvem.innerHTML = "";
        
        if (data.feeds && data.feeds.length > 0) {
            const ultimoRegistro = data.feeds[data.feeds.length - 1];
            
            ultimaTemperatura.textContent = `${ultimoRegistro.field1 || '0'}°C`;
            ultimaUmidade.textContent = `${ultimoRegistro.field2 || '0'}%`;
            quantidadeDisplay.innerHTML = `${data.feeds.length}`; 
        }

        data.feeds.forEach(dados => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${dados.entry_id || '--'}</td>
                <td>${dados.created_at || '--'}</td>
                <td>${dados.entry_id || '--'}</td>
                <td>${dados.field1 || '°C'}°C</td>
                <td>${dados.field2 || '%'}%</td>
            `;
            tbodyNuvem.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao buscar os dados do ThingSpeak:", error);
    }
}

async function atualizaTableSql() {
    try {
        const response = await fetch(API_MYSQL);
        const data = await response.json();
        console.log(data);
        tbodySql.innerHTML = ""; 



        data.forEach(dados => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${dados.id}</td>
                <td>${dados.entry}</td>
                <td>${dados.data_hora}</td>
                <td>${dados.temperatura}°C</td>
                <td>${dados.umidade}%</td>
            `;
            tbodySql.appendChild(tr);
        });
    } catch (error) {
        console.error("Erro ao buscar os dados do MySQL:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    atualizaTableNuvem();
    atualizaTableSql();

    btn.addEventListener('click', async () => {
        btn.textContent = "Carregando...";
        btn.disabled = true;

        await Promise.all([atualizaTableNuvem(), atualizaTableSql()]);

        btn.textContent = "Nova Leitura";
        btn.disabled = false;
    });

});