class Currency{
    id : number;
    shortName: string;
    longName: string;
    url;

    public constructor(init?:Partial<Currency>) {
        Object.assign(this, init);
    }
}

let currencies: Currency[] = [
    new Currency({
        id : 1,
        shortName : "ETH",
        longName : 'ethereum',
        url :'https://www.ethereum.org/'
    })
];

export default currencies;