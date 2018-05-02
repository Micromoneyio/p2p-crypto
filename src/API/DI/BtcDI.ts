import Axios from "axios";
import connector from '../../External/Crypto/Bitcoin/Connector'
import IBtcPriceGateway from "../../Core/Gateways/IBtcPriceGateway";
import {BtcPriceGateway} from "../../External/Crypto/Ethereum/BtcPriceGateway";
import {IBtcGateway} from "../../Core/Gateways/IBtcGateway";
import {BtcGateway} from "../../External/Crypto/Bitcoin/BtcGateway";
import {IBtcService} from "../../Core/Services/IBtcService";
import {BtcService} from "../../Services/Сrypto/BtcService";

let client = Axios.create();
let btcPriceStation:IBtcPriceGateway = new BtcPriceGateway(client);
let btcGateway:IBtcGateway = new BtcGateway(connector, client);
let btcService:IBtcService = new BtcService(btcGateway, btcPriceStation);

export {btcService};