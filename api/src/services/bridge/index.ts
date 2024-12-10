class BridgeService {
  clientId: string;
  clientSecret: string;
  constructor() {
    this.clientId = process.env.BRIDGE_CLIENT_ID;
    this.clientSecret = process.env.BRIDGE_CLIENT_SECRET;
  }
}

export default new BridgeService();
