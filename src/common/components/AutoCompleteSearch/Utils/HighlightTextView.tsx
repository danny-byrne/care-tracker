// using code from the autocomplete searchbox example from: https://github.com/microsoft/autocomplete-search-box

interface Props {
    text: any;
    filter: string;
}

const HighlightTextView = (props: Props) => {
    return getHighlightedText(props.text + '', props.filter);
};

const getHighlightedText = (text: string, highlight: string) => {
    if (highlight === '') return <>{text}</>;
    // Split text on highlight term, include term itself into parts, ignore case
    try {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part) => (
                    <span
                        key={part + Math.random()}
                        style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {}}
                    >
                        {part}
                    </span>
                ))}
            </span>
        );
    } catch (error) {
        return <>{error}</>;
    }
};

export default HighlightTextView;
