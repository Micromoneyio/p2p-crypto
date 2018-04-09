export default interface CreateTransactionParams {
    from: string;
    fromPrivateKey: string;

    to: string;

    value: string;
    fee: string;

    time: number;
}