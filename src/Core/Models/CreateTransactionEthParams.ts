export default interface CreateTransactionEthParams {
    from: string;
    fromPrivateKey: string;

    to: string;

    value: string;
    fee: string;
}