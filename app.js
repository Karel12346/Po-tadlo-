// Globální proměnné
let events = [];
let chart = null;

// Inicializace aplikace
document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    initEventListeners();
    updateUI();
});

// Načtení událostí z localStorage
function loadEvents() {
    const stored = localStorage.getItem('eventCounterData');
    if (stored) {
        events = JSON.parse(stored);
    }
}

// Uložení událostí do localStorage
function saveEvents() {
    localStorage.setItem('eventCounterData', JSON.stringify(events));
}

// Inicializace event listenerů
function initEventListeners() {
    document.getElementById('addEventBtn').addEventListener('click', addEvent);
    document.getElementById('eventName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addEvent();
    });

    document.getElementById('chartType').addEventListener('change', updateChart);
    document.getElementById('timePeriod').addEventListener('change', updateUI);

    document.getElementById('searchEvents').addEventListener('input', filterEventsList);
    document.getElementById('filterEvents').addEventListener('change', filterEventsList);

    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importData);
    document.getElementById('clearBtn').addEventListener('click', clearAllData);
}

// Přidání nové události
function addEvent() {
    const input = document.getElementById('eventName');
    const eventName = input.value.trim();

    if (!eventName) {
        alert('Zadejte název události!');
        return;
    }

    const event = {
        id: Date.now(),
        name: eventName,
        timestamp: new Date().toISOString()
    };

    events.push(event);
    saveEvents();
    input.value = '';
    updateUI();

    // Animace úspěchu
    input.style.backgroundColor = '#d1fae5';
    setTimeout(() => {
        input.style.backgroundColor = '';
    }, 300);
}

// Smazání události
function deleteEvent(id) {
    if (confirm('Opravdu chcete smazat tuto událost?')) {
        events = events.filter(e => e.id !== id);
        saveEvents();
        updateUI();
    }
}

// Aktualizace celého UI
function updateUI() {
    updateStats();
    updateChart();
    updateEventsList();
    updateQuickButtons();
    updateFilterOptions();
}

// Aktualizace statistik
function updateStats() {
    const period = document.getElementById('timePeriod').value;
    const filteredEvents = filterEventsByPeriod(events, period);

    document.getElementById('totalEvents').textContent = events.length;

    const uniqueEvents = new Set(events.map(e => e.name));
    document.getElementById('uniqueEvents').textContent = uniqueEvents.size;

    const today = new Date().toDateString();
    const todayEvents = events.filter(e => new Date(e.timestamp).toDateString() === today);
    document.getElementById('todayEvents').textContent = todayEvents.length;
}

// Filtrování událostí podle období
function filterEventsByPeriod(eventsList, period) {
    const now = new Date();

    switch(period) {
        case 'today':
            return eventsList.filter(e => {
                const eventDate = new Date(e.timestamp);
                return eventDate.toDateString() === now.toDateString();
            });

        case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return eventsList.filter(e => new Date(e.timestamp) >= weekAgo);

        case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return eventsList.filter(e => new Date(e.timestamp) >= monthAgo);

        default:
            return eventsList;
    }
}

// Aktualizace grafu
function updateChart() {
    const chartType = document.getElementById('chartType').value;
    const period = document.getElementById('timePeriod').value;
    const filteredEvents = filterEventsByPeriod(events, period);

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('eventChart').getContext('2d');

    if (chartType === 'line') {
        createTimelineChart(ctx, filteredEvents);
    } else {
        createCountChart(ctx, filteredEvents, chartType);
    }
}

// Graf počtu událostí podle typu
function createCountChart(ctx, eventsList, type) {
    const eventCounts = {};

    eventsList.forEach(event => {
        eventCounts[event.name] = (eventCounts[event.name] || 0) + 1;
    });

    const labels = Object.keys(eventCounts);
    const data = Object.values(eventCounts);

    // Generování barev
    const colors = generateColors(labels.length);

    chart = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'Počet výskytů',
                data: data,
                backgroundColor: colors.background,
                borderColor: colors.border,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: type === 'pie' || type === 'doughnut',
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Počet výskytů jednotlivých událostí',
                    font: {
                        size: 16
                    }
                }
            },
            scales: type === 'bar' ? {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            } : {}
        }
    });
}

