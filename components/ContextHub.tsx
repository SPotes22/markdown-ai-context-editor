
import React from 'react';

interface ContextHubProps {
    context: string;
    onGenerateContext: () => void;
    isLoading: boolean;
}

const LoadingIndicator: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <svg className="animate-spin h-8 w-8 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="animate-pulse">Generating context...</p>
    </div>
);

const ContextHub: React.FC<ContextHubProps> = ({ context, onGenerateContext, isLoading }) => {
    return (
        <div className="h-full flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex-shrink-0 bg-gray-700 p-2 flex items-center justify-between border-b border-gray-600">
                <h2 className="text-lg font-semibold text-white">Context Hub</h2>
            </div>
            <div className="flex-grow p-4 overflow-auto text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                {isLoading ? <LoadingIndicator /> : context}
            </div>
            <div className="flex-shrink-0 bg-gray-700 p-2 border-t border-gray-600">
                <button
                    onClick={onGenerateContext}
                    disabled={isLoading}
                    className="w-full px-4 py-2 font-bold text-white bg-cyan-600 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Generating...' : 'Generate Context'}
                </button>
            </div>
        </div>
    );
};

export default ContextHub;
