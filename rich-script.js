
// Initialize the editor
document.addEventListener('DOMContentLoaded', function () {
    // Set initial content
    document.getElementById('editor').innerHTML = '<p>Start typing here...</p>';

    // Add event listeners
    document.getElementById('editor').addEventListener('focus', function () {
        if (this.innerHTML === '<p>Start typing here...</p>') {
            this.innerHTML = '';
        }
    });

    // Add keyboard shortcuts for lists
    document.getElementById('editor').addEventListener('keydown', function (e) {
        // Tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) {
                document.execCommand('outdent', false, null);
            } else {
                document.execCommand('indent', false, null);
            }
        }

        // Ctrl/Cmd + Shift + 7 for numbered list
        if (e.key === '7' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
            e.preventDefault();
            document.execCommand('insertOrderedList', false, null);
        }

        // Ctrl/Cmd + Shift + 8 for bullet list
        if (e.key === '8' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
            e.preventDefault();
            document.execCommand('insertUnorderedList', false, null);
        }
    });
});

// Execute command function
function execCmd(command) {
    document.execCommand(command, false, null);
}

// Execute command with argument function
function execCommandWithArg(command, arg) {
    document.execCommand(command, false, arg);
}

// Image insertion and handling
function insertImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('div');
            img.className = 'resizable-image';
            img.innerHTML = `
                    <img src="${e.target.result}" alt="Inserted image" style="max-width: 100%;">
                    <div class="image-controls">
                        <button onclick="resizeImage(this.parentElement.parentElement, 'small')" class="text-white hover:text-gray-200">
                            <i class="fas fa-compress"></i>
                        </button>
                        <button onclick="resizeImage(this.parentElement.parentElement, 'medium')" class="text-white hover:text-gray-200">
                            <i class="fas fa-arrows-alt-h"></i>
                        </button>
                        <button onclick="resizeImage(this.parentElement.parentElement, 'large')" class="text-white hover:text-gray-200">
                            <i class="fas fa-expand"></i>
                        </button>
                        <button onclick="alignImage(this.parentElement.parentElement, 'left')" class="text-white hover:text-gray-200">
                            <i class="fas fa-align-left"></i>
                        </button>
                        <button onclick="alignImage(this.parentElement.parentElement, 'center')" class="text-white hover:text-gray-200">
                            <i class="fas fa-align-center"></i>
                        </button>
                        <button onclick="alignImage(this.parentElement.parentElement, 'right')" class="text-white hover:text-gray-200">
                            <i class="fas fa-align-right"></i>
                        </button>
                        <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-red-400">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            document.getElementById('editor').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

// Image resize function
function resizeImage(imageContainer, size) {
    const img = imageContainer.querySelector('img');
    switch (size) {
        case 'small':
            img.style.width = '25%';
            break;
        case 'medium':
            img.style.width = '50%';
            break;
        case 'large':
            img.style.width = '100%';
            break;
    }
}

// Image alignment function
function alignImage(imageContainer, alignment) {
    switch (alignment) {
        case 'left':
            imageContainer.style.textAlign = 'left';
            break;
        case 'center':
            imageContainer.style.textAlign = 'center';
            break;
        case 'right':
            imageContainer.style.textAlign = 'right';
            break;
    }
}

// Save content function
function saveContent() {
    const content = document.getElementById('editor').innerHTML;
    localStorage.setItem('editorContent', content);
}

// Load content function
function loadContent() {
    const content = localStorage.getItem('editorContent');
    if (content) {
        document.getElementById('editor').innerHTML = content;
    }
}

// Auto-save every 30 seconds
setInterval(saveContent, 30000);
