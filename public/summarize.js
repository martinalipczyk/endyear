async function summarizeNotes() {
    const noteInput = document.getElementById('noteInput').value;
    const summaryOutput = document.getElementById('summaryOutput');

    if (noteInput.trim() === "") {
        summaryOutput.textContent = "Please enter some notes to summarize.";
        return;
    }

    summaryOutput.textContent = "Summarizing...";

    try {
        const response = await fetch('http://localhost:3001/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: noteInput }),
        });

        const data = await response.json();
        summaryOutput.textContent = data.summary;
    } catch (error) {
        summaryOutput.textContent = "Error summarizing the notes. Please try again.";
    }
}