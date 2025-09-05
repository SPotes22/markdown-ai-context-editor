
const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const saveTextAsFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    downloadFile(blob, filename);
};

const createHtmlTemplate = (bodyContent: string): string => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rendered Markdown</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; }
        pre { background-color: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
    </style>
</head>
<body>
    ${bodyContent}
</body>
</html>
    `;
};

export const saveHtmlAsFile = (htmlContent: string, filename: string) => {
    const fullHtml = createHtmlTemplate(htmlContent);
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    downloadFile(blob, filename);
};
