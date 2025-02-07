import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Loader } from "@tesla/design-system-react";

const DocumentationRow = ({ block }) => {
    const [functionHtmlContent, setFunctionHtmlContent] = useState(null);
    const [functionBlockHtmlContent, setFunctionBlockHtmlContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const iframeRef = useRef(null);

    const functionLink = `Functions/${block.Name}.htm`;
    const functionBlockLink = `Function Blocks/${block.Name}.htm`;

    const API_BASE_URL = 'https://lithium.tesla.com/backend/code2docu';
    const API_FC_URL = `${API_BASE_URL}/get-html?fileName=${functionLink}`;
    const API_FB_URL = `${API_BASE_URL}/get-html?fileName=${functionBlockLink}`;

    useEffect(() => {
        setIsLoading(true);
        fetchHtmlFile(functionLink, setFunctionHtmlContent);
        fetchHtmlFile(functionBlockLink, setFunctionBlockHtmlContent);
        setIsLoading(false);
    }, [block.Name]);

    const fetchHtmlFile = (fileName, setHtmlContent) => {
        axios.get(`${API_BASE_URL}/get-html`, {
            params: { fileName: fileName },
        })
            .then((res) => {
                if (res.data && res.data.trim() !== "") {
                    setHtmlContent(res.data);
                } else {
                    setHtmlContent(null);
                }
            })
            .catch(() => {
                setHtmlContent(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleIframeLoad = () => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        }
    };

    const renderLink = (link, htmlContent) => {
        if (!htmlContent) {
            return null;
        }
        return (
            <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontFamily: 'inherit', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                        Open Documentation in New Window
                    </a>
                </p>
            </div>
        );
    };

    const renderIframe = (htmlContent) => {
        if (!htmlContent) {
            return null;
        }

        const BASE_URL = window.location.origin.includes('localhost:3000')
            ? 'http://localhost:3000/Code2Docu'
            : 'https://lithium.tesla.com/Code2Docu';

        const iframeStyles = `
            <link rel="stylesheet" href="${BASE_URL}/style.css" />
            <link rel="stylesheet" href="${BASE_URL}/styleCustomized.css" />
            <link rel="stylesheet" href="${BASE_URL}/katex/katex.min.css" />
        `;

        const iframeScript = `
            <script>
                window.onload = function() {
                    const images = document.querySelectorAll('img');
                    images.forEach(img => {
                        if (img.src.startsWith('/')) {
                            img.src = '${BASE_URL}' + img.src;
                        }
                    });
                    window.parent.postMessage(document.body.scrollHeight, '*');
                };
            </script>
        `;

        const iframeContent = `
            <html>
            <head>
                ${iframeStyles}
            </head>
            <body>
                ${htmlContent}
                ${iframeScript}
            </body>
            </html>
        `;

        return (
            <iframe
                title="documentation-content"
                ref={iframeRef}
                srcDoc={iframeContent}
                style={{ width: '70%', border: 'none' }}
                onLoad={handleIframeLoad}
            />
        );
    };

    useEffect(() => {
        const handleMessage = (event) => {
            if (iframeRef.current && typeof event.data === 'number') {
                iframeRef.current.style.height = `${event.data}px`;
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <>
           <tr>
                <td colSpan={6}>
                    <Loader show={isLoading} contained={true} />
                    {functionHtmlContent && (
                        <div style={{ width: "2500px" }}>
                            {renderLink(API_FC_URL, functionHtmlContent)}
                            {renderIframe(functionHtmlContent)}
                        </div>
                    )}
                    {functionBlockHtmlContent && (
                        <div style={{ width: "2500px" }}>
                            {renderLink(API_FB_URL, functionBlockHtmlContent)}
                            {renderIframe(functionBlockHtmlContent)}
                        </div>
                    )}
                </td>
            </tr>
        </>
    );
};

export default DocumentationRow;
