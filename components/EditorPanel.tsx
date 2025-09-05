
import React, { forwardRef } from 'react';
import { Font } from '../types';

interface EditorPanelProps {
    content: string;
    onContentChange: (content: string) => void;
    onOpenFile: (content: string) => void;
    onSaveFile: () => void;
    onSaveHtml: () => void;
    onExecuteMarkdown: () => void;
    font: Font;
    onFontChange: (font: Font) => void;
}

const EditorPanel = forwardRef<HTMLTextAreaElement, EditorPanelProps>(
    ({ content, onContentChange, onOpenFile, onSaveFile, onSaveHtml, onExecuteMarkdown, font, onFontChange }, ref) => {

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const text = e.target?.result as string;
                    onOpenFile(text);
                };
                reader.readAsText(file);
            }
             // Reset file input to allow re-uploading the same file
            event.target.value = '';
        };
        
        const triggerFileInput = () => {
            document.getElementById('file-input')?.click();
        }

        return (
            <div className="h-full flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0 bg-gray-700 p-2 flex items-center justify-between border-b border-gray-600">
                    <h2 className="text-lg font-semibold text-white">Markdown Editor</h2>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => onFontChange(Font.Sans)} className={`px-2 py-1 text-sm rounded ${font === Font.Sans ? 'bg-cyan-600 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>Sans-Serif</button>
                        <button onClick={() => onFontChange(Font.Mono)} className={`px-2 py-1 text-sm rounded ${font === Font.Mono ? 'bg-cyan-600 text-white' : 'bg-gray-600 hover:bg-gray-500'}`}>Monospace</button>
                    </div>
                </div>
                <textarea
                    ref={ref}
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    className={`flex-grow w-full p-4 bg-gray-800 text-gray-200 resize-none focus:outline-none ${font} text-base leading-relaxed`}
                    placeholder="Start typing your markdown here..."
                />
                <div className="flex-shrink-0 bg-gray-700 p-2 flex flex-wrap gap-2 justify-end border-t border-gray-600">
                    <input type="file" id="file-input" className="hidden" onChange={handleFileChange} accept=".md,.txt,text/plain,text/markdown" />
                    <button onClick={triggerFileInput} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors">Open File</button>
                    <button onClick={onSaveFile} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-colors">Save MD</button>
                    <button onClick={onExecuteMarkdown} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-colors">Execute</button>
                    <button onClick={onSaveHtml} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors">Save HTML</button>
                </div>
            </div>
        );
    }
);

export default EditorPanel;
