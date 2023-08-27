import styles from "./instructionsComponent.module.css";
import { useAccount, useBalance, useContractRead, useNetwork, usePrepareSendTransaction, useSendTransaction } from "wagmi";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { bscTestnet } from "viem/chains";

export default function InstructionsComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>Lottery!</h1>
        </div>
      </header>
      <p className={styles.get_started}>
        <PageBody></PageBody>
      </p>
    </div>
  );
}

function PageBody() {
  return (
    <div>
      <WalletInfo></WalletInfo>
    </div>
  );
}

function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork();
  if (address)
    return (
      <div>
        <p>Your account address is {address}</p>
        <p>Connected to the network {chain?.name}</p>
        {/* <WalletAction></WalletAction> */}
        <WalletBalance address={address}></WalletBalance>
        <FetchData></FetchData>
        <ThePrize></ThePrize>
        <App></App>
        
      </div>
    );
  if (isConnecting)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div>
        <p>Wallet disconnected. Connect wallet to continue</p>
      </div>
    );
  return (
    <div>
      <p>Connect wallet to continue</p>
    </div>
  );
}

// function WalletAction() {
//   const [signatureMessage, setSignatureMessage] = useState("My Input:");

//   const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
//   return (
//     <div>
//       <form>
//         <label>
//           Enter the message to be signed:
//           <input
//             type="text"
//             value={signatureMessage}
//             onChange={(e) => setSignatureMessage(e.target.value)}
//           />
//         </label>
//       </form>
//       <button
//         disabled={isLoading}
//         onClick={() =>
//           signMessage({
//             message: signatureMessage,
//           })
//         }
//       >
//         Sign message
//       </button>
//       {isSuccess && <div>Signature: {data}</div>}
//       {isError && <div>Error signing message</div>}
//     </div>
//   );
// }

function WalletBalance(params: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useBalance({
    address: params.address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  );
}

function App() {
  const { config, error } = usePrepareSendTransaction({
    to: 'moxey.eth',
  })
  const { sendTransaction } = useSendTransaction(config)
 
  return (
    <>
      <button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        Purchase Tokens
      </button>
      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
    </>
  )
}

function FetchData() {
  const { data, isError, isLoading } = useContractRead({
    address: "0xdfa1a1b5f15cb8685e1c9859b02ae22b706c2d3a",
    "abi": [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tokenSymbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_purchaseRatio",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_betPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_betFee",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "bet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "betFee",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "times",
            "type": "uint256"
          }
        ],
        "name": "betMany",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "betPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "betsClosingTime",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "betsOpen",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "closeLottery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getRandomNumber",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "randomNumber",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "closingTime",
            "type": "uint256"
          }
        ],
        "name": "openBets",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ownerPool",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "ownerWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "paymentToken",
        "outputs": [
          {
            "internalType": "contract LotteryToken",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "prize",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "prizePool",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "prizeWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "purchaseRatio",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "purchaseTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "returnTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: "betsClosingTime",
  });

  const closing = typeof data === "number" ? data : 0;

  if (isLoading) return <div>Fetching name…</div>;
  if (isError) return <div>Error fetching name</div>;
  return <div>Closing Time {closing}</div>;
}

function ThePrize() {
  const { data, isError, isLoading } = useContractRead({
    address: "0xdfa1a1b5f15cb8685e1c9859b02ae22b706c2d3a",
    "abi": [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tokenSymbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_purchaseRatio",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_betPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_betFee",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "bet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "betFee",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "times",
            "type": "uint256"
          }
        ],
        "name": "betMany",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "betPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "betsClosingTime",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "betsOpen",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "closeLottery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getRandomNumber",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "randomNumber",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "closingTime",
            "type": "uint256"
          }
        ],
        "name": "openBets",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ownerPool",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "ownerWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "paymentToken",
        "outputs": [
          {
            "internalType": "contract LotteryToken",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "prize",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "prizePool",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "prizeWithdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "purchaseRatio",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "purchaseTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "returnTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    
    functionName: "prize",
  });

  const prize = typeof data === "number" ? data : 0;

  if (isLoading) return <div>Fetching prize value</div>;
  if (isError) return <div>Error fetching prize pool</div>;
  return <div>Prize: {prize}</div>;
}

// function App() {
//   const { data, isError, isLoading } = useContractRead({
//     address: '',
//     abi: [
//       {
//         "inputs": [
//           {
//             "internalType": "bytes32[]",
//             "name": "proposalNames",
//             "type": "bytes32[]"
//           },
//           {
//             "internalType": "address",
//             "name": "_tokenContract",
//             "type": "address"
//           },
//           {
//             "internalType": "uint256",
//             "name": "_targetBlockNumber",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "_endVoting",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//       },
//       {
//         "inputs": [],
//         "name": "endDate",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "gameEnded",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "hasEnded",
//         "outputs": [
//           {
//             "internalType": "bool",
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "name": "proposals",
//         "outputs": [
//           {
//             "internalType": "bytes32",
//             "name": "name",
//             "type": "bytes32"
//           },
//           {
//             "internalType": "uint256",
//             "name": "voteCount",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "targetBlockNumber",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "uint256",
//             "name": "proposal",
//             "type": "uint256"
//           },
//           {
//             "internalType": "uint256",
//             "name": "amount",
//             "type": "uint256"
//           }
//         ],
//         "name": "vote",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "inputs": [
//           {
//             "internalType": "address",
//             "name": "account",
//             "type": "address"
//           }
//         ],
//         "name": "votingPower",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "winnerName",
//         "outputs": [
//           {
//             "internalType": "bytes32",
//             "name": "winnerName_",
//             "type": "bytes32"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "inputs": [],
//         "name": "winningProposal",
//         "outputs": [
//           {
//             "internalType": "uint256",
//             "name": "winningProposal_",
//             "type": "uint256"
//           }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//       }
//     ],
//     functionName: "",
//   })
//   const gameEnded = typeof data == "boolean" ? data : 0;
//   if (isLoading) return <div>Fetching data...</div>;
//   if (isError) return <div> Error fetching data.</div>
//   return <div>Vote as ended: {gameEnded}</div>
// }