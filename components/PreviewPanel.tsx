
import React from 'react';

interface PreviewPanelProps {
    htmlContent: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ htmlContent }) => {
    return (
        <div className="h-full flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0 bg-gray-200 p-2 border-b border-gray-300">
                <h2 className="text-lg font-semibold text-gray-800">HTML Preview</h2>
            </div>
            <div
                className="prose max-w-none p-4 overflow-auto flex-grow"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    );
};

export default PreviewPanel;