// Graf časové osy (denní agregace)
function createTimelineChart(ctx, eventsList) {
    // Seskupení událostí podle dnů
    const dailyCounts = {};

    eventsList.forEach(event => {
        const date = new Date(event.timestamp).toLocaleDateString('cs-CZ');
        if (!dailyCounts[date]) {
            dailyCounts[date] = {};
        }
        dailyCounts[date][event.name] = (dailyCounts[date][event.name] || 0) + 1;
    });

    // Získání všech unikátních názvů událostí
    const eventNames = [...new Set(eventsList.map(e => e.name))];
    const dates = Object.keys(dailyCounts).sort((a, b) => {
        return new Date(a.split('.').reverse().join('-')) - new Date(b.split('.').reverse().join('-'));
    });

    // Vytvoření datasetů pro každý typ události
    const colors = generateColors(eventNames.length);
    const datasets = eventNames.map((name, index) => ({
        label: name,
        data: dates.map(date => dailyCounts[date][name] || 0),
        borderColor: colors.border[index],
        backgroundColor: colors.background[index],
        tension: 0.3,
        fill: false
    }));

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Časová osa událostí (po dnech)',
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Generování barev pro graf
function generateColors(count) {
    const baseColors = [
        { bg: 'rgba(79, 70, 229, 0.6)', border: 'rgba(79, 70, 229, 1)' },
        { bg: 'rgba(16, 185, 129, 0.6)', border: 'rgba(16, 185, 129, 1)' },
        { bg: 'rgba(239, 68, 68, 0.6)', border: 'rgba(239, 68, 68, 1)' },
        { bg: 'rgba(245, 158, 11, 0.6)', border: 'rgba(245, 158, 11, 1)' },
        { bg: 'rgba(139, 92, 246, 0.6)', border: 'rgba(139, 92, 246, 1)' },
        { bg: 'rgba(236, 72, 153, 0.6)', border: 'rgba(236, 72, 153, 1)' },
        { bg: 'rgba(6, 182, 212, 0.6)', border: 'rgba(6, 182, 212, 1)' },
        { bg: 'rgba(132, 204, 22, 0.6)', border: 'rgba(132, 204, 22, 1)' }
    ];

    const background = [];
    const border = [];

    for (let i = 0; i < count; i++) {
        const color = baseColors[i % baseColors.length];
        background.push(color.bg);
        border.push(color.border);
    }

    return { background, border };
}

// Aktualizace seznamu událostí
function updateEventsList() {
    const container = document.getElementById('eventsList');
    const searchTerm = document.getElementById('searchEvents').value.toLowerCase();
    const filterValue = document.getElementById('filterEvents').value;

    let filteredEvents = [...events].reverse(); // Nejnovější nahoře

    // Filtrování podle vyhledávání
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(e =>
            e.name.toLowerCase().includes(searchTerm)
        );
    }

    // Filtrování podle typu události
    if (filterValue !== 'all') {
        filteredEvents = filteredEvents.filter(e => e.name === filterValue);
    }

    if (filteredEvents.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>Žádné události k zobrazení</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredEvents.map(event => {
        const date = new Date(event.timestamp);
        const timeStr = date.toLocaleString('cs-CZ');

        return `
            <div class="event-item">
                <div class="event-info">
                    <div class="event-name">${escapeHtml(event.name)}</div>
                    <div class="event-time">${timeStr}</div>
                </div>
                <button class="event-delete" onclick="deleteEvent(${event.id})">
                    🗑️ Smazat
                </button>
            </div>
        `;
    }).join('');
}

// Aktualizace rychlých tlačítek
function updateQuickButtons() {
    const container = document.getElementById('quickButtons');
    const eventNames = [...new Set(events.map(e => e.name))];

    if (eventNames.length === 0) {
        container.innerHTML = '<p style="color: #9ca3af; font-size: 0.9rem;">Rychlá tlačítka se zobrazí po přidání první události</p>';
        return;
    }

    container.innerHTML = eventNames.map(name => `
        <button class="quick-btn" onclick="quickAddEvent('${escapeHtml(name)}')">
            ${escapeHtml(name)}
        </button>
    `).join('');
}

// Rychlé přidání události
function quickAddEvent(name) {
    const event = {
        id: Date.now(),
        name: name,
        timestamp: new Date().toISOString()
    };

    events.push(event);
    saveEvents();
    updateUI();
}

// Aktualizace možností filtru
function updateFilterOptions() {
    const select = document.getElementById('filterEvents');
    const eventNames = [...new Set(events.map(e => e.name))];

    select.innerHTML = '<option value="all">Všechny události</option>' +
        eventNames.map(name => `
            <option value="${escapeHtml(name)}">${escapeHtml(name)}</option>
        `).join('');

    // Aktualizace našeptávače
    const datalist = document.getElementById('eventSuggestions');
    datalist.innerHTML = eventNames.map(name => `
        <option value="${escapeHtml(name)}">
    `).join('');
}

// Filtrování seznamu událostí
function filterEventsList() {
    updateEventsList();
}

// Export dat do JSON
function exportData() {
    if (events.length === 0) {
        alert('Žádná data k exportu!');
        return;
    }

    const dataStr = JSON.stringify(events, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `pocitadlo-udalosti-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Import dat z JSON
function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedEvents = JSON.parse(event.target.result);

            if (!Array.isArray(importedEvents)) {
                throw new Error('Neplatný formát dat');
            }

            if (confirm(`Chcete importovat ${importedEvents.length} událostí? Toto přidá nové události k existujícím.`)) {
                events = [...events, ...importedEvents];
                saveEvents();
                updateUI();
                alert('Data byla úspěšně importována!');
            }
        } catch (error) {
            alert('Chyba při importu dat: ' + error.message);
        }
    };

    reader.readAsText(file);
    e.target.value = ''; // Reset input
}

// Smazání všech dat
function clearAllData() {
    if (confirm('Opravdu chcete smazat VŠECHNA data? Tuto akci nelze vrátit zpět!')) {
        if (confirm('Jste si naprosto jistí? Všechna data budou navždy ztracena!')) {
            events = [];
            saveEvents();
            updateUI();
            alert('Všechna data byla smazána.');
        }
    }
}

// Escapování HTML pro prevenci XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
