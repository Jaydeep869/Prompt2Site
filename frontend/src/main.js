import './firebase-auth.js';

document.addEventListener("DOMContentLoaded", () => {
  async function generateWebsite() {
    const prompt = document.getElementById("prompt").value;
    const output = document.getElementById("output");
    console.log("generating code");

    try {
      const response = await fetch("https://prompt2site-1.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unknown error");
      }

      const { html, css, js } = result;

      console.log(html, css, js);

      updatePreview(html, css, js);
      displayCode(html, css, js);

      const token = localStorage.getItem("token");
      fetch("https://prompt2site-1.onrender.com/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ html, css, js }),
      });
    } catch (err) {
      console.error(err);
      output.textContent = `Error generating code: ${err.message}`;
    }
  }

  document
    .querySelector(".generatebtn")
    .addEventListener("click", generateWebsite);

  function displayCode(html, css, js) {
    document.querySelector(".html-code").textContent = html;
    document.querySelector(".css-code").textContent = css;
    document.querySelector(".js-code").textContent = js;
  }
  function updatePreview(html, css, js) {
     html = html
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '');

  const fullContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>${css}</style>
    </head>
    <body>
      ${html}
      <script>${js}<\/script>
    </body>
    </html>
  `;

    const iframe = document.getElementById("live-preview");
    if (iframe) {
      iframe.srcdoc = fullContent;
    } else {
      console.error("Iframe with ID 'live-preview' not found.");
    }
  }

  function downloadZip(html, css, js) {
    const zip = new JSZip();
    zip.file("index.html", html);
    zip.file("style.css", css);
    zip.file("script.js", js);

    zip.generateAsync({ type: "blob" }).then((content) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(content);
      a.download = "generated-website.zip";
      a.click();
    });
  }
  
  document.querySelector(".downloadbtn").addEventListener("click", () => {
    const html = document.querySelector(".html-code").textContent.trim();
    const css = document.querySelector(".css-code").textContent.trim();
    const js = document.querySelector(".js-code").textContent.trim();

    if (!html && !css && !js) {
      alert(
        "There’s no code to download. Please generate or load a project first."
      );
      return;
    }

    downloadZip(html, css, js);
  });

  document.querySelector(".savebtn").addEventListener("click", async () => {
    const html = document.querySelector(".html-code").textContent.trim();
    const css = document.querySelector(".css-code").textContent.trim();
    const js = document.querySelector(".js-code").textContent.trim();

    if (!html && !css && !js) {
      alert("Please generate a project before trying to save.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to save your project.");
      return;
    }

    try {
      const response = await fetch("https://prompt2site-1.onrender.com/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ html, css, js }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong while saving.");
      }

      alert(result.message || "Project saved successfully.");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save project: " + error.message);
    }
  });

  async function loadHistory() {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found. Skipping history load.");
      return;
    }

    try {
      const res = await fetch("https://prompt2site-1.onrender.com/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const history = await res.json();

      const historyContainer = document.querySelector(".projecthistory");
      if (!historyContainer) {
        console.warn("No .projecthistory element found in DOM.");
        return;
      }

      historyContainer.innerHTML = "";

      history.forEach((project, i) => {
        const item = document.createElement("div");
        item.className = "history-item";

        const title = document.createElement("span");
        title.className = "history-title";
        title.textContent = `Project ${i + 1}`;

      
        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑️";
        delBtn.className = "delete-btn";

        title.addEventListener("click", () => {
          displayCode(project.html, project.css, project.js);
          updatePreview(project.html, project.css, project.js);

          document.querySelector(".code").classList.add("hide");
          document.querySelector(".view").classList.remove("hide");
          document.querySelector(".h3m").classList.add("hide");
          document.querySelector(".ifm").classList.remove("hide");
        });

        delBtn.addEventListener("click", async (e) => {
          e.stopPropagation(); 
          const confirmed = confirm(
            "Are you sure you want to delete this project?"
          );
          if (!confirmed) return;

          try {
            const deleteRes = await fetch(
              `https://prompt2site-1.onrender.com/api/history/${project._id}`,
              {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (!deleteRes.ok) throw new Error("Delete failed");

            alert("Project deleted");
            loadHistory();
          } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete project");
          }
        });

        item.appendChild(title);
        item.appendChild(delBtn);
        historyContainer.appendChild(item);
      });
    } catch (err) {
      console.error("Failed to load history", err.message);
    }
  }

  window.addEventListener("DOMContentLoaded", loadHistory); 
  window.loadHistory = loadHistory;

});

document.querySelector(".viewbtn").addEventListener("click", () => {
  document.querySelector(".code").classList.add("hide");
  document.querySelector(".view").classList.remove("hide");
});

document.querySelector(".codebtn").addEventListener("click", () => {
  document.querySelector(".code").classList.remove("hide");
  document.querySelector(".view").classList.add("hide");
});

document.querySelector(".generatebtn").addEventListener("click", () => {
  document.querySelector(".h3m").classList.add("hide");
  document.querySelector(".ifm").classList.remove("hide");
});

document.querySelector(".incode1").addEventListener("click", () => {
  document.querySelector(".css-code").classList.add("hide");
  document.querySelector(".js-code").classList.add("hide");
  document.querySelector(".html-code").classList.remove("hide");
});

document.querySelector(".incode2").addEventListener("click", () => {
  document.querySelector(".css-code").classList.remove("hide");
  document.querySelector(".js-code").classList.add("hide");
  document.querySelector(".html-code").classList.add("hide");
});
document.querySelector(".incode3").addEventListener("click", () => {
  document.querySelector(".css-code").classList.add("hide");
  document.querySelector(".js-code").classList.remove("hide");
  document.querySelector(".html-code").classList.add("hide");
});
document.querySelectorAll('.history-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.history-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.leftcontainer').classList.toggle('active');
    document.querySelector('.mobile-overlay').classList.toggle('active');
});

document.querySelector('.mobile-overlay').addEventListener('click', function() {
    this.classList.remove('active');
    document.querySelector('.leftcontainer').classList.remove('active');
});

