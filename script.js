 const selectedTags = [];
        const chartData = {
            labels: [],
            datasets: [{
                label: 'Mood Score',
                data: [],
                fill: false,
                borderColor: '#d14b8f',
                tension: 0.1
            }]
        };

        const moodChart = new Chart(document.getElementById('moodChart'), {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        suggestedMin: 0,
                        suggestedMax: 10
                    }
                }
            }
        });

        function addTag(tag) {
            if (!selectedTags.includes(tag)) {
                selectedTags.push(tag);
                document.getElementById('selectedTags').innerText = selectedTags.map(t => `#${t}`).join(' ');
            }
        }

        document.querySelectorAll('#emojiPicker span').forEach(emoji => {
            emoji.addEventListener('click', () => {
                document.getElementById('moodScore').value = emoji.dataset.score;
            });
        });

        function saveEntry() {
            const day = document.getElementById('day').value;
            const mood = document.getElementById('moodScore').value;
            const reflection = document.getElementById('reflection').value;

            if (!day || !mood || !reflection) {
                alert('Please complete all fields!');
                return;
            }

            // Add to chart
            chartData.labels.push(day);
            chartData.datasets[0].data.push(Number(mood));
            moodChart.update();

            alert('Reflection saved successfully!');
            document.getElementById('day').value = '';
            document.getElementById('moodScore').value = '';
            document.getElementById('reflection').value = '';
            selectedTags.length = 0;
            document.getElementById('selectedTags').innerText = '';
        }