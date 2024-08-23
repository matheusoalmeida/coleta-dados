let selectedPlayer = null;
let selectedAction = null;

document.addEventListener('DOMContentLoaded', (event) => {
    // Carregar dados do localStorage ao carregar a página
    loadData();
});

function selectPlayer(playerNumber) {
    selectedPlayer = playerNumber;
    document.querySelectorAll('.player-buttons button').forEach(button => {
        button.style.backgroundColor = button.id === `player${playerNumber}` ? '#777' : '#555';
    });
}

function selectAction(action) {
    selectedAction = action;
    document.querySelectorAll('.action-buttons button').forEach(button => {
        button.style.backgroundColor = button.textContent.toLowerCase() === action ? '#777' : '#555';
    });
}

function addData() {
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;

    if (!date || !location || !team1 || !team2) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (selectedPlayer === null) {
        alert('Selecione um jogador.');
        return;
    }

    if (selectedAction === null) {
        alert('Selecione uma ação.');
        return;
    }

    const playerButton = document.getElementById(`player${selectedPlayer}`);
    const playerName = playerButton.textContent;

    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    row.insertCell(0).textContent = date;
    row.insertCell(1).textContent = location;
    row.insertCell(2).textContent = team1;
    row.insertCell(3).textContent = team2;
    row.insertCell(4).textContent = playerName;
    row.insertCell(5).textContent = selectedAction;

    // Salvar os dados no localStorage
    saveData();
}

function exportCSV() {
    const rows = Array.from(document.querySelectorAll('table tr'));
    const csvContent = rows.map(row => Array.from(row.querySelectorAll('td, th')).map(cell => `"${cell.textContent}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dados_jogo.csv';
    link.click();
}

function saveData() {
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;

    const tableData = Array.from(document.querySelectorAll('#dataTable tbody tr')).map(row => {
        return Array.from(row.querySelectorAll('td')).map(cell => cell.textContent);
    });

    const dataToSave = {
        date,
        location,
        team1,
        team2,
        tableData
    };

    localStorage.setItem('gameData', JSON.stringify(dataToSave));
}

function loadData() {
    const savedData = localStorage.getItem('gameData');
    
    if (savedData) {
        const data = JSON.parse(savedData);

        document.getElementById('date').value = data.date || '';
        document.getElementById('location').value = data.location || '';
        document.getElementById('team1').value = data.team1 || '';
        document.getElementById('team2').value = data.team2 || '';

        const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

        data.tableData.forEach(rowData => {
            const row = table.insertRow();
            rowData.forEach(cellData => {
                row.insertCell().textContent = cellData;
            });
        });
    }
}

function clearData() {
    // Limpar campos de entrada
    document.getElementById('date').value = '';
    document.getElementById('location').value = '';
    document.getElementById('team1').value = '';
    document.getElementById('team2').value = '';

    // Limpar a tabela
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }

    // Limpar o localStorage
    localStorage.removeItem('gameData');

    // Resetar a seleção dos botões
    document.querySelectorAll('.player-buttons button').forEach(button => {
        button.style.backgroundColor = '#555';
    });

    document.querySelectorAll('.action-buttons button').forEach(button => {
        button.style.backgroundColor = '#555';
    });

    // Resetar as variáveis de seleção
    selectedPlayer = null;
    selectedAction = null;
}
