const errorBarStyles = {
    fontSize: 12,
    color: '#a4262c',
};

const ErrorMessage = (props: ErrorMessageProps) => {
    const { error } = props;
    if (!error) return null;
    return <div style={errorBarStyles}>{error}</div>;
};

interface ErrorMessageProps {
    error: string | null;
}

export default ErrorMessage;
