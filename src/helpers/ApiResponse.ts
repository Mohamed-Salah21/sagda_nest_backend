const ApiResponse = (
    message: string,
    data?: any,
) => ({
    status: 'success',
    message,
    data: {
        ...data
    },
});
export default ApiResponse;