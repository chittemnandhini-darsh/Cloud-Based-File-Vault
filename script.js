const API_URL = "http://localhost:5000";


// Upload file

document
    .getElementById("uploadForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const fileInput =
            document.getElementById("fileInput");

        const file =
            fileInput.files[0];

        if (!file) {

            return;

        }

        const formData =
            new FormData();

        formData.append("file", file);


        try {

            const response =
                await fetch(
                    `${API_URL}/api/upload`,
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const result =
                await response.json();


            document.getElementById("message")
                .textContent =
                result.message;


            fileInput.value = "";


            loadFiles();


        } catch (error) {

            document.getElementById("message")
                .textContent =
                "Unable to connect to server.";

            console.error(error);

        }

    });


// Load files

async function loadFiles() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/files`
            );


        const files =
            await response.json();


        const fileList =
            document.getElementById("fileList");


        fileList.innerHTML = "";


        if (files.length === 0) {

            fileList.innerHTML =
                "<p>No files uploaded yet.</p>";

            return;

        }


        files.forEach(file => {

            const card =
                document.createElement("div");

            card.className = "file-card";


            const size =
                formatFileSize(file.size);


            card.innerHTML = `

                <div>

                    <div class="file-name">
                        📄 ${file.name}
                    </div>

                    <div class="file-size">
                        ${size}
                    </div>

                </div>

                <div class="actions">

                    <button
                        class="download"
                        onclick="downloadFile('${encodeURIComponent(file.name)}')">
                        Download
                    </button>

                    <button
                        class="delete"
                        onclick="deleteFile('${encodeURIComponent(file.name)}')">
                        Delete
                    </button>

                </div>

            `;


            fileList.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        document.getElementById("fileList")
            .innerHTML =
            "<p>Unable to load files.</p>";

    }

}


// Download file

function downloadFile(filename) {

    window.open(
        `${API_URL}/api/download/${filename}`,
        "_blank"
    );

}


// Delete file

async function deleteFile(filename) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this file?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/files/${filename}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        alert(result.message);


        loadFiles();


    } catch (error) {

        alert("Unable to delete file.");

        console.error(error);

    }

}


// File size

function formatFileSize(bytes) {

    if (bytes === 0) {

        return "0 Bytes";

    }


    const units =
        [
            "Bytes",
            "KB",
            "MB",
            "GB"
        ];


    const i =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        (bytes / Math.pow(1024, i))
        .toFixed(2)
        + " "
        + units[i]
    );

}


// Load files when page opens

loadFiles();