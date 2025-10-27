import { Injectable } from '@nestjs/common';
import WalletConnect from '@walletconnect/client';
import { ethers } from 'ethers';

@Injectable()
export class WalletService {
  private connector: any;  // WalletConnect instance

  constructor() {
    this.connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Official bridge
      clientMeta: {
        description: '90 Days ad Gloriam Donation Tracking',
        url: 'https://yourapp.com',
        name: '90DaysApp',
      },
    });
  }

  async connectWallet() {
    if (!this.connector.connected) {
      await this.connector.createSession();
    }
    return this.connector;
  }

  async logDonation(userId: string, amount: number, serviceHours: number) {
    const provider = new ethers.providers.Web3Provider(this.connector);
    const signer = provider.getSigner();
    const contractAddress = process.env.ETHEREUM_CONTRACT_ADDRESS;  // NFT contract address
    const contract = new ethers.Contract(contractAddress, ['function mint(address to, uint256 hours)'], signer);
    const tx = await contract.mint(userId, serviceHours, { value: ethers.utils.parseEther(amount.toString()) });
    await tx.wait();
    return tx;
  }

  // Add more methods as needed, e.g., for querying NFTs
}
