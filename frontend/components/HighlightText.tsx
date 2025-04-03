interface HighlightTextProps {
    text: string;
    searchTerm: string;
}

export function HighlightText({ text, searchTerm } : HighlightTextProps) {
    if (!searchTerm.trim()) return <>{text}</>;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
        <>
            {parts.map((part, i) => (
                <span 
                key={i}
                className={part.toLowerCase() === searchTerm.toLowerCase() ? 'bg-yellow-200 rounded' : ''}
                >
                    {part}  
                </span>
            ))}
        </>
    )
}