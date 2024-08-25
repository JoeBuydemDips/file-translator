import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import yaml from 'js-yaml';
import remarkGfm from 'remark-gfm';

const FileTranslator: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [format, setFormat] = useState('markdown');
  const [theme, setTheme] = useState('dark');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderPreview = () => {
    if (format === 'markdown') {
      console.log('Rendering markdown:', inputText); // Debug log
      return (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({node, ...props}) => {
              console.log('Rendering table:', props); // Debug log
              return <table {...props} />;
            },
          }}
        >
          {inputText}
        </ReactMarkdown>
      );
    } else if (format === 'yaml') {
      try {
        const jsonData = yaml.load(inputText);
        return <pre>{JSON.stringify(jsonData, null, 2)}</pre>;
      } catch (error) {
        return <p>Invalid YAML</p>;
      }
    }
  };

  useEffect(() => {
    console.log('Rendered preview:', document.querySelector('.preview')?.innerHTML);
  }, [inputText, format]);

  return (
    <div className={`container ${theme}`}>
      <div className="controls">
        <select value={format} onChange={handleFormatChange}>
          <option value="markdown">Markdown</option>
          <option value="yaml">YAML</option>
        </select>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div className="content">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder={`Enter ${format} here...`}
        />
        <div className="preview">
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

export default FileTranslator;