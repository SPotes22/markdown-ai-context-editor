
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { marked } from 'marked';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import ContextHub from './components/ContextHub';
import { generateContextFromText } from './services/geminiService';
import { saveTextAsFile, saveHtmlAsFile } from './utils/fileUtils';
import { Font } from './types';

const DEFAULT_CONTENT = `# Welcome to the Markdown AI Editor!

This is a simple markdown editor with AI-powered context generation.

## Features

- **Write** in Markdown on the left.
- **Preview** your rendered HTML in the middle.
- **Select** any text and click "Generate Context" on the right.
- **Ask questions** by selecting text like \`$¿What is React?$\` to get answers.

## Try it out!

1.  Select the term "Markdown" above.
2.  Click the **Generate Context** button.
3.  The AI will explain what Markdown is in the right-hand panel.
`;

const App: React.FC = () => {
    const [editorContent, setEditorContent] = useState<string>(DEFAULT_CONTENT);
    const [previewHtml, setPreviewHtml] = useState<string>('');
    const [contextContent, setContextContent] = useState<string>('Select text from the editor and click "Generate Context" to see AI-powered insights here.');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [font, setFont] = useState<Font>(Font.Sans);
    const editorRef = useRef<HTMLTextAreaElement>(null);

    const handleExecuteMarkdown = useCallback(() => {
        setPreviewHtml(marked.parse(editorContent) as string);
    }, [editorContent]);
    
    useEffect(() => {
        handleExecuteMarkdown();
    }, [editorContent, handleExecuteMarkdown]);

    const handleOpenFile = (content: string) => {
        setEditorContent(content);
    };

    const handleSaveFile = () => {
        saveTextAsFile(editorContent, 'markdown-file.md');
    };

    const handleSaveHtml = () => {
        const htmlContent = marked.parse(editorContent) as string;
        saveHtmlAsFile(htmlContent, 'rendered-html.html');
    };
    
    const handleGenerateContext = async () => {
        if (!editorRef.current) return;

        const { selectionStart, selectionEnd, value } = editorRef.current;
        const selectedText = value.substring(selectionStart, selectionEnd);

        if (!selectedText.trim()) {
            setContextContent("Please select some text from the editor first before generating context.");
            return;
        }

        setIsLoading(true);
        setContextContent('');
        try {
            const result = await generateContextFromText(selectedText);
            setContextContent(result);
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setContextContent(`Error generating context: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen p-4 flex flex-col font-sans">
            <header className="mb-4">
                <h1 className="text-3xl font-bold text-center text-cyan-400">Markdown AI Context Editor</h1>
                <p className="text-center text-gray-400">Powered by Gemini</p>
            </header>
            <main className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-4 min-h-0">
                <div className="md:col-span-5 h-full flex flex-col">
                    <EditorPanel
                        ref={editorRef}
                        content={editorContent}
                        onContentChange={setEditorContent}
                        onOpenFile={handleOpenFile}
                        onSaveFile={handleSaveFile}
                        onSaveHtml={handleSaveHtml}
                        onExecuteMarkdown={handleExecuteMarkdown}
                        font={font}
                        onFontChange={setFont}
                    />
                </div>
                <div className="md:col-span-4 h-full flex flex-col">
                    <PreviewPanel htmlContent={previewHtml} />
                </div>
                <div className="md:col-span-3 h-full flex flex-col">
                    <ContextHub
                        context={contextContent}
                        onGenerateContext={handleGenerateContext}
                        isLoading={isLoading}
                    />
                </div>
            </main>
        </div>
    );
};

export default App;

